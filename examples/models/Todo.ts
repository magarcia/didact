export class Todo {
  title: string;
  completed: boolean;

  constructor(title: string, completed: boolean = false) {
    this.title = title;
    this.completed = completed;
  }

  public toggle() {
    this.completed = !this.completed;
  }
}
