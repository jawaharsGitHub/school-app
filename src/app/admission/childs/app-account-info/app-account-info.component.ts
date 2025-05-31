import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { validateEmail, validatePhoneNumber } from 'uthavu';

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './app-account-info.component.html',
  styleUrl: './app-account-info.component.scss'
})
export class AppAccountInfoComponent {
  @Input() accountInfo = { username: '', email: '' };
  @Output() accountInfoChange = new EventEmitter<{ username: string; email: string }>();
  @Output() stepValidity = new EventEmitter<boolean>(); 


  validateForm(): void {
    const isValid = this.accountInfo.username.trim() !== '' && this.validateEmail(this.accountInfo.email);
    console.log('Form Validity:', isValid);
    this.stepValidity.emit(isValid);
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
}