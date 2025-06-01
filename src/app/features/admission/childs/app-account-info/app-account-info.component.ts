import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  AccountInfo,
  createEmptyAccountInfo,
} from '../../../../../shared/models/UserModels';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
//import { validateEmail, validatePhoneNumber } from 'uthavu';

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, CommonModule, ReactiveFormsModule],
  templateUrl: './app-account-info.component.html',
  styleUrl: './app-account-info.component.scss',
})
export class AppAccountInfoComponent implements OnInit {
  //@Input() accountInfo = createEmptyAccountInfo();
  @Output() accountInfoChange = new EventEmitter<AccountInfo>();
  @Output() stepValidity = new EventEmitter<boolean>();

  @Input() accountDetailsForm!: FormGroup;
  private formStatusSubscription!: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the form with default values from accountInfo

    // let emptyAccountInfo = createEmptyAccountInfo();
    // this.accountDetailsForm = this.fb.group({
    //   username: [emptyAccountInfo.username, Validators.required],
    //   email: [
    //     emptyAccountInfo.email || '',
    //     [Validators.required, Validators.email],
    //   ],
    // });
    // this.formStatusSubscription =
    //   this.accountDetailsForm.valueChanges.subscribe(() => {
    //     // Emit the form's validity status to the parent whenever any value changes
    //     console.log('Form value changed:', this.accountDetailsForm.value);
    //     this.stepValidity.emit(this.accountDetailsForm.valid);
    //     this.accountInfoChange.emit(
    //       this.accountDetailsForm.value as AccountInfo
    //     ); // Emit the updated personal details
    //   });

    this.accountDetailsForm.markAllAsTouched();
  }

  getControl(name: string): AbstractControl | null {
    return this.accountDetailsForm.get(name);
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.formStatusSubscription) {
      this.formStatusSubscription.unsubscribe();
    }
  }

  // ngAfterViewInit(): void {
  //   console.log('Account Info Component Initialized');
  //   setTimeout(() => {
  //     if (this.accountInfoForm && this.accountInfoForm.form) {
  //       // Mark all controls as touched to immediately show validation messages
  //       this.accountInfoForm.form.markAllAsTouched();
  //       console.log('markAllAsTouched() called successfully.');

  //       // Subscribe to form status changes to emit validity to the parent
  //       // Use optional chaining (?) as statusChanges might not be immediately available
  //       // this.formStatusSubscription = this.accountInfoForm.statusChanges?.subscribe(() => {
  //       //   this.validateForm(); // Re-validate and emit validity when form status changes
  //       // });

  //       // Emit initial validity after marking as touched
  //       this.validateForm();
  //     } else {
  //       console.warn(
  //         'accountInfoNgForm or its form property is not available in setTimeout.'
  //       );
  //     }
  //   }); // No delay specified, defaults to 0ms

  //   console.log('Account Info Component Initialized 123');
  // }

  // validateForm(): void {
  //   const isValid =
  //     this.accountInfo.username.trim() !== '' &&
  //     this.validateEmail(this.accountInfo.email);
  //   console.log('Form Validity:', isValid);
  //   this.stepValidity.emit(isValid);
  // }

  // private validateEmail(email: string): boolean {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // }
}
