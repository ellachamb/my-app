import { Component, Input } from '@angular/core';
import { Task } from '../../trip.model'; 
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
  @Input() tripTasks: Task[] = [];  
  newTask: string = '';
  
  addTask() {
    if (this.newTask.trim() !== '') {
      const newTask = new Task(
        (this.tripTasks.length + 1).toString(), 
        this.newTask,
        false
      );
      this.tripTasks.push(newTask);  // Add new task to the task list
      this.newTask = '';  // Clear input field
    }
  }

  // Delete a task from the current trip
  deleteTask(task: Task) {
    this.tripTasks = this.tripTasks.filter(t => t.id !== task.id);
  }

  // Toggle the completion status of a task
  toggleComplete(task: Task) {
    task.completed = !task.completed;
  }
}
