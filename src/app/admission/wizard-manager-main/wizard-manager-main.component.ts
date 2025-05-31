import {Component, input} from '@angular/core';
import {Aviator, UserProfile, WizardStep, PersonalDetails,createEmptyUserProfile } from '../../../shared/Models/UserModels';
import {NgFor, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import { AppAccountInfoComponent } from "../childs/app-account-info/app-account-info.component";
 import { AppPreviewComponent } from "../childs/app-preview/app-preview.component";
import { PersonalDetailsFormComponent } from "../childs/app-personal-details/app-personal-details.component";
import {AppProfilePictureComponent} from "../childs/app-profile-picture/app-profile-picture.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'wizard-manager',
  standalone: true,
  imports: [FontAwesomeModule, NgFor, NgIf, NgSwitch, AppAccountInfoComponent, AppPreviewComponent, PersonalDetailsFormComponent, AppProfilePictureComponent, NgSwitchCase, PersonalDetailsFormComponent],
  templateUrl: './wizard-manager-main.component.html',
  styleUrl: './wizard-manager-main.component.scss'
})
export class WizardManagerMainComponent {

  steps: WizardStep[] = [
    { id: 'accountInfo', label: 'Account Information', isValid: false },
    { id: 'personalDetails', label: 'Personal Details', isValid: true },
    { id: 'profilePicture', label: 'Profile Picture', isValid: false },
    { id: 'preview', label: 'Preview & Confirm', isValid: true },
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
  onAccountInfoChange(accountInfo: { username: string; email: string }): void {
    //alert(JSON.stringify(accountInfo));
    console.log('Account Info Changed:', accountInfo);
    this.userProfile.accountInfo = accountInfo;
  }

  // Update personal details
  onPersonalDetailsChange(personalDetails: PersonalDetails): void {
    this.userProfile.personalDetails = personalDetails;
  }

  // Update profile picture
  onProfilePictureChange(profilePicture: Aviator): void {
    this.userProfile.profilePicture.urlDisplay = profilePicture.urlDisplay;
    this.userProfile.profilePicture.file = profilePicture.file;
  }

  onSubmit(): void {
    console.log('User Profile Submitted:', this.userProfile);
    alert('Profile submitted successfully!');
  }
}