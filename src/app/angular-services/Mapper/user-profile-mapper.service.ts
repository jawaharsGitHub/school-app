import { Injectable } from '@angular/core';
import { Applicant } from '../../../shared/entities/applicant'; // Adjust path to your AdmissionApplication entity
import { UserProfile, AccountInfo, PersonalDetails, Aviator, createEmptyApplicant } from  '../../../shared/models/UserModels'; // Adjust path to your UserModels
import { createEmptyUserProfile } from '../../../shared/models/UserModels';

@Injectable({
  providedIn: 'root' // Makes the service a singleton and available throughout the app
})
export class UserProfileMapperService {

  constructor() { }

 
  mapApplicationToFormValue(application: Applicant): {
    accountDetailsForm?: Partial<AccountInfo>;
    personalDetailsForm?: Partial<PersonalDetails>;
    profilePictureForm?: Partial<Aviator>;
    // Add other form group keys here
  } {
    // Helper to format dates to 'YYYY-MM-DD' string for HTML date inputs
    const formatDateToInput = (date: Date | string | undefined): string => {
      if (!date) return '';
      const d = typeof date === 'string' ? new Date(date) : date;
      if (isNaN(d.getTime())) return ''; // Handle invalid dates
      return d.toISOString().substring(0, 10);
    };

    return {
      accountDetailsForm: {
        username: application.firstName, // Mapping applicantName to username
        email: application.email,
      },
      personalDetailsForm: {
        firstName: application.firstName, // Mapping applicantName to firstName
        // Assuming other personal details fields exist on application or are derived
        lastName: '', // You'll need to map this from application if available
        dateOfBirth: formatDateToInput(application.applicationDate),
        gender: '', // Map from application if available
        nationality: '', // Map from application if available
        placeOfBirthCity: '', // Map from application if available
        placeOfBirthState: '', // Map from application if available
        placeOfBirthCountry: '', // Map from application if available
        nationalIdType: '', // Map from application if available
        nationalIdNumber: '', // Map from application if available
        hasDisability: false, // Map from application if available
      },
      profilePictureForm: {
        //urlDisplay: application.profilePictureUrl || null, // Assuming this property exists
      }
      // Add mappings for other form groups here
      // basicDetails: {
      //   applicantName: application.applicantName,
      //   applicantDob: formatDateToInput(application.applicantDob),
      //   gradeApplyingFor: application.gradeApplyingFor,
      //   applicationDate: formatDateToInput(application.applicationDate),
      // },
      // contacts: {
      //   parentName: application.parentName,
      //   contactEmail: application.contactEmail,
      //   contactPhone: application.contactPhone,
      // },
    };
  }

  /**
   * Optionally, you can also have a method to map the form's value back to a UserProfile
   * if your UserProfile structure is different from the form's structure.
   */
  mapFormValueToApplicant(formValue: any): Applicant {
    const applicant: Applicant = createEmptyApplicant(); // Start with an empty profile

    // Map accountInfo
    if (formValue.accountDetailsForm) {
      applicant.firstName = formValue.accountDetailsForm.username;
      applicant.email = formValue.accountDetailsForm.email;
    }

    // Map personalDetails
    if (formValue.personalDetailsForm) {
      applicant.firstName = formValue.personalDetailsForm.firstName;
      applicant.lastName = formValue.personalDetailsForm.lastName;
      //applicant.dateOfBirth = formValue.personalDetailsForm.dateOfBirth;
      // ... map other personal details
    }

    // Map profilePicture
    if (formValue.profilePictureForm) {
      //applicant.urlDisplay = formValue.profilePictureForm.urlDisplay;
    }

    return applicant;
  }
}