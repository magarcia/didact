import { Component } from "../../src/js-framework";
import { Filters } from "./constants";
import { Todo } from "../models/Todo";
interface AppState {
    todos: Todo[];
    filter: Filters;
    editing: Todo | null;
}
export declare class App extends Component<any, AppState> {
    static filterTodos(todos: Todo[], filter: Filters): Todo[];
    static countCompletedTodos(todos: Todo[]): number;
    static countActiveTodos(todos: Todo[]): number;
    constructor(props: any);
    toggleAll(event: any): void;
    toggleTodo(todo: Todo): void;
    removeTodo(todo: Todo): void;
    setFilter(filter: Filters): void;
    clearCompleted(): void;
    onKeyDown(event: any): void;
    edit(todo: Todo | null): void;
    save(todo: Todo, text: string): void;
    cancel(): void;
    render(): any;
}
export {};
