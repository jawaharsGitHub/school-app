import {Component, input} from '@angular/core';
import {Aviator, UserProfile, WizardStep, PersonalDetails,createEmptyUserProfile, AccountInfo } from '../../../shared/Models/UserModels';
import {NgFor, NgIf} from '@angular/common';
import { AppAccountInfoComponent } from "../childs/app-account-info/app-account-info.component";
 import { AppPreviewComponent } from "../childs/app-preview/app-preview.component";
import { PersonalDetailsFormComponent } from "../childs/app-personal-details/app-personal-details.component";
import {AppProfilePictureComponent} from "../childs/app-profile-picture/app-profile-picture.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'wizard-manager',
  standalone: true,
  imports: [FontAwesomeModule, NgFor, NgIf, AppAccountInfoComponent, AppPreviewComponent, PersonalDetailsFormComponent, AppProfilePictureComponent, PersonalDetailsFormComponent],
  templateUrl: './wizard-manager-main.component.html',
  styleUrl: './wizard-manager-main.component.scss'
})
export class WizardManagerMainComponent {

onFormStateChange(isValid: boolean) {
  console.log('Form State Changed:', isValid);
this.steps[this.currentStepIndex].isValid = isValid;

//  setTimeout(() => {
//      this.steps[this.currentStepIndex].isValid = isValid;
//      // If you also had logic here to change currentStepIndex based on form validity,
//      // that might also cause the issue.
//      // For example:
//      // if (isFormValid && this.currentStepIndex === SOME_STEP) {
//      //   this.currentStepIndex = NEXT_STEP; // This would cause the error if already checked.
//      // }
//   }, 0);
}

  steps: WizardStep[] = [
    { id: 'accountInfo', label: 'Account Information', isValid: false },
    { id: 'personalDetails', label: 'Personal Details', isValid: false },
    { id: 'profilePicture', label: 'Profile Picture', isValid: false },
    { id: 'preview', label: 'Preview & Confirm', isValid: false },
  ];

  currentStepIndex = 0;

  userProfile: UserProfile = createEmptyUserProfile();
  
  get isLastStep(): boolean {
    return this.currentStepIndex === this.steps.length - 1;
  }

  get isFirstStep(): boolean {
    return this.currentStepIndex === 0;
  }

  nextStep(): void {
    //if (this.steps[this.currentStepIndex].isValid) {
      this.currentStepIndex++;
    //}
  }

  goToStep(selectedStepIndex : number): void {
    //if (this.steps[this.currentStepIndex].isValid) {
      this.currentStepIndex = selectedStepIndex;
    //}
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

  // Update account information
  onAccountInfoChange(accountInfo: AccountInfo): void {
    //alert(JSON.stringify(accountInfo));
    console.log('Account Info Changed:', accountInfo);
    this.userProfile.accountInfo = accountInfo;
    console.log('userProfile Info Changed:', this.userProfile);
  }

  // Update personal details
  onPersonalDetailsChange(personalDetails: PersonalDetails): void {
    console.log('Personal Details Changed:', personalDetails);
    this.userProfile.personalDetails = personalDetails;
    console.log('Updated User Profile:', this.userProfile);
  }

  // Update profile picture
  onProfilePictureChange(profilePicture: Aviator): void {
    this.userProfile.profilePicture.urlDisplay = profilePicture.urlDisplay;
    this.userProfile.profilePicture.file = profilePicture.file;
  }

  get allStepsValid(): boolean {
    // check all stpes except last step


  return this.steps.slice(0, this.steps.length - 1).every(s => s.isValid);
}

  onSubmit(): void {
    console.log('User Profile Submitted:', this.userProfile);
    alert('Profile submitted successfully!');
  }
}