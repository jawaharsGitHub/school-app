import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for Angular directives like *ngIf, *ngFor
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // For reactive forms
import { HttpClient } from '@angular/common/http';
import { UserInfo } from 'remult';
import { remult } from 'remult'; // Import Remult for data management

@Component({
  selector: 'app-sign-in',
  standalone: true, // Mark as standalone
  imports: [CommonModule, ReactiveFormsModule], // Import necessary modules
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup; // Declare a FormGroup for the form
  remult = remult; // Initialize Remult instance for data management
  constructor(private fb: FormBuilder, private http: HttpClient) { } // Inject FormBuilder

  ngOnInit(): void {
    // Initialize the form with controls and validators
    this.signInForm = this.fb.group({
      username: ['', Validators.required], // Add required validator
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      console.log('Form Submitted!', this.signInForm.value);
      // Here you would typically send this data to your backend authentication service
      // Example: this.authService.login(this.signInForm.value.emailOrUsername, this.signInForm.value.password);

      this.http.post<UserInfo>('api/login', this.signInForm.value).subscribe({

        next: (user) => {
          this.remult.user = user; // Set the user in Remult
          console.log('Login successful!', user);
          // Handle successful login, e.g., redirect to dashboard or show success message
        },
        error: (error) => {
          console.error('Login failed', error);
          // Handle login failure, e.g., show error message to user
        }
      });
    } else {
      console.log('Form is invalid!');
      // You can add logic here to show validation errors to the user
      this.signInForm.markAllAsTouched(); // Mark all controls as touched to display errors
    }
  }
}