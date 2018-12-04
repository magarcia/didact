/** @jsx Framework.createElement */

import Framework, { Component } from "../../src/js-framework";
import { colors, randomInt } from "./utils";

const STYLE = {
  height: "100px",
  minWidth: "100px",
  flexBasis: "auto",
  color: "#fff",
  lineHeight: "70px",
  fontSize: "40px",
  fontWeight: "bold"
};

export class Column extends Component {
  constructor(props) {
    super(props);
    this.state = { value: randomInt() };
    this.setIntervalUpdate();
  }

  setIntervalUpdate() {
    setInterval(this.setRandomNumber.bind(this), 500);
  }

  setRandomNumber() {
    this.setState({ value: randomInt() });
  }

  getColor() {
    return colors[this.state.value % colors.length];
  }

  render() {
    return (
      <div
        class="column has-text-centered"
        style={{ ...STYLE, backgroundColor: this.getColor() }}
      >
        {this.state.value}
      </div>
    );
  }
}
