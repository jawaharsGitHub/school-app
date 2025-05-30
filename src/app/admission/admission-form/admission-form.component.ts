// src/app/admission/admission-form/admission-application-form.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { remult } from 'remult';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AdmissionApplication, ApplicationStatus } from '../../../shared/Entities/AdmissionApplication'; // Import your AdmissionApplication entity

import { BasicDetailsFormComponent } from '../basic-details-form/basic-details-form.component';
import { ContactsFormComponent } from '../contacts-form/contacts-form.component';
import { DocumentsFormComponent } from '../documents-form/documents-form.component';


@Component({
  selector: 'app-admission-application-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BasicDetailsFormComponent,
    ContactsFormComponent,
    DocumentsFormComponent
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
  currentStep = 1;
  totalSteps = 3;

  public applicationStatuses = Object.values(ApplicationStatus);

  private applicationRepo = remult.repo(AdmissionApplication);

  constructor(
    private fb: FormBuilder,
    //private remult: Remult,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.applicationId = this.route.snapshot.paramMap.get('id');
    if (this.applicationId) {
      this.isEditMode = true;
      this.loadApplicationData(this.applicationId);
    }
  }

  initForm(): void {
    this.admissionForm = this.fb.group({
      basicDetails: this.fb.group({
        applicantName: ['', Validators.required],
        applicantDob: ['', Validators.required],
        gradeApplyingFor: ['', Validators.required],
        applicationDate: [{ value: new Date().toISOString().substring(0, 10), disabled: true }, Validators.required],
      }),
      contacts: this.fb.group({
        parentName: ['', Validators.required],
        contactEmail: ['', [Validators.required, Validators.email]],
        contactPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      }),
      documents: this.fb.group({
        documentNames: this.fb.array([])
      }),
      status: [ApplicationStatus.Submitted, Validators.required],
      internalNotes: ['']
    });
  }

  get basicDetailsFormGroup(): FormGroup {
    // Assert that 'basicDetails' is a FormGroup.
    // We can confidently use 'as FormGroup' here because we've defined it as such in initForm.
    return this.admissionForm.get('basicDetails') as FormGroup;
  }

  get contactsFormGroup(): FormGroup {
    return this.admissionForm.get('contacts') as FormGroup;
  }

  get documentsFormGroup(): FormGroup {
    return this.admissionForm.get('documents') as FormGroup;
  }

  async loadApplicationData(id: string): Promise<void> {
    this.isLoading = true;
    try {
      const application = await this.applicationRepo.findId(id);
      if (application) {
        this.admissionForm.get('basicDetails')?.patchValue({
          applicantName: application.applicantName,
          applicantDob: application.applicantDob.toISOString().substring(0, 10),
          gradeApplyingFor: application.gradeApplyingFor,
          applicationDate: application.applicationDate.toISOString().substring(0, 10),
        });
        this.admissionForm.get('contacts')?.patchValue({
          parentName: application.parentName,
          contactEmail: application.contactEmail,
          contactPhone: application.contactPhone,
        });

        this.admissionForm.patchValue({
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

  // >>>>>>>>>>>>> ADD THIS NEW METHOD <<<<<<<<<<<<<<<
  goToStep(step: number): void {
    // Optional: Add validation logic here to prevent skipping steps
    // For example, you might only allow navigating to a step if all previous steps are valid.
    // For simplicity, we'll just navigate, but you could enhance this.

    if (step >= 1 && step <= this.totalSteps) {
        // Example of validation before jumping:
        if (step > this.currentStep) { // If trying to go forward
            let canAdvance = true;
            for (let i = this.currentStep; i < step; i++) {
                let formGroupToValidate: FormGroup | null = null;
                if (i === 1) formGroupToValidate = this.admissionForm.get('basicDetails') as FormGroup;
                if (i === 2) formGroupToValidate = this.admissionForm.get('contacts') as FormGroup;
                // Add more if you have more steps with their own form groups

                if (formGroupToValidate && formGroupToValidate.invalid) {
                    formGroupToValidate.markAllAsTouched();
                    this.submissionError = `Please complete Step ${i} before proceeding.`;
                    canAdvance = false;
                    break;
                }
            }
            if (!canAdvance) {
                return; // Stop navigation if validation fails
            }
        }
        this.currentStep = step;
        this.submissionError = null; // Clear any previous submission errors
    }
  }
  // >>>>>>>>>>>>> END OF NEW METHOD <<<<<<<<<<<<<<<

  goToNextStep(): void {
    let currentStepFormGroup: FormGroup | null = null;
    if (this.currentStep === 1) {
      currentStepFormGroup = this.admissionForm.get('basicDetails') as FormGroup;
    } else if (this.currentStep === 2) {
      currentStepFormGroup = this.admissionForm.get('contacts') as FormGroup;
    }

    if (currentStepFormGroup && currentStepFormGroup.invalid) {
      currentStepFormGroup.markAllAsTouched();
      this.submissionError = 'Please fill out all required fields in the current step.';
      return;
    } else {
      this.submissionError = null;
    }

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.submissionError = null;
    }
  }

  async onSubmit(): Promise<void> {
    this.submissionError = null;
    if (this.admissionForm.invalid) {
      this.admissionForm.markAllAsTouched();
      this.submissionError = 'Please correct all form errors before submitting.';
      return;
    }

    this.isLoading = true;
    try {
      let application: AdmissionApplication;
      const allFormValues = this.admissionForm.getRawValue();

      const flatValues = {
        ...allFormValues.basicDetails,
        ...allFormValues.contacts,
        ...allFormValues.documents,
        status: allFormValues.status,
        internalNotes: allFormValues.internalNotes
      };

      if (this.isEditMode && this.applicationId) {
        const foundApplication = await this.applicationRepo.findId(this.applicationId);
        if (!foundApplication) {
          throw new Error('Application not found for update!');
        }
        application = foundApplication;
        application.applicantName = flatValues.applicantName;
        application.applicantDob = new Date(flatValues.applicantDob);
        application.gradeApplyingFor = flatValues.gradeApplyingFor;
        application.parentName = flatValues.parentName;
        application.contactEmail = flatValues.contactEmail;
        application.contactPhone = flatValues.contactPhone;
        application.status = flatValues.status;
        application.internalNotes = flatValues.internalNotes;

      } else {
        application = this.applicationRepo.create();
        application.applicantName = flatValues.applicantName;
        application.applicantDob = new Date(flatValues.applicantDob);
        application.gradeApplyingFor = flatValues.gradeApplyingFor;
        application.parentName = flatValues.parentName;
        application.contactEmail = flatValues.contactEmail;
        application.contactPhone = flatValues.contactPhone;
        application.status = flatValues.status;
        application.internalNotes = flatValues.internalNotes;
      }

      await this.applicationRepo.save(application);
      alert(`Application ${this.isEditMode ? 'updated' : 'added'} successfully!`);
      this.router.navigate(['/admin/admissions']);
    } catch (error: any) {
      console.error('Submission failed:', error);
      if (error && error.modelState) {
        const fieldErrors = Object.keys(error.modelState).map(key => `${key}: ${error.modelState[key]}`).join('\n');
        this.submissionError = `Validation Error:\n${fieldErrors}`;
      } else {
        this.submissionError = `Error: ${error.message || 'Unknown error'}`;
      }
    } finally {
      this.isLoading = false;
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/admissions']);
  }

  // Helper method for the nav-pills to prevent default link behavior
  preventLinkDefault(event: Event): void {
    event.preventDefault();
  }
}