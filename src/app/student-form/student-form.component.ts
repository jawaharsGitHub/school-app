import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RemultService } from '../services/remult.service';
import { Student } from '../../shared/entities/Student';
import { StudentProof } from '../../shared/entities/StudentProof';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  standalone: true, // Set to false if this component is part of a module
  imports: [
    // Add necessary Angular modules here, e.g., ReactiveFormsModule, CommonModule
    ReactiveFormsModule,
    CommonModule,
     // Import HttpClient for making HTTP requests
  ]
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  photoForm!: FormGroup;
  proofsForm!: FormGroup;

  students: Student[] = [];
  proofs: StudentProof[] = [];
  statusMessage: string = '';
  currentStudentId: string | null = null; // To link uploads to a created student

  private studentRepo; // = this.remultService.remult.repo(Student);
  private studentProofRepo; // = this.remultService.remult.repo(StudentProof);

  proofTypes: StudentProof['proofType'][] = ['ID Card', 'Address Proof', 'Qualification', 'Other'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private remultService: RemultService
  ) {

    this.studentRepo = this.remultService.remult.repo(Student);
    this.studentProofRepo = this.remultService.remult.repo(StudentProof);
  }

  ngOnInit(): void {
    this.initializeForms();
    this.fetchStudentsAndProofs();
  }

  private initializeForms(): void {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.photoForm = this.fb.group({
      studentPhoto: [null, Validators.required]
    });

    this.proofsForm = this.fb.group({
      proofType: [this.proofTypes[0], Validators.required],
      proofFiles: [null, Validators.required]
    });
  }

  async fetchStudentsAndProofs(): Promise<void> {
    try {
      this.students = await this.studentRepo.find();
      this.proofs = await this.studentProofRepo.find();
      this.statusMessage = '';
    } catch (error: any) {
      console.error('Error fetching data:', error);
      this.statusMessage = `Failed to load data: ${error.message || 'Unknown error'}`;
    }
  }

  async onCreateStudent(): Promise<void> {
    if (this.studentForm.invalid) {
      this.statusMessage = 'Please fill all student details.';
      return;
    }
    this.statusMessage = 'Creating student...';
    try {
      const { firstName, lastName } = this.studentForm.value;
      const newStudent = await this.studentRepo.insert({ firstName, lastName });
      this.currentStudentId = newStudent.id;
      this.statusMessage = `Student "${newStudent.firstName} ${newStudent.lastName}" created with ID: ${newStudent.id}`;
      this.studentForm.reset(); // Reset form, but currentStudentId remains for uploads
      this.fetchStudentsAndProofs();
    } catch (error: any) {
      console.error('Error creating student:', error);
      this.statusMessage = `Error creating student: ${error.message || 'Unknown error'}`;
    }
  }

  onFileSelected(event: Event, formControlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (formControlName === 'studentPhoto') {
        this.photoForm.get('studentPhoto')?.setValue(input.files[0]);
      } else if (formControlName === 'proofFiles') {
        this.proofsForm.get('proofFiles')?.setValue(Array.from(input.files));
      }
    } else {
      if (formControlName === 'studentPhoto') {
        this.photoForm.get('studentPhoto')?.setValue(null);
      } else if (formControlName === 'proofFiles') {
        this.proofsForm.get('proofFiles')?.setValue(null);
      }
    }
  }

  async onUploadPhoto(): Promise<void> {
    if (!this.currentStudentId) {
      this.statusMessage = 'Please create or select a student first.';
      return;
    }
    if (this.photoForm.invalid) {
      this.statusMessage = 'No photo selected.';
      return;
    }

    this.statusMessage = 'Uploading photo...';
    const photoFile: File = this.photoForm.get('studentPhoto')?.value;
    const formData = new FormData();
    formData.append('studentPhoto', photoFile);
    formData.append('studentId', this.currentStudentId);

    try {
      const response = await this.http.post('/api/uploadStudentPhoto', formData).toPromise();
      this.statusMessage = `Photo uploaded successfully! Response: ${JSON.stringify(response)}`;
      this.photoForm.reset(); // Clear form including file input
      this.fetchStudentsAndProofs();
    } catch (error: any) {
      console.error('Error uploading photo:', error);
      this.statusMessage = `Error uploading photo: ${error.message || 'Unknown error'}`;
    }
  }

  async onUploadProofs(): Promise<void> {
    if (!this.currentStudentId) {
      this.statusMessage = 'Please create or select a student first.';
      return;
    }
    if (this.proofsForm.invalid) {
      this.statusMessage = 'No proof files selected or proof type not set.';
      return;
    }

    this.statusMessage = 'Uploading proofs...';
    const proofFiles: File[] = this.proofsForm.get('proofFiles')?.value;
    const proofType: StudentProof['proofType'] = this.proofsForm.get('proofType')?.value;

    const formData = new FormData();
    proofFiles.forEach(file => formData.append('proofFiles', file));
    formData.append('studentId', this.currentStudentId);
    formData.append('proofType', proofType);

    try {
      const response = await this.http.post('/api/uploadStudentProofs', formData).toPromise();
      this.statusMessage = `Proofs uploaded successfully! Response: ${JSON.stringify(response)}`;
      this.proofsForm.reset(); // Clear form including file inputs and reset type
      this.proofsForm.get('proofType')?.setValue(this.proofTypes[0]); // Reset dropdown
      this.fetchStudentsAndProofs();
    } catch (error: any) {
      console.error('Error uploading proofs:', error);
      this.statusMessage = `Error uploading proofs: ${error.message || 'Unknown error'}`;
    }
  }

  selectStudentForUpload(studentId: string): void {
    this.currentStudentId = studentId;
    this.statusMessage = `Selected student ID: ${studentId} for uploads.`;
  }
}