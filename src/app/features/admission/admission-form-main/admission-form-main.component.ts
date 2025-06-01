import { Component, input, OnInit } from '@angular/core';
import {
  Aviator,
  UserProfile,
  WizardStep,
  PersonalDetails,
  createEmptyUserProfile,
  AccountInfo,
  createEmptyAccountInfo,
  createEmptyPersonalDetails,
} from '../../../../shared/models/UserModels';
import { NgFor, NgIf } from '@angular/common';
import { AppAccountInfoComponent } from '../childs/app-account-info/app-account-info.component';
import { AppPreviewComponent } from '../childs/app-preview/app-preview.component';
import { PersonalDetailsFormComponent } from '../childs/app-personal-details/app-personal-details.component';
import { AppProfilePictureComponent } from '../childs/app-profile-picture/app-profile-picture.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Applicant,
  ApplicationStatus,
} from '../../../../shared/entities/applicant';
import { remult } from 'remult';
import { UserProfileMapperService } from '../../../angular-services/Mapper/user-profile-mapper.service';
import { ApplicantService } from '../../../angular-services/applicant.service';

@Component({
  selector: 'admission-form-main',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgFor,
    NgIf,
    AppAccountInfoComponent,
    AppPreviewComponent,
    PersonalDetailsFormComponent,
    AppProfilePictureComponent,
    PersonalDetailsFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './admission-form-main.component.html',
  styleUrl: './admission-form-main.component.css',
})
export class AdmissionMainComponent implements OnInit {
  applicantForm!: FormGroup; // Your main Reactive Form Group

  isEditMode = false;
  isLoading = false;
  applicationId: string | null = null;
  submittedApplicant: Applicant | null = null;

  steps: WizardStep[] = [
    { id: 'accountDetailsForm', label: 'Account Information', isValid: false },
    { id: 'personalDetailsForm', label: 'Personal Details', isValid: false },
    { id: 'profilePictureForm', label: 'Profile Picture', isValid: false },
    { id: 'preview', label: 'Preview & Confirm', isValid: false },
  ];

  currentStepIndex = 0;
  userProfile: UserProfile = createEmptyUserProfile();
  //wizardForm!: FormGroup;

  public applicationStatuses = Object.values(ApplicationStatus);
  private applicationRepo = remult.repo(Applicant);

  constructor(
    private fb: FormBuilder,
    //private remult: Remult,
    private userProfileMapper: UserProfileMapperService,
    private route: ActivatedRoute,
    private router: Router,
    private applicantService: ApplicantService
  ) {}

  ngOnInit(): void {
    //this.initForm();
    let emptyAccountInfo = createEmptyAccountInfo();
    let emptyPersonalDetails = createEmptyPersonalDetails();

    this.applicantForm = this.fb.group({
      accountDetailsForm: this.fb.group({
        username: [emptyAccountInfo.username, Validators.required],
        email: [
          emptyAccountInfo.email || '',
          [Validators.required, Validators.email],
        ],
      }), // Top-level FormGroup for AccountInfo
      personalDetailsForm: this.fb.group({
        firstName: [emptyPersonalDetails.firstName, Validators.required],
        middleName: [emptyPersonalDetails.middleName || ''], // Optional, so no required validator
        lastName: [emptyPersonalDetails.lastName, Validators.required],
        dateOfBirth: [emptyPersonalDetails.dateOfBirth, Validators.required],
        gender: [emptyPersonalDetails.gender, Validators.required],
        nationality: [emptyPersonalDetails.nationality, Validators.required],
        placeOfBirthCity: [
          emptyPersonalDetails.placeOfBirthCity,
          Validators.required,
        ],
        placeOfBirthState: [
          emptyPersonalDetails.placeOfBirthState,
          Validators.required,
        ],
        placeOfBirthCountry: [
          emptyPersonalDetails.placeOfBirthCountry,
          Validators.required,
        ],
        nationalIdType: [
          emptyPersonalDetails.nationalIdType,
          Validators.required,
        ],
        nationalIdNumber: [
          emptyPersonalDetails.nationalIdNumber,
          [Validators.required, Validators.pattern(/^\d{12}$/)], // Example: 12 digits for Aadhaar
        ],
        religion: [emptyPersonalDetails.religion || ''],
        casteCategory: [emptyPersonalDetails.casteCategory || ''],
        motherTongue: [emptyPersonalDetails.motherTongue || ''],
        bloodGroup: [emptyPersonalDetails.bloodGroup || ''],
        hasDisability: [emptyPersonalDetails.hasDisability],
        // disabilityDetails is conditional, so initialize with empty string and no initial validator
        disabilityDetails: [emptyPersonalDetails.disabilityDetails || ''],
      }),
      profilePictureForm: this.fb.group({
        // The initial value can be null, and you add Validators.required
        profilePictureFile: [null, Validators.required],
      }),
      // Add other top-level form groups for other steps if you have them
    });

    this.applicantForm.valueChanges.subscribe((value) => {
      this.userProfile = {
        ...this.userProfile,
        accountInfo: value.accountDetailsForm,
        personalDetails: value.personalDetailsForm,
        profilePicture: value.profilePictureForm,
      };
      //console.log('Form Value Changed123456:', this.userProfile);
      this.updateStepValidity();
    });

    this.applicationId = this.route.snapshot.paramMap.get('id');
    if (this.applicationId) {
      this.isEditMode = true;
      this.loadApplicationData(Number(this.applicationId));
    }
  }

