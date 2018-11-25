/** @jsx Framework.createElement */

import Framework from "../../src/js-framework";
import { Todo } from "../models/Todo";
import { ESCAPE_KEY, ENTER_KEY } from "./constants";

interface TodoItemProperties {
  todo: Todo;
  editing: boolean;
  onToggle: Function;
  onDestroy: Function;
  onEdit: Function;
  onSave: Function;
  onCancel: Function;
}

export function TodoItem(props: TodoItemProperties) {
  const todo: Todo = props.todo;
  const completedClass: string = todo.completed ? "completed" : "";
  const editingClass: string = props.editing ? "editing" : "";
  const editText: string = todo.title;

  function handleKeyDown(event) {
    if (event.keyCode === ESCAPE_KEY) {
      event.target.value = props.todo.title;
      props.onCancel(event);
    } else if (event.keyCode === ENTER_KEY) {
      handleSubmit(event);
    }
  }

  function handleSubmit(event) {
    props.onSave(event.target.value.trim());
  }

  return (
    <li class={[completedClass, editingClass].join(" ")}>
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={props.onToggle}
        />
        <label onDoubleClick={props.onEdit}>{todo.title}</label>
        <button class="destroy" onClick={props.onDestroy} />
      </div>
      <input
        class="edit"
        value={editText}
        onBlur={handleSubmit}
        onChange={handleSubmit}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
}
