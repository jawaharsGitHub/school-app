import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-basic-details-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  template: `
    <div [formGroup]="basicDetailsForm">
      <h4>Basic Details</h4>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="applicantName" class="form-label">Applicant Name <span class="text-danger">*</span></label>
          <input
            type="text"
            id="applicantName"
            formControlName="applicantName"
            class="form-control"
            [class.is-invalid]="basicDetailsForm.get('applicantName')?.invalid && basicDetailsForm.get('applicantName')?.touched"
          />
          <div *ngIf="basicDetailsForm.get('applicantName')?.invalid && basicDetailsForm.get('applicantName')?.touched" class="invalid-feedback">
            Applicant Name is required (min 3 characters).
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="applicantDob" class="form-label">Date of Birth <span class="text-danger">*</span></label>
          <input
            type="date"
            id="applicantDob"
            formControlName="applicantDob"
            class="form-control"
            [class.is-invalid]="basicDetailsForm.get('applicantDob')?.invalid && basicDetailsForm.get('applicantDob')?.touched"
          />
          <div *ngIf="basicDetailsForm.get('applicantDob')?.invalid && basicDetailsForm.get('applicantDob')?.touched" class="invalid-feedback">
            Date of Birth is required.
          </div>
        </div>

        <div class="col-md-6 mb-3">
          <label for="gradeApplyingFor" class="form-label">Grade Applying For <span class="text-danger">*</span></label>
          <input
            type="text"
            id="gradeApplyingFor"
            formControlName="gradeApplyingFor"
            class="form-control"
            [class.is-invalid]="basicDetailsForm.get('gradeApplyingFor')?.invalid && basicDetailsForm.get('gradeApplyingFor')?.touched"
          />
          <div *ngIf="basicDetailsForm.get('gradeApplyingFor')?.invalid && basicDetailsForm.get('gradeApplyingFor')?.touched" class="invalid-feedback">
            Grade Applying For is required.
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="applicationDate" class="form-label">Application Date <span class="text-danger">*</span></label>
          <input
            type="date"
            id="applicationDate"
            formControlName="applicationDate"
            class="form-control"
            readonly
          />
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Add specific styles for this form section if needed */
  `]
})
export class BasicDetailsFormComponent {
  @Input() basicDetailsForm!: FormGroup; // Receive FormGroup from parent
}