  ngAfterViewInit(): void {
    this.updateStepValidity();
  }

  async loadApplicationData(id: number): Promise<void> {
    this.isLoading = true;
    try {
      const application = await this.applicationRepo.findId(id);
      if (application) {
        //console.log('Loaded Application:', application);
        //console.log('User Profile Account Info:', this.userProfile.accountInfo);
        const formPatchValue =
          this.userProfileMapper.mapApplicationToFormValue(application);
        //console.log('Form Patch Value:', formPatchValue);
        this.applicantForm.patchValue(formPatchValue);
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

  updateStepValidity(): void {
    this.steps.forEach((step) => {
      if (step.id) {
        //console.log('Checking validity for step:', step.id);
        const formGroup = this.applicantForm.get(step.id) as FormGroup;
        //console.log('FormGroup for step:', step.id, 'is', formGroup);
        step.isValid = formGroup ? formGroup.valid : false;
        //console.log('Step:', step.id, 'isValid:', step.isValid);
      } else {
        step.isValid = this.applicantForm.valid;
      }
    });

    //console.log('after updateStepValidity:', this.userProfile);
  }

  get isLastStep(): boolean {
    return this.currentStepIndex === this.steps.length - 1;
  }

  get isFirstStep(): boolean {
    return this.currentStepIndex === 0;
  }

  nextStep(): void {
    const currentStepForm = this.currentStepFormGroup;

    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
    }
  }

  goToStep(index: number): void {
    this.currentStepIndex = index;
    this.updateStepValidity();
    //}
  }

  get currentStepFormGroup(): FormGroup | null {
    const key = this.steps[this.currentStepIndex].id;
    return key ? (this.applicantForm.get(key) as FormGroup) : null;
  }

  previousStep(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }

  onStepValidityChange(isValid: boolean): void {
    console.log('Step Validity Changed:', isValid);
    this.steps[this.currentStepIndex].isValid = isValid;
  }

  get allStepsValid(): boolean {
    // check all stpes except last step

    //return this.steps.slice(0, this.steps.length - 1).every((s) => s.isValid);
    return this.applicantForm.valid;
  }

  get accountDetailsForm(): FormGroup {
    return this.applicantForm.get('accountDetailsForm') as FormGroup;
  }
  get personalDetailsForm(): FormGroup {
    return this.applicantForm.get('personalDetailsForm') as FormGroup;
  }

  get profilePictureForm(): FormGroup {
    return this.applicantForm.get('profilePictureForm') as FormGroup;
  }
  async onSubmit() {
    if (this.applicantForm.valid) {
      console.log('Submitting Form:', this.applicantForm.value);
      this.submittedApplicant =
        await this.applicantService.submitNewApplication(
          this.userProfileMapper.mapFormValueToApplicant(this.applicantForm.value)
        );
      this.applicantForm.reset();
      alert('Form submitted successfully!');
    } else {
      this.applicantForm.markAllAsTouched();
      alert('Please correct the errors in the form.');
    }
  }
}
