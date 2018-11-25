/** @jsx Framework.createElement */

import Framework from "../../src/js-framework";

interface HeaderProperties {
  onKeyDown: Function;
}
export function Header(props: HeaderProperties) {
  return (
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={props.onKeyDown}
        autoFocus={true}
      />
    </header>
  );
}
