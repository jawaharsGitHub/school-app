// src/app/admission/personal-details-form/personal-details-form.component.ts

import { Component, Input, Output, EventEmitter, ViewChild, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule and NgForm

import { PersonalDetails } from '../../../../shared/Models/UserModels'; // Adjust the import path as necessary

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ensure FormsModule is imported here
  templateUrl: './app-personal-details.component.html',
  styleUrls: ['./app-personal-details.component.css']
})
export class PersonalDetailsFormComponent implements OnInit, DoCheck, AfterViewInit {
  @Input() personalDetails!: PersonalDetails; // Input for the personal details object
  @Output() personalDetailsChange = new EventEmitter<PersonalDetails>(); // Emit changes to parent
  @Output() formValidityChange = new EventEmitter<boolean>(); // Emit validity to parent
   @Output() stepValidity = new EventEmitter<boolean>(); 

  @ViewChild('personalDetailsNgForm') personalDetailsNgForm!: NgForm; // Access the NgForm instance

  // Dropdown options
  genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
  nationalIdTypes = ['Aadhaar', 'Passport', 'Driving License', 'Other'];
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  casteCategories = ['General', 'OBC', 'SC', 'ST', 'EWS', 'Other']; // Customize as per local context

  private initialValidityEmitted = false;

  ngOnInit(): void {
    // Initialize personalDetails if it's not provided by the parent
    if (!this.personalDetails) {
      this.personalDetails = {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        placeOfBirthCity: '',
        placeOfBirthState: '',
        placeOfBirthCountry: '',
        nationalIdType: '',
        nationalIdNumber: '',
        hasDisability: false
      };
    }
  }

  ngAfterViewInit(): void {
    // Emit initial validity after view is initialized and form ref is available
    if (this.personalDetailsNgForm) {
      this.formValidityChange.emit(this.personalDetailsNgForm.valid ?? undefined);
      this.initialValidityEmitted = true;
    }
  }

  ngDoCheck(): void {
    // This is important for Template-Driven Forms to emit validity reliably
    // Check validity on every change detection cycle
    if (this.personalDetailsNgForm && this.personalDetailsNgForm.dirty) {
      this.formValidityChange.emit(this.personalDetailsNgForm.valid ?? undefined);
    } else if (this.personalDetailsNgForm && !this.initialValidityEmitted && !this.personalDetailsNgForm.pristine) {
      // Handle cases where form might be populated from parent data and thus not 'dirty' initially
      this.formValidityChange.emit(this.personalDetailsNgForm.valid ?? undefined);
      this.initialValidityEmitted = true;
    }
  }

  // Method called on ngModelChange
  onInputChange(): void {
    this.personalDetailsChange.emit(this.personalDetails);
    // Validity will be emitted by ngDoCheck
  }

  // Custom validation for disabilityDetails
  updateDisabilityDetailsRequired(): void {
    if (!this.personalDetails.hasDisability) {
      this.personalDetails.disabilityDetails = undefined; // Clear value if checkbox unchecked
    }
    // Since ngModel doesn't have easy conditional validators,
    // we rely on the parent form to mark it invalid if it's required and empty
    // For a robust solution, Reactive Forms are strongly recommended here.
    // If you absolutely need client-side validation for this in TD Forms,
    // you'd typically handle it manually in your 'validateForm' logic or
    // rely on simple `required` attribute only when `hasDisability` is true.
  }
}