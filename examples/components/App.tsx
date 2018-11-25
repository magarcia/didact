/** @jsx Framework.createElement */

import Framework, { Component } from "../../src/js-framework";
import { Header } from "./Header";
import { TodoItem } from "./TodoItem";
import { Footer } from "./Footer";
import { Filters } from "./constants";
import { Todo } from "../models/Todo";
import { ENTER_KEY } from "./constants";

interface AppState {
  todos: Todo[];
  filter: Filters;
  editing: Todo | null;
}
export class App extends Component<any, AppState> {
  static filterTodos(todos: Todo[], filter: Filters): Todo[] {
    if (filter == Filters.ACTIVE_TODOS) {
      return todos.filter(todo => !todo.completed);
    }
    if (filter == Filters.COMPLETED_TODOS) {
      return todos.filter(todo => todo.completed);
    }
    return todos;
  }

  static countCompletedTodos(todos: Todo[]): number {
    return todos.filter(todo => todo.completed).length;
  }

  static countActiveTodos(todos: Todo[]): number {
    return todos.filter(todo => !todo.completed).length;
  }

  constructor(props) {
    super(props);
    this.state = {
      todos: [new Todo("Buy milk"), new Todo("Buy coffee", true)],
      filter: Filters.ALL_TODOS,
      editing: null
    };
  }

  public toggleAll(event) {
    var target: any = event.target;
    var checked = target.checked;
    this.setState({
      todos: this.state.todos.map(todo => {
        todo.completed = checked;
        return todo;
      })
    });
  }

  public toggleTodo(todo: Todo) {
    todo.toggle();
    this.setState({}); // tirgger state update
  }

  public removeTodo(todo: Todo) {
    this.setState({
      todos: this.state.todos.filter(t => t != todo)
    });
  }

  public setFilter(filter: Filters) {
    this.setState({ filter: filter });
  }

  public clearCompleted() {
    this.setState({
      todos: this.state.todos.filter(todo => !todo.completed)
    });
  }

  public onKeyDown(event) {
    const target = event.target;
    if (event.keyCode == ENTER_KEY) {
      event.preventDefault();
      this.setState({
        todos: [...this.state.todos, new Todo(target.value.trim())]
      });
      target.value = "";
    }
  }

  public edit(todo: Todo | null) {
    this.setState({ editing: todo });
  }

  public save(todo: Todo, text: string) {
    todo.title = text;
    this.setState({ editing: null });
  }

  public cancel() {
    this.setState({ editing: null });
  }

  public render() {
    const { todos, filter } = this.state;
    const filteredTodos: Todo[] = App.filterTodos(todos, filter);
    const completedTodosCount: number = App.countCompletedTodos(todos);
    const activeTodoCount: number = App.countActiveTodos(todos);

    return (
      <div>
        <Header onKeyDown={this.onKeyDown.bind(this)} />
        <section class="main">
          <input
            id="toggle-all"
            class="toggle-all"
            type="checkbox"
            onChange={this.toggleAll.bind(this)}
            checked={activeTodoCount === 0}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul class="todo-list">
            {filteredTodos.map(todo => {
              return (
                <TodoItem
                  todo={todo}
                  editing={this.state.editing == todo}
                  onToggle={this.toggleTodo.bind(this, todo)}
                  onDestroy={this.removeTodo.bind(this, todo)}
                  onEdit={this.edit.bind(this, todo)}
                  onSave={this.save.bind(this, todo)}
                  onCancel={this.cancel.bind(this)}
                />
              );
            })}
          </ul>
        </section>
        <Footer
          count={filteredTodos.length}
          completedCount={completedTodosCount}
          nowShowing={filter}
          onFilterSelected={this.setFilter.bind(this)}
          onClearCompleted={this.clearCompleted.bind(this)}
        />
      </div>
    );
  }
}
