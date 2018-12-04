/** @jsx Framework.createElement */

import Framework, { Component } from "../../src/js-framework";
import { Story } from "./Story";
import { Example } from "./Example";

export class App extends Component {
  render() {
    return (
      <div>
        <Example />
      </div>
    );
  }
}
