import { Fiber } from "./Fiber";
import { scheduleUpdate } from "./reconciler";

export abstract class Component<Props = any, State = any> {
  props: Props;
  state: State;
  __fiber: Fiber;

  constructor(props: Props) {
    this.props = (props || {}) as Props;
    this.state = (this.state || {}) as State;
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
