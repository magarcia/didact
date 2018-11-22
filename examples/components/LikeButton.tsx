/** @jsx Framework.createElement */

import Framework, { Component } from "../../src/js-framework";

export function LikeButton(props) {
  return (
    <div
      class="tags is-normal has-addons"
      style={{ cursor: "pointer" }}
      onClick={e => props.like(e)}
    >
      <span class="tag" style={{ width: "35px" }}>
        {props.likes}
      </span>
      <span class="tag is-danger">
        <i class="fas fa-heart" />
      </span>
    </div>
  );
}
