import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo, State } from '../interfaces';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input() initialTodos: Todo[] = [];
  @Output() initialTodosChange = new EventEmitter();

  todosInProgress: Todo[] = [];
  completedTodos: Todo[] = [];

  changeStateToUndone(item: Todo) {
    this.todosInProgress = this.todosInProgress.filter((obj) => obj !== item);
    this.initialTodos.push(item);
    item.state = State.Undone;
    this.initialTodosChange.emit(this.initialTodos);
  }
  todoStateChange(todo: Todo) {
    switch (todo.state) {
      case 'undone':
        this.initialTodos = this.initialTodos.filter((obj) => obj !== todo);
        this.todosInProgress.push(todo);
        todo.state = State.Progress;
        this.initialTodosChange.emit(this.initialTodos);
        break;
      case 'progress':
        this.todosInProgress = this.todosInProgress.filter(
          (obj) => obj !== todo
        );
        this.completedTodos.push(todo);
        todo.state = State.Done;
        break;
      case 'done':
        this.completedTodos = this.completedTodos.filter((obj) => obj !== todo);
        this.todosInProgress.push(todo);
        todo.state = State.Progress;
        break;
    }
  }

  deleteTodo(todo: Todo) {
    this.initialTodos = this.initialTodos.filter((item) => item !== todo);
    this.initialTodosChange.emit(this.initialTodos);
  }

  generateColor(todo: Todo) {
    if (todo.difficulty === 'easy') {
      return 'btn-success';
    } else if (todo.difficulty === 'medium') {
      return 'btn-primary';
    } else {
      return 'btn-danger';
    }
  }
}
