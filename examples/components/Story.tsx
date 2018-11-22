/** @jsx Framework.createElement */

import Framework, { Component } from "../../src/core";
import { LikeButton } from "./LikeButton";

export class Story extends Component {
  state: any;
  constructor(props) {
    super(props);
    this.state = { likes: Math.ceil(Math.random() * 100) };
  }

  like(e) {
    this.setState({
      likes: this.state.likes + 1
    });
  }

  render() {
    const { name, url } = this.props;
    const { likes } = this.state;
    return (
      <div style="margin: 8px 0;">
        <div style="width: 75px" class="is-inline-block">
          <LikeButton likes={likes} like={this.like.bind(this)} />
        </div>
        <a href={url}>{name}</a>
      </div>
    );
  }
}
