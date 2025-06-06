import { Component } from '@angular/core';
import { Task } from '../../../shared/entities/Task';
import { remult } from 'remult';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentController } from '../../../server/controllers/StudentController';


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
  newTaskTitle = '';

  ngOnInit() {
    this.taskRepo.find({
      orderBy: { id: 'asc' },
      limit: 10, page: 1
    }).then(tasks => {
      this.task = tasks;
    });
  }

  async addTask() {

    try {
      if (this.newTaskTitle.trim() === '') {
      return;
    }
    
    // StudentController.searchStudentbyName(this.newTaskTitle).then(students => {
    //   alert(JSON.stringify(students));
    // });

          
    const newTask = await this.taskRepo.insert({
      title: this.newTaskTitle
    });
    this.task.push(newTask);
    this.newTaskTitle = ''; // Clear the input field after adding the task
    }
    catch (error : any) {
      alert(error.message);
      
    }
    
  }
  

}
