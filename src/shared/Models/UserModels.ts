export interface WizardStep {
    id: string;
    label: string;
    isValid: boolean;
  }

  export interface UserProfile {
    accountInfo: AccountInfo;
    personalDetails: PersonalDetails;
    profilePicture: Aviator;
  }

  
  export interface AccountInfo {
    username: string;
    email: string;
  }

    export function createEmptyAccountInfo(): AccountInfo {
        return { username: '', email: '' };
    }
  
  export interface Aviator {
    file: File;
    urlDisplay: string | null; // URL for displaying the image, can be null if not set
  }

  export function createEmptyProfilePicture(): Aviator {
        return { file: new File( [],''), urlDisplay: null };
    }


  // src/app/shared/models/personal-details.model.ts

export interface PersonalDetails {
  firstName: string;
  middleName?: string; // Optional
  lastName: string;
  dateOfBirth: string; // Using string for date input
  gender: string;
  nationality: string;
  placeOfBirthCity: string;
  placeOfBirthState: string;
  placeOfBirthCountry: string;
  nationalIdType: string;
  nationalIdNumber: string;
  religion?: string; // Optional
  casteCategory?: string; // Optional
  motherTongue?: string; // Optional
  bloodGroup?: string; // Optional
  hasDisability: boolean;
  disabilityDetails?: string; // Optional, conditionally required
}

/**
 * Creates and returns a new PersonalDetails object with default empty values.
 * This function ensures all required properties are initialized.
 */
export function createEmptyPersonalDetails(): PersonalDetails {
  return {
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
    hasDisability: false, // Default for boolean
    // Optional properties can be omitted, as they will be `undefined`
    // If you prefer explicit empty strings for optional string properties:
    // middleName: '',
    // religion: '',
    // casteCategory: '',
    // motherTongue: '',
    // bloodGroup: '',
    // disabilityDetails: ''
  };
}

export function createEmptyUserProfile(): UserProfile {
  return {
    accountInfo: createEmptyAccountInfo(),
    personalDetails: createEmptyPersonalDetails(),
    profilePicture: createEmptyProfilePicture()
  };
}
  