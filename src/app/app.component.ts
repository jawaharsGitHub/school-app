import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from "./todo/todo.component";
import { StudentFormComponent } from "./student-form/student-form.component";
import { CommonModule } from '@angular/common';
import { remult } from 'remult';
import { SignInComponent } from "./sign-in/sign-in.component";
import { HttpClient } from '@angular/common/http';
// import { UserInfo } from '../shared/Entities/UserInfo';
import { UserInfo } from 'remult';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TodoComponent, StudentFormComponent, SignInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'school-app';
  remult = remult; // Initialize Remult instance

  constructor(private http: HttpClient) {
    // You can initialize any services or perform setup here if needed
  }
  ngOnInit() {  
    
    this.http.get<UserInfo>('api/currentUser').subscribe(
      (user) => 
      {
        console.log('Current user:', user);
        this.remult.user = user; // Set the current user in Remult
      }
      
    );
  

  }
}
