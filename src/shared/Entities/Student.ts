// shared/entities/student.ts
import { Entity, Fields, Validators, Allow, remult, EntityBase } from 'remult';
import { UserRole } from '../interfaces/user-models';
import { BaseEntity } from './BaseEntity';

export enum EnrollmentStatus {
  Enrolled = 'Enrolled',
  PendingPayment = 'Pending Payment',
  PendingDocuments = 'Pending Documents',
  Graduated = 'Graduated',
  DroppedOut = 'Dropped Out',
}

@Entity('students', { // 'students' will be the API endpoint name: /api/students
  allowApiCrud: () => 
  {
    const user = remult.user;
    return !!(
      user?.roles?.includes(UserRole.Admin) ||
      user?.roles?.includes(UserRole.Staff)
    );
  },
  // Students can read their own record
  allowApiRead: () => {
    const user = remult.user;
    return !!(
      user?.roles?.includes(UserRole.Admin) ||
      user?.roles?.includes(UserRole.Staff)
    );
  },

  saving: async (task: Student, e) => {
    if (e.isNew) {
      task.enrollmentDate = new Date(); // Set the creation date for new tasks.
    }
  },
})
export class Student extends BaseEntity {
  

  @Fields.uuid({ allowApiUpdate: false }) // Link to the original applicant
  applicantId!: number;

  @Fields.uuid({ allowNull: true }) // Link to the user who will login as student
  userId?: string;

  @Fields.string({ validate: Validators.required })
  firstName!: string;

  @Fields.string({ validate: Validators.required })
  lastName!: string;

  @Fields.string({ validate: [Validators.required, Validators.email] })
  email!: string;

  @Fields.string({
    defaultValue: () => EnrollmentStatus.PendingPayment.toString() // Default initial status
  })
  enrollmentStatus!: EnrollmentStatus;

  @Fields.string({ allowNull: true })
  studentIdNumber?: string; // e.g., auto-generated after enrollment

  @Fields.date()
  enrollmentDate?: Date;

  // Add more student-specific fields (e.g., currentGrade, programId, classes)
  @Fields.string({ allowNull: true })
  currentGrade?: string;
}