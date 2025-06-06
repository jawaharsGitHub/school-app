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

@Entity('applicants')

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

  @Fields.date({ allowApiUpdate: true })
  dob?: Date;

  @Fields.uuid({
    allowApiUpdate: false,
    defaultValue: () => remult.user?.id || '',
  }) // Link to the user who submitted it
  userId?: string; // ID of the user who applied (e.g., parent or applicant themselves)

  // You can add more application-specific fields here (e.g., grade, desired program)
  @Fields.string()
  gradeApplyingFor?: string;

   @Fields.string()
  mobile?: string;

  @Fields.string()
  studentId = ''; // e.g., STU12345

  @Fields.string()
  documentFolderPath = '';

  @Fields.string()
  tempFolder = ''; // UUID for temp upload folder
}
