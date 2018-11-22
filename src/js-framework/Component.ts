import { Fiber } from "./Fiber";
import { scheduleUpdate } from "./reconciler";

export abstract class Component {
  props: any;
  state: any;
  __fiber: Fiber;

  constructor(props: any) {
    this.props = props || {};
    this.state = this.state || {};
  }

  setState(partialState: any) {
    scheduleUpdate(this, partialState);
  }

  render() {}
}

export function createInstance(fiber: Fiber): Component {
  const instance = new (fiber.type as any)(fiber.props);
  instance.__fiber = fiber;
  return instance;
}
