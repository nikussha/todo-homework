import { Component } from '@angular/core';
import { Todo, State } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  initialTodos: Array<Todo> = [];

  addtodo(todo: Todo[]) {
    this.initialTodos = todo;
    console.log(this.initialTodos);
  }
}
