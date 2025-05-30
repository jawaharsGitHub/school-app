import { Component, EventEmitter, Input, Output } from '@angular/core';
import {  FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app-personal-details.component.html',
  styleUrl: './app-personal-details.component.scss'
})
export class AppPersonalDetailsComponent { 

  @Input() personalDetails = { firstName: '', lastName: '', dateOfBirth: '' };

  @Output() personalDetailsChange = new EventEmitter<{ firstName: string; lastName: string; dateOfBirth: string }>();
  @Output() stepValidity = new EventEmitter<boolean>();

  validateForm(): void {
    const isValid = this.personalDetails.firstName.trim() !== '' &&
      this.personalDetails.lastName.trim() !== '' &&
      this.personalDetails.dateOfBirth.trim() !== '';
    this.stepValidity.emit(isValid);
  }
}

