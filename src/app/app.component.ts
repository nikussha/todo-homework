import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  initialTodos: Array<Todo> = [];
  todosInProgress: Array<Todo> = [];
  completedTodos: Array<Todo> = [];
  formdata: string = '';
  difficulty: string = 'easy';

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
    console.log(todo);
    this.formdata = '';
  }

  changestate(item: Todo) {
    switch (item.state) {
      case 'undone':
        this.initialTodos = this.initialTodos.filter((obj) => obj !== item);
        this.todosInProgress.push(item);
        item.state = State.Progress;
        break;
      case 'progress':
        this.todosInProgress = this.todosInProgress.filter(
          (obj) => obj !== item
        );
        this.completedTodos.push(item);
        item.state = State.Done;
        console.log(item);
        break;
      case 'done':
        this.completedTodos = this.completedTodos.filter((obj) => obj !== item);
        this.todosInProgress.push(item);
        item.state = State.Progress;
        console.log(item);
        break;
    }
  }

  changeStateToUndone(item: Todo) {
    this.todosInProgress = this.todosInProgress.filter((obj) => obj !== item);
    this.initialTodos.push(item);
    item.state = State.Undone;
  }

  removeitem(item: Todo) {
    this.initialTodos = this.initialTodos.filter((obj) => obj !== item);
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

interface Todo {
  difficulty: string;
  name: string;
  id: number;
  state: State;
}

enum State {
  Undone = 'undone',
  Progress = 'progress',
  Done = 'done',
}

let exists = function checkifExists(arr: Array<Todo>, name: string) {
  const exists = arr.find((item: Todo) => item.name === name);
  return exists;
};

function createTodo(difficulty: string, formdata: string) {
  let todo: Todo = {
    difficulty: difficulty,
    name: formdata,
    id: Math.floor(Math.random() * 1000),
    state: State.Undone,
  };
  return todo;
}
