/** @jsx Framework.createElement */

import Framework from "../src/core";

const rootDom = document.getElementById("root");

const stories = [
  { name: "Didact introduction", url: "http://bit.ly/2pX7HNn" },
  { name: "Rendering DOM elements ", url: "http://bit.ly/2qCOejH" },
  { name: "Element creation and JSX", url: "http://bit.ly/2qGbw8S" },
  { name: "Instances and reconciliation", url: "http://bit.ly/2q4A746" },
  { name: "Components and state", url: "http://bit.ly/2rE16nh" }
];

class App extends Framework.Component {
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

function LikeButton(props) {
  return (
    <div
      class="tags is-normal has-addons"
      style="cursor: pointer;"
      onClick={e => props.like(e)}
    >
      <span class="tag" style="width: 35px">
        {props.likes}
      </span>
      <span class="tag is-danger">
        <i class="fas fa-heart" />
      </span>
    </div>
  );
}

class Story extends Framework.Component {
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

Framework.render(<App stories={stories} />, rootDom);
