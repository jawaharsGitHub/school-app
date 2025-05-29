// shared/Student.ts
import { Entity, Fields } from 'remult';

@Entity('students', {
  allowApiCrud: true, // Allow Remult's default CRUD for students
})
export class Student {
  @Fields.cuid()
  id!: string;

  @Fields.string()
  firstName = '';

  @Fields.string()
  lastName = '';

  @Fields.string({ allowNull: true }) // Field to store the photo URL
  photoUrl?: string; 

  // ... other student fields
}