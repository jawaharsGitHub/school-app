// src/app/admission/personal-details-form/personal-details-form.component.ts

import { Component, Input, Output, EventEmitter, ViewChild, OnInit, DoCheck, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormsModule and NgForm

import { createEmptyPersonalDetails, PersonalDetails } from '../../../../shared/Models/UserModels'; // Adjust the import path as necessary
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Ensure FormsModule is imported here
  templateUrl: './app-personal-details.component.html',
  styleUrls: ['./app-personal-details.component.css']
})
export class PersonalDetailsFormComponent implements OnInit, OnDestroy {

  personalDetailsForm!: FormGroup;
  private formStatusSubscription!: Subscription;
  
  @Input() personalDetails!: PersonalDetails; // Input for the personal details object
  @Output() personalDetailsChange = new EventEmitter<PersonalDetails>(); // Emit changes to parent
  @Output() formValidityChange = new EventEmitter<boolean>(); // Emit validity to parent
   @Output() stepValidity = new EventEmitter<boolean>(); 

   //@Output() formStatusChange = new EventEmitter<boolean>();

  @ViewChild('personalDetailsNgForm') personalDetailsNgForm!: NgForm; // Access the NgForm instance

  // Dropdown options
  genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
  nationalIdTypes = ['Aadhaar', 'Passport', 'Driving License', 'Other'];
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  casteCategories = ['General', 'OBC', 'SC', 'ST', 'EWS', 'Other']; // Customize as per local context

  //private initialValidityEmitted = false;

  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void {
    // Initialize personalDetails if it's not provided by the parent
    this.personalDetailsForm = this.fb.group({
      firstName: [createEmptyPersonalDetails().firstName, Validators.required],
      middleName: [createEmptyPersonalDetails().middleName || ''], // Optional, so no required validator
      lastName: [createEmptyPersonalDetails().lastName, Validators.required],
      dateOfBirth: [createEmptyPersonalDetails().dateOfBirth, Validators.required],
      gender: [createEmptyPersonalDetails().gender, Validators.required],
      nationality: [createEmptyPersonalDetails().nationality, Validators.required],
      placeOfBirthCity: [createEmptyPersonalDetails().placeOfBirthCity, Validators.required],
      placeOfBirthState: [createEmptyPersonalDetails().placeOfBirthState, Validators.required],
      placeOfBirthCountry: [createEmptyPersonalDetails().placeOfBirthCountry, Validators.required],
      nationalIdType: [createEmptyPersonalDetails().nationalIdType, Validators.required],
      nationalIdNumber: [
        createEmptyPersonalDetails().nationalIdNumber,
        [Validators.required, Validators.pattern(/^\d{12}$/)] // Example: 12 digits for Aadhaar
      ],
      religion: [createEmptyPersonalDetails().religion || ''],
      casteCategory: [createEmptyPersonalDetails().casteCategory || ''],
      motherTongue: [createEmptyPersonalDetails().motherTongue || ''],
      bloodGroup: [createEmptyPersonalDetails().bloodGroup || ''],
      hasDisability: [createEmptyPersonalDetails().hasDisability],
      // disabilityDetails is conditional, so initialize with empty string and no initial validator
      disabilityDetails: [createEmptyPersonalDetails().disabilityDetails || '']
    });

    // 2. Subscribe to valueChanges for dynamic validation (e.g., hasDisability)
    this.formStatusSubscription = this.personalDetailsForm.valueChanges.subscribe(() => {
      // Emit the form's validity status to the parent whenever any value changes
      console.log('Form value changed:', this.personalDetailsForm.value);
      this.stepValidity.emit(this.personalDetailsForm.valid);
      this.personalDetailsChange.emit(this.personalDetailsForm.value as PersonalDetails); // Emit the updated personal details
    });

    // 3. Handle conditional validation for 'disabilityDetails'
    this.personalDetailsForm.get('hasDisability')?.valueChanges.subscribe(hasDisability => {
      const disabilityDetailsControl = this.personalDetailsForm.get('disabilityDetails');
      if (disabilityDetailsControl) { // Check if control exists
        if (hasDisability) {
          disabilityDetailsControl.setValidators(Validators.required);
        } else {
          disabilityDetailsControl.clearValidators();
        }
        disabilityDetailsControl.updateValueAndValidity(); // Recalculate validation status
      }
    });

    this.personalDetailsForm.markAllAsTouched();
   
    // Emit initial form validity state
    this.stepValidity.emit(this.personalDetailsForm.valid);

    

  }

   ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.formStatusSubscription) {
      this.formStatusSubscription.unsubscribe();
    }
  }

   // Helper method to get a form control for easier access in template
  getControl(name: string): AbstractControl | null {
    
    return this.personalDetailsForm.get(name);

  }

  // ngAfterViewInit(): void {
  //   // Emit initial validity after view is initialized and form ref is available
  //   if (this.personalDetailsNgForm) {
  //     this.formValidityChange.emit(this.personalDetailsNgForm.valid ?? undefined);
  //     this.initialValidityEmitted = true;
  //   }
  // }

  // ngDoCheck(): void {
  //   // This is important for Template-Driven Forms to emit validity reliably
  //   // Check validity on every change detection cycle
  //   if (this.personalDetailsNgForm && this.personalDetailsNgForm.dirty) {
  //     this.formValidityChange.emit(this.personalDetailsNgForm.valid ?? undefined);
  //   } else if (this.personalDetailsNgForm && !this.initialValidityEmitted && !this.personalDetailsNgForm.pristine) {
  //     // Handle cases where form might be populated from parent data and thus not 'dirty' initially
  //     this.formValidityChange.emit(this.personalDetailsNgForm.valid ?? undefined);
  //     this.initialValidityEmitted = true;
  //   }
  // }

  // Method called on ngModelChange
  // onInputChange(): void {
  //   this.personalDetailsChange.emit(this.personalDetails);
  //   // Validity will be emitted by ngDoCheck
  // }

  // Custom validation for disabilityDetails
  // updateDisabilityDetailsRequired(): void {
  //   if (!this.personalDetails.hasDisability) {
  //     this.personalDetails.disabilityDetails = undefined; // Clear value if checkbox unchecked
  //   }
    // Since ngModel doesn't have easy conditional validators,
    // we rely on the parent form to mark it invalid if it's required and empty
    // For a robust solution, Reactive Forms are strongly recommended here.
    // If you absolutely need client-side validation for this in TD Forms,
    // you'd typically handle it manually in your 'validateForm' logic or
    // rely on simple `required` attribute only when `hasDisability` is true.
  //}

   
}