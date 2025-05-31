import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { CommonModule } from '@angular/common';
import { remult } from 'remult';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '../shared/Entities/UserInfo';
//import { UserInfo } from 'remult';
import { MasterComponent } from './layout/master/master.component';
import { retry } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'school-app';
  remult = remult; // Initialize Remult instance

  constructor(private http: HttpClient) {
    // You can initialize any services or perform setup here if needed
  }
  ngOnInit() {
    this.http
      .get<UserInfo>('api/currentUser')
      .pipe(retry(50))
      .subscribe((user) => {
        console.log('Current user app component:', user);
        this.remult.user = {
          id: String(user.id),
          name: user.firstName + ' ' + user.lastName,
          roles: ['admin'], // optional
        }; // Set the current user in Remult
        console.log('Current user456:', this.remult.user);
      });
  }
}
