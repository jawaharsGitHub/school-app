import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from "./todo/todo.component";
import { StudentFormComponent } from "./student-form/student-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoComponent, StudentFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'school-app';
}
