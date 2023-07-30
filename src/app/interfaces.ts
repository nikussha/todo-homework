export interface Todo {
  difficulty: string;
  name: string;
  id: number;
  state: State;
}

export enum State {
  Undone = 'undone',
  Progress = 'progress',
  Done = 'done',
}
