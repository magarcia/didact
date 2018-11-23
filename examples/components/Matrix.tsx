/** @jsx Framework.createElement */

import Framework, { Component } from "../../src/js-framework";
import { Cell } from "./Cell";

const ROWS = 10;
const CELLS = 25;
export class Matrix extends Component {
  static getRandomTil(value: number) {
    return Math.floor(Math.random() * value);
  }

  static generateValues() {
    return Array.apply(null, Array(ROWS)).map(() => {
      return Array.apply(null, Array(CELLS)).map(() =>
        Matrix.getRandomTil(100)
      );
    });
  }

  render() {
    const rows = Matrix.generateValues();
    return (
      <table class="table">
        <tbody>
          {rows.map(values => (
            <tr>
              {values.map(() => (
                <Cell />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
