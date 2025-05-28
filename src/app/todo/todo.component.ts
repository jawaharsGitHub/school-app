import { Component } from '@angular/core';
import { Task } from '../../shared/Task';
import { remult } from 'remult';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  task: Task[] = [];

  taskRepo = remult.repo(Task);


  ngOnInit() {
    this.taskRepo.find({
      orderBy: { id: 'asc' },
      limit: 10, page: 1
    }).then(tasks => {
      this.task = tasks;
    });
  }
  

}
