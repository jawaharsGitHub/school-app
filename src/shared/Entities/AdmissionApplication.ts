// src/app/shared/entities/AdmissionApplication.ts
import { Entity, Fields, Validators } from 'remult';

// Enum for application status
export enum ApplicationStatus {
  Submitted = 'Submitted',
  UnderReview = 'Under Review',
  InterviewScheduled = 'Interview Scheduled',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Waitlisted = 'Waitlisted',
  Enrolled = 'Enrolled' // Once converted to a full student record
}

@Entity('admissionApplications', {
  allowApiCrud: true, // Allows CRUD operations via Remult API
  // You might add authorization rules here later, e.g.,
  // allowApiRead: 'admin',
  // allowApiInsert: 'admin',
  // allowApiUpdate: 'admin',
  // allowApiDelete: 'admin',
})
export class AdmissionApplication {
  @Fields.uuid() // Remult generates UUID for primary key
  id!: string;

  @Fields.string({
    validate: (entity : AdmissionApplication) => {
      if (!entity.applicantName || entity.applicantName.length < 3) {
        throw Error("Applicant name must be at least 3 characters.");
      }
    }
  })
  applicantName = '';

  @Fields.date()
  applicantDob = new Date();

  @Fields.string()
  gradeApplyingFor = ''; // e.g., "KG1", "Grade 1", "Grade 10"

  @Fields.string()
  parentName = '';

  @Fields.string({
    validate: Validators.email
  })
  email = '';

    @Fields.string({
    // CORRECTED: Use a custom validate function with a RegExp test
    validate: (entity : AdmissionApplication) => {
      const phoneRegex = /^\d{10}$/; // 10 digits
      if (!entity.contactPhone) {
        throw Error("Phone number is required."); // Or allow empty if optional
      }
      if (!phoneRegex.test(entity.contactPhone)) {
        throw Error("Phone number must be 10 digits.");
      }
    }
  })
  contactPhone = '';

  @Fields.date()
  applicationDate = new Date(); // Defaults to current date on creation

  @Fields.string() // Store enum value as string
  status: ApplicationStatus = ApplicationStatus.Submitted;

  @Fields.string({
    allowNull: true
  })
  internalNotes?: string;

  // // For simplicity, just storing document names/paths as an array of strings
  // // In a real app, this would be a more complex relationship/field type
  // @Fields.json<string[]>({
  //   allowNull: true
  // })
  // documents?: string[];

  @Fields.string()
  studentId = '' // e.g., STU12345

  @Fields.string()
  documentFolderPath = ''

  @Fields.string()
  tempFolder = '' // UUID for temp upload folder
}