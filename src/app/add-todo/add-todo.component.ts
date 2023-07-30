import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo, State } from '../interfaces';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent {
  formdata: string = '';
  difficulty: string = 'easy';
  @Input() initialTodos: Todo[] = [];
  @Output() emitter = new EventEmitter<Todo[]>();

  addTodo() {
    if (!this.formdata) {
      console.log('input empty');
      return;
    }
    const todo = createTodo(this.difficulty, this.formdata);

    const ifexists = exists(this.initialTodos, this.formdata);
    if (ifexists) {
      return;
    }
    this.initialTodos.push(todo);
    this.emitter.emit(this.initialTodos);
    this.formdata = '';
  }
}

function createTodo(difficulty: string, formdata: string) {
  let todo: Todo = {
    difficulty: difficulty,
    name: formdata,
    id: Math.floor(Math.random() * 1000),
    state: State.Undone,
  };
  return todo;
}

let exists = function checkifExists(arr: Array<Todo>, name: string) {
  const exists = arr.find((item: Todo) => item.name === name);
  return exists;
};
