import { Component } from "./Component";
export declare enum FiberTags {
    HOST_COMPONENT = 0,
    CLASS_COMPONENT = 1,
    FUNCTION_COMPONENT = 2,
    HOST_ROOT = 3
}
export declare enum EffectTags {
    PLACEMENT = 0,
    UPDATE = 1,
    DELETION = 2
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
