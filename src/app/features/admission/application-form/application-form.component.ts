// src/app/features/admission/pages/application-form/application-form.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // For ngIf, ngFor, etc.
import { ApplicantService } from './../../../angular-services/applicant.service'; // Adjust path to your service
import {
  Applicant,
  ApplicationStatus,
} from '../../../../shared/entities/applicant'; // Adjust path
import { ActivatedRoute, Router } from '@angular/router'; // To navigate after submission
import { remult } from 'remult';
import { UserRole } from '../../../../shared/interfaces/user-models';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './application-form.component.html',
  styles: ['./application-form.component.css'],
})
export class ApplicationFormComponent implements OnInit {
  applicationForm!: FormGroup;
  submittedSuccessfully: boolean = false;
  submittedApplicantId: number | null = null;
  errorMessage: string | null = null;
  submitting: boolean = false;
  isEditMode: boolean = false;
  applicant: Applicant | null = null;
  loadingData: boolean = false;

  constructor(
    private fb: FormBuilder,
    private applicantService: ApplicantService,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private router: Router // Inject Router for navigation
  ) {}

  async ngOnInit(): Promise<void> {
    this.initForm();

    // Check if we are in edit mode
    const applicantId = this.route.snapshot.paramMap.get('id');
    if (applicantId) {
      this.isEditMode = true;
      await this.loadApplicantData(Number( applicantId));
    } else {
      this.isEditMode = false;
    }
  }

  initForm(): void {
    this.applicationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gradeApplyingFor: ['', Validators.required],
      // applicationStatus is included here but will be conditionally enabled/shown in HTML
      // Default value only for consistency, backend's saving hook will set 'Submitted' for new inserts
      applicationStatus: [
        {
          value: ApplicationStatus.Submitted,
          disabled: !this.isAdminOrStaff(),
        },
        Validators.required,
      ],
    });
  }

  async loadApplicantData(id: number): Promise<void> {
    this.loadingData = true;
    this.errorMessage = null;
    try {
      this.applicant = await this.applicantService.getApplicantById(id);
      if (this.applicant) {
        // Patch the form with existing applicant data
        this.applicationForm.patchValue({
          firstName: this.applicant.firstName,
          lastName: this.applicant.lastName,
          email: this.applicant.email,
          // Format date for input[type="date"]
          dob: this.applicant.dob
            ? new Date(this.applicant.dob).toISOString().split('T')[0]
            : '',
          mobile: this.applicant.mobile,
          gradeApplyingFor: this.applicant.gradeApplyingFor,
          applicationStatus: this.applicant.applicationStatus,
        });

        // If the user is NOT admin/staff, disable the email field in edit mode
        // as email should ideally be changed through a separate process or not at all.
        if (!this.isAdminOrStaff()) {
          this.applicationForm.get('email')?.disable();
        }
        // Conditionally enable applicationStatus for admins
        if (this.isAdminOrStaff()) {
          this.applicationForm.get('applicationStatus')?.enable();
        } else {
          this.applicationForm.get('applicationStatus')?.disable(); // Keep disabled for applicants
        }
      } else {
        this.errorMessage = 'Applicant not found.';
        this.router.navigate(['/admin/applicants']); // Redirect if not found
      }
    } catch (error: any) {
      this.errorMessage =
        'Failed to load applicant details: ' +
        (error.message || 'Unknown error');
      console.error(error);
    } finally {
      this.loadingData = false;
    }
  }

  isAdminOrStaff(): boolean {
  const currentUser = remult.user;
  return (
    !!currentUser &&
    (!!currentUser.roles?.includes(UserRole.Admin) ||
     !!currentUser.roles?.includes(UserRole.Staff))
  );
}

  async onSubmit(): Promise<void> {
    this.submittedSuccessfully = false;
    this.errorMessage = null;
    this.submitting = false;

    if (this.applicationForm.valid) {
      this.submitting = true;
      try {
        const formData: Applicant = this.applicationForm.getRawValue(); // Use getRawValue to get values from disabled controls

        let savedApplicant: Applicant;
        if (this.isEditMode && this.applicant) {
          // Merge form data with existing applicant object (important for ID and other Remult internal fields)
          Object.assign(this.applicant, formData);
          savedApplicant = await this.applicantService.updateApplicant(this.applicant);
          this.submittedApplicantId = savedApplicant.id;
          this.submittedSuccessfully = true;
          //this.router.navigate(['/admin/applicants', savedApplicant.id], { queryParams: { updated: true } }); // Redirect to detail view
          this.router.navigate(['/admin/applicants']); // Redirect to applicants list
        } else {
          // New application
          savedApplicant = await this.applicantService.submitNewApplication(formData);
          this.submittedSuccessfully = true;
          this.submittedApplicantId = savedApplicant.id;
          this.applicationForm.reset();
          // Optionally, redirect to a success page or status page for the applicant
          // this.router.navigate(['/application-success', savedApplicant.id]);
        }
      } catch (error: any) {
        console.error('Application submission failed:', error);
        if (error.message && error.message.includes('unique: email')) {
          this.errorMessage = 'An application with this email already exists. Please use a different email or check your existing application status.';
        } else {
          this.errorMessage = error.message || 'An unexpected error occurred during submission. Please try again.';
        }
      } finally {
        this.submitting = false;
      }
    } else {
      this.errorMessage = 'Please fix the errors in the form before submitting.';
      this.applicationForm.markAllAsTouched();
    }
  }
}
