import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from "./todo/todo.component";
import { StudentFormComponent } from "./student-form/student-form.component";
import { CommonModule } from '@angular/common';
import { Remult } from 'remult';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule ,RouterOutlet, TodoComponent, StudentFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'school-app';
  remult = new Remult(); // Initialize Remult instance
}
