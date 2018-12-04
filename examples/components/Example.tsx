/** @jsx Framework.createElement */

import Framework, { Component } from "../../src/js-framework";
import { Column } from "./Column";

const COLUMNS = 7;
const STYLE = { alignItems: "center", height: "100vh" };

export class Example extends Component {
  static getRandomTil(value: number) {
    return Math.floor(Math.random() * value);
  }

  static generateValues() {
    return Array.apply(null, Array(COLUMNS)).map(() => 1);
  }

  render() {
    const rows = Example.generateValues();
    return (
      <div class="columns is-multiline" style={STYLE}>
        {rows.map(_ => (
          <Column />
        ))}
      </div>
    );
  }
}
