import { Todo } from "../models/Todo";
interface TodoItemProperties {
    todo: Todo;
    editing: boolean;
    onToggle: Function;
    onDestroy: Function;
    onEdit: Function;
    onSave: Function;
    onCancel: Function;
}
export declare function TodoItem(props: TodoItemProperties): any;
export {};
