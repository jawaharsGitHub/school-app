import { Entity, Fields } from "remult";

@Entity('studentProofs')
export class StudentProof {
  @Fields.cuid()
  id!: string;
  @Fields.string()
  studentId!: string; // Foreign key to Student
  @Fields.string()
  proofType!: 'ID Card' | 'Address Proof' | 'Qualification' | 'Other'; // Enum or predefined list
  @Fields.string()
  fileUrl!: string; // URL of the proof file
  @Fields.string()
  fileName!: string; // Original filename for display
  @Fields.string()
  mimeType!: string; // e.g., 'image/jpeg', 'application/pdf'
  @Fields.date()
  uploadDate = new Date();
  // ... other proof-specific metadata
}