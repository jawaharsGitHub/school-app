// src/app/shared/entities/AdmissionApplication.ts
import { Allow, Entity, Fields, remult, Validators } from 'remult';
import { UserRole } from '../interfaces/user-models';
import { BaseEntity } from './BaseEntity';

// Enum for application status
export enum ApplicationStatus {
  Submitted = 'Submitted',
  UnderReview = 'Under Review',
  InterviewScheduled = 'Interview Scheduled',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Waitlisted = 'Waitlisted',
  Enrolled = 'Enrolled', // Once converted to a full student record
}

@Entity('applicants', {
  allowApiCrud: Allow.authenticated, // All authenticated users can read/write their own applications
  allowApiInsert: Allow.authenticated, // Applicants can submit new applications
  allowApiUpdate: () => {
    const user = remult.user;
    return !!(
      user?.roles?.includes(UserRole.Admin) ||
      user?.roles?.includes(UserRole.Staff)
    );
  },
  allowApiDelete: () => {
    const user = remult.user;
    return !!(
      user?.roles?.includes(UserRole.Admin)
    );
  },

  // Example of row-level security: Applicants can only see/update their own application
  //allowApiRead: (applicant) => Allow.roles(UserRole.Admin, UserRole.Staff).or(applicant.userId === remult.currentUser?.id),
  //allowApiUpdate: (applicant) => Allow.roles(UserRole.Admin, UserRole.Staff).or(applicant.userId === remult.currentUser?.id),

  saving: async (task: Applicant, e) => {
    if (e.isNew) {
      task.applicationDate = new Date(); // Set the creation date for new tasks.
    }
  },
})
export class Applicant extends BaseEntity {
  @Fields.string({ validate: [Validators.required, Validators.minLength(2)] })
  firstName!: string;

  @Fields.string({ validate: [Validators.required, Validators.minLength(2)] })
  lastName!: string;

  @Fields.string({
    validate: [Validators.required, Validators.email],
      })
  email!: string;

  @Fields.string({
    defaultValue: () => ApplicationStatus.Submitted.toString(), // Default initial status
    validate: (applicant) => {
      const a = applicant as Applicant;
      if (
        !Object.values(ApplicationStatus).includes(
          a.applicationStatus as ApplicationStatus
        )
      ) {
        throw new Error('Invalid application status');
      }
    },
  })
  applicationStatus!: ApplicationStatus;

  @Fields.date({ allowApiUpdate: false })
  applicationDate?: Date;

  @Fields.uuid({
    allowApiUpdate: false,
    defaultValue: () => remult.user?.id || '',
  }) // Link to the user who submitted it
  userId?: string; // ID of the user who applied (e.g., parent or applicant themselves)

  // You can add more application-specific fields here (e.g., grade, desired program)
  @Fields.string()
  gradeApplyingFor?: string;

  @Fields.string()
  studentId = ''; // e.g., STU12345

  @Fields.string()
  documentFolderPath = '';

  @Fields.string()
  tempFolder = ''; // UUID for temp upload folder
}
