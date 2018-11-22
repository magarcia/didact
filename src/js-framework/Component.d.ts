import { Fiber } from "./Fiber";
export declare abstract class Component {
    props: any;
    state: any;
    __fiber: Fiber;
    constructor(props: any);
    setState(partialState: any): void;
    render(): void;
}
export declare function createInstance(fiber: Fiber): Component;
