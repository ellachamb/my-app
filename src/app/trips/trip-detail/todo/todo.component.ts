import { Component } from '@angular/core';
import { Todo } from './todo.model';
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
 todos: Todo[] = []; 
 newTask: string = '';
 
 addTask() {
  if (this.newTask.trim() !== '') {
    const newTodo = new Todo(this.todos.length + 1, this.newTask, false);
    this.todos.push(newTodo);
    this.newTask = ''; 
  }
}

  deleteTask(todo: Todo) {
  this.todos = this.todos.filter(t => t.id !== todo.id);
}

  toggleComplete(todo: Todo) {
  todo.completed = !todo.completed;
}

}
