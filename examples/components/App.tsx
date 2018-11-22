/** @jsx Framework.createElement */

import Framework, { Component } from "../../src/js-framework";
import { Story } from "./Story";

export class App extends Component {
  render() {
    return (
      <div>
        <h1 class="title">Stories</h1>
        <div>
          {this.props.stories.map(story => {
            return <Story name={story.name} url={story.url} />;
          })}
        </div>
      </div>
    );
  }
}
