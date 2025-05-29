import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for Angular directives like *ngIf, *ngFor
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // For reactive forms
import { HttpClient } from '@angular/common/http';
import { UserInfo } from 'remult';
import { remult } from 'remult'; // Import Remult for data management
import { Router } from '@angular/router';

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
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { } // Inject FormBuilder

  ngOnInit(): void {
    // Initialize the form with controls and validators
    this.signInForm = this.fb.group({
      username: ['', Validators.required], // Add required validator
      password: ['', Validators.required]
    });

    this.signInForm.valueChanges.subscribe(() => {
  this.loginError = null;
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
           this.router.navigate(['/']);
          console.log('Login successful!', user);
          this.loginError = null; // Clear error if login succeeds
          // Handle successful login, e.g., redirect to dashboard or show success message
        },
        error: (error) => {
          console.error('Login failed', error);
          if (error.status === 401) {
    this.loginError = 'Invalid username or password';
  } else {
    this.loginError = 'An unexpected error occurred. Please try again later.';
  }
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