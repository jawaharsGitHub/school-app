export interface WizardStep {
    id: string;
    label: string;
    isValid: boolean;
  }

  export interface UserProfile {
    accountInfo: { username: string; email: string };
    personalDetails: { firstName: string; lastName: string; dateOfBirth: string };
    profilePicture: Aviator;
  }
  
  export interface Aviator {
    file: File;
    urlDisplay: string;
  }
  