// server/controllers/admission-process.controller.ts
import { BackendMethod, remult, Allow } from 'remult';
import { Applicant, ApplicationStatus } from '../../shared/entities/applicant';
import { Student, EnrollmentStatus } from '../../shared/entities/student';
import { UserRole } from '../../shared/interfaces/user-models';
import { EmailService } from '../backend-services/email.service';

//@BackendMethod({ allowed: Allow.roles(UserRole.Admin, UserRole.Staff) }) // Only admins/staff can call methods in this controller
export class AdmissionProcessController {
  // Remult automatically injects services marked with @Injectable()
  constructor(private emailService: EmailService) {}

  /**
   * Processes an admission decision for an applicant.
   * If accepted, creates a Student entity and sends an offer.
   * If rejected, updates applicant status and sends a rejection notice.
   */
  @BackendMethod({ 
    allowed: () => {
    const user = remult.user;
    return !!(user?.roles?.includes(UserRole.Admin) || user?.roles?.includes(UserRole.Staff));
  }
  })
  static async makeAdmissionDecision(
    applicantId: number,
    decision: 'accept' | 'reject',
    offerDetails?: string
  ): Promise<string> {
    const applicantRepo = remult.repo(Applicant);
    const studentRepo = remult.repo(Student);

    const applicant = await applicantRepo.findId(applicantId);
    if (!applicant) {
      throw new Error(`Applicant with ID ${applicantId} not found.`);
    }

    if (decision === 'accept') {
      // Step 1: Update Applicant Status
      applicant.applicationStatus = ApplicationStatus.Accepted;
      await applicantRepo.save(applicant);

      // Step 2: Create a Student Record (ONLY if not already a student from this applicant)
      let student = await studentRepo.findFirst({ applicantId: applicant.id });
      if (!student) {
        student = studentRepo.create({
          applicantId: applicant.id,
          firstName: applicant.firstName,
          lastName: applicant.lastName,
          email: applicant.email,
          currentGrade: applicant.gradeApplyingFor, // Transfer info from applicant
          enrollmentStatus: EnrollmentStatus.PendingPayment,
          userId: applicant.userId, // Link to the user who originally applied, if applicable
        });
        // TODO: Generate a unique student ID number here before saving, e.g., using a sequence
        student.studentIdNumber = `STUD-${Math.floor(Math.random() * 1000000)}`; // Simple placeholder
        await studentRepo.save(student);
      } else {
        // If student record already exists (e.g., previously created), just update status if needed
        student.enrollmentStatus = EnrollmentStatus.PendingPayment; // Ensure correct status
        await studentRepo.save(student);
      }

      // Step 3: Send Offer Letter Email (using backend service)
      // Call service using `remult.liveQuery` or directly `this.emailService` if instance is injected
      // const emailService = remult.getService(EmailService); // Get service instance if static method
      // await emailService.sendAdmissionOfferEmail(
      //   applicant.email,
      //   `${applicant.firstName} ${applicant.lastName}`,
      //   offerDetails || 'Congratulations! You have been accepted.'
      // );

      return `Admission offer sent to ${applicant.firstName} and student record created/updated. Student ID: ${student.studentIdNumber}`;
    } else if (decision === 'reject') {
      applicant.applicationStatus = ApplicationStatus.Rejected;
      await applicantRepo.save(applicant);

      // Send rejection email (using backend service)
      // const emailService = remult.getService(EmailService);
      // await emailService.sendRejectionEmail(
      //   applicant.email,
      //   `${applicant.firstName} ${applicant.lastName}`
      // );

      return `Applicant ${applicant.firstName} has been rejected.`;
    } else {
      throw new Error('Invalid decision type.');
    }
  }

  /**
   * For student enrollment - finalizes enrollment after payment/docs
   * This could be called from a different controller/service or a separate API.
   * For simplicity, keeping it here for now.
   */
  @BackendMethod({ allowed: () => {
    const user = remult.user;
    return !!(user?.roles?.includes(UserRole.Admin) || user?.roles?.includes(UserRole.Staff));
  } })
  static async finalizeStudentEnrollment(studentId: number): Promise<string> {
    const studentRepo = remult.repo(Student);
    const student = await studentRepo.findId(studentId);

    if (!student) {
      throw new Error('Student not found.');
    }

    if (
      student.enrollmentStatus === EnrollmentStatus.PendingPayment ||
      student.enrollmentStatus === EnrollmentStatus.PendingDocuments
    ) {
      student.enrollmentStatus = EnrollmentStatus.Enrolled;
      await studentRepo.save(student);

      // const emailService = remult.getService(EmailService);
      // await emailService.sendEnrollmentConfirmation(
      //   student.email,
      //   `${student.firstName} ${student.lastName}`,
      //   student.studentIdNumber || 'N/A'
      //);

      return `Student ${student.firstName} ${student.lastName} (ID: ${student.studentIdNumber}) is now fully enrolled!`;
    } else {
      throw new Error(
        `Student ${student.firstName} cannot be finalized with current status: ${student.enrollmentStatus}`
      );
    }
  }
}
