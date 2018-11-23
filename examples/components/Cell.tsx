/** @jsx Framework.createElement */

import Framework, { Component } from "../../src/js-framework";

const colors = [
  "has-background-white",
  "has-background-light",
  "has-background-primary",
  "has-background-info",
  "has-background-link",
  "has-background-success",
  "has-background-warning",
  "has-background-danger"
];
export class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Cell.getRandomTil(100)
    };
    const interval = Cell.getRandomTil(500);
    setInterval(() => {
      this.setState({ value: Cell.getRandomTil(100) });
    }, 1000 + interval);
  }

  static getRandomTil(value: number) {
    return Math.floor(Math.random() * value);
  }

  render() {
    return (
      <td class={colors[this.state.value % colors.length]}>
        {this.state.value}
      </td>
    );
  }
}
