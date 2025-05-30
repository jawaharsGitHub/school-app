// src/app/admission/admission-form/admission-application-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // For reactive forms
import { ActivatedRoute, Router } from '@angular/router'; // For routing parameters and navigation
import { Remult, remult } from 'remult'; // Import Remult for data access
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // For icons

import { AdmissionApplication, ApplicationStatus } from '../../../shared/Entities/AdmissionApplication'; // Import the AdmissionApplication model and ApplicationStatus enum

@Component({
  selector: 'app-admission-application-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Important for reactive forms
    FontAwesomeModule
  ],
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.css']
})
export class AdmissionFormComponent implements OnInit {
  admissionForm!: FormGroup;
  applicationId: string | null = null;
  isEditMode = false;
  isLoading = false;
  submissionError: string | null = null;

  applicationStatuses = Object.values(ApplicationStatus); // Get all possible statuses

  private applicationRepo;

  constructor(
    private fb: FormBuilder, // Inject FormBuilder
    //private remult: Remult, // Inject Remult
    private route: ActivatedRoute, // To get route parameters
    private router: Router // For navigation
  ) {

    this.applicationRepo = remult.repo(AdmissionApplication); // Initialize the repository for AdmissionApplication
   }

  ngOnInit(): void {
    this.initForm();
    this.applicationId = this.route.snapshot.paramMap.get('id'); // Get ID from route
    if (this.applicationId) {
      this.isEditMode = true;
      this.loadApplicationData(this.applicationId);
    }
  }

  initForm(): void {
    this.admissionForm = this.fb.group({
      applicantName: ['', Validators.required],
      applicantDob: ['', Validators.required], // Will need date formatting for input type="date"
      gradeApplyingFor: ['', Validators.required],
      parentName: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      applicationDate: [{ value: new Date().toISOString().substring(0, 10), disabled: true }, Validators.required], // Default to today, disabled for admin
      status: [ApplicationStatus.Submitted, Validators.required], // Default status for new applications
      internalNotes: ['']
      // documents: [[]] // File input handling is more complex; for now, let's keep it simple
    });
  }

  async loadApplicationData(id: string): Promise<void> {
    this.isLoading = true;
    try {
      const application = await this.applicationRepo.findId(id);
      if (application) {
        this.admissionForm.patchValue({
          applicantName: application.applicantName,
          applicantDob: application.applicantDob.toISOString().substring(0, 10), // Format Date to 'YYYY-MM-DD' for input type="date"
          gradeApplyingFor: application.gradeApplyingFor,
          parentName: application.parentName,
          contactEmail: application.contactEmail,
          contactPhone: application.contactPhone,
          applicationDate: application.applicationDate.toISOString().substring(0, 10),
          status: application.status,
          internalNotes: application.internalNotes || ''
        });
      } else {
        alert('Application not found!');
        this.router.navigate(['/admin/admissions']);
      }
    } catch (error) {
      console.error('Failed to load application:', error);
      alert('Error loading application. Please check console.');
    } finally {
      this.isLoading = false;
    }
  }

  async onSubmit(): Promise<void> {
    this.submissionError = null;
    if (this.admissionForm.invalid) {
      this.admissionForm.markAllAsTouched(); // Show validation errors
      this.submissionError = 'Please correct the form errors.';
      return;
    }

    this.isLoading = true;
    try {
      let application: AdmissionApplication;

      if (this.isEditMode && this.applicationId) {
        // Fetch the existing entity to update it
        const foundApplication = await this.applicationRepo.findId(this.applicationId);
        if (!foundApplication) {
          throw new Error('Application not found for update!');
        }

        application = foundApplication;
        // Update properties from form values
        Object.assign(application, this.admissionForm.value);
        application.applicantDob = new Date(this.admissionForm.value.applicantDob); // Convert string back to Date
        //application.applicationDate = new Date(this.admissionForm.value.applicationDate); // Convert string back to Date
      } else {
        // Create a new entity instance
        application = this.applicationRepo.create();
        Object.assign(application, this.admissionForm.value);
        application.applicantDob = new Date(this.admissionForm.value.applicantDob);
        // application.applicationDate is defaulted by the entity, or set explicitly if needed
      }

      await this.applicationRepo.save(application);
      alert(`Application ${this.isEditMode ? 'updated' : 'added'} successfully!`);
      this.router.navigate(['/admin/admissions']); // Go back to list
    } catch (error: any) {
      console.error('Submission failed:', error);
      this.submissionError = `Error: ${error.message || 'Unknown error'}`;
    } finally {
      this.isLoading = false;
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/admissions']);
  }
}