/** @jsx Framework.createElement */

import Framework from "../../src/js-framework";
import { Filters } from "./constants";

interface FooterProperties {
  count: number;
  nowShowing:
    | Filters.ALL_TODOS
    | Filters.ACTIVE_TODOS
    | Filters.COMPLETED_TODOS;
  completedCount: number;
  onClearCompleted: Function;
  onFilterSelected: Function;
}

export function Footer(props: FooterProperties) {
  const activeTodoWord = props.count == 1 ? "item" : "items";
  return (
    <footer class="footer">
      <span class="todo-count">
        <strong>{props.count}</strong> {activeTodoWord} left
      </span>
      <ul class="filters">
        <li>
          <a
            onClick={() => props.onFilterSelected(Filters.ALL_TODOS)}
            class={props.nowShowing === Filters.ALL_TODOS ? "selected" : ""}
          >
            All
          </a>
        </li>{" "}
        <li>
          <a
            onClick={() => props.onFilterSelected(Filters.ACTIVE_TODOS)}
            class={props.nowShowing === Filters.ACTIVE_TODOS ? "selected" : ""}
          >
            Active
          </a>
        </li>{" "}
        <li>
          <a
            onClick={() => props.onFilterSelected(Filters.COMPLETED_TODOS)}
            class={
              props.nowShowing === Filters.COMPLETED_TODOS ? "selected" : ""
            }
          >
            Completed
          </a>
        </li>
      </ul>
      {props.completedCount > 0 && (
        <button className="clear-completed" onClick={props.onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
}
