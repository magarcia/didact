import { render } from "./reconciler";
import { createElement } from "./dom-utils";
export { Component } from "./Component";
declare const _default: {
    render: typeof render;
    createElement: typeof createElement;
    renderToString: (message?: any, ...optionalParams: any[]) => void;
};
export default _default;
