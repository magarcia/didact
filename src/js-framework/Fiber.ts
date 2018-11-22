import { Component } from "./Component";

export enum FiberTags {
  HOST_COMPONENT,
  CLASS_COMPONENT,
  FUNCTION_COMPONENT,
  HOST_ROOT
}

export enum EffectTags {
  PLACEMENT,
  UPDATE,
  DELETION
}

export interface Fiber {
  tag: FiberTags;
  type: string | Component | Function;
  parent: Fiber;
  child?: Fiber | null;
  sibling?: Fiber | null;
  alternate?: Fiber;
  stateNode: Component | HTMLElement | Function;
  props: {
    children: Fiber[];
    className: string;
  };
  partialState: any;
  effectTag?: EffectTags;
  effects?: Fiber[];
}
