interface Props {
    id?: string;
    nodeValue?: string;
    children?: CoreElement[];
    [s: string]: any;
}
interface CoreElement {
    type: string | Function;
    props: Props;
}
interface CoreInstance {
    element: CoreElement;
    dom: HTMLElement | Text;
    childInstances: CoreInstance[];
    publicInstance?: Component;
    childInstance?: CoreInstance;
}
declare class Component {
    props: Props;
    state: any;
    __internalInstance: CoreInstance;
    constructor(props: Props);
    setState(partialState: any): void;
    render(): void;
}
declare function render(element: CoreElement, container: HTMLElement): void;
declare function createElement(type: string, config: any, ...args: any): {
    type: string;
    props: any;
};
declare const _default: {
    render: typeof render;
    createElement: typeof createElement;
    Component: typeof Component;
};
export default _default;
