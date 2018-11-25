import { Fiber } from "./Fiber";
export declare abstract class Component<Props = any, State = any> {
    props: Props;
    state: State;
    __fiber: Fiber;
    constructor(props: Props);
    setState(partialState: any): void;
    render(): void;
}
export declare function createInstance(fiber: Fiber): Component;
