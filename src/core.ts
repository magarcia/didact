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

function updateInstance(internalInstance: CoreInstance) {
  const parentDom = internalInstance.dom.parentNode;
  const element = internalInstance.element;
  reconcile(parentDom as HTMLElement, internalInstance, element);
}

export class Component {
  props: Props;
  state: any;
  __internalInstance: CoreInstance;

  constructor(props: Props) {
    this.props = props;
    this.state = {};
  }

  setState(partialState: any) {
    this.state = { ...this.state, ...partialState };
    updateInstance(this.__internalInstance);
  }
  render() {}
}

const TEXT_ELEMENT = "TEXT ELEMENT";
let rootInstance: CoreInstance | null = null;

function isTextElement(type: string) {
  return type === TEXT_ELEMENT;
}

function isAttribute(name: string) {
  return !isListener(name) && name != "children";
}

function isListener(name: string) {
  return name.indexOf("on") === 0;
}

function isDomElement(t: any) {
  return typeof t === "string";
}

function render(element: CoreElement, container: HTMLElement) {
  const prevInstance = rootInstance;
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
}

function reconcile(
  parentDom: HTMLElement | Text,
  instance: CoreInstance | null,
  element: CoreElement
) {
  if (instance == null) {
    // Create instance
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  } else if (element == null) {
    // Remove instance
    parentDom.removeChild(instance.dom);
    return null;
  } else if (instance.element.type !== element.type) {
    // Replace instance
    const newInstance = instantiate(element);
    parentDom.replaceChild(newInstance.dom, instance.dom);
    return newInstance;
  } else if (typeof element.type === "string") {
    // Update instance
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.element = element;
    instance.childInstances = reconcileChildren(instance, element);
    return instance;
  } else if (instance.publicInstance instanceof Component) {
    //Update composite instance
    (instance.publicInstance as Component).props = element.props;
    const childElement = (<unknown>(
      (instance.publicInstance as Component).render()
    )) as CoreElement;
    const oldChildInstance = instance.childInstance as CoreInstance;
    const childInstance = reconcile(
      parentDom,
      oldChildInstance,
      childElement
    ) as CoreInstance;
    instance.dom = childInstance.dom;
    instance.childInstance = childInstance;
    instance.element = element;
    return instance;
  } else {
    //Update functional instance
    const childElement = (<unknown>(
      (instance.publicInstance as Function)(element.props)
    )) as CoreElement;
    const oldChildInstance = instance.childInstance as CoreInstance;
    const childInstance = reconcile(
      parentDom,
      oldChildInstance,
      childElement
    ) as CoreInstance;
    instance.dom = childInstance.dom;
    instance.childInstance = childInstance;
    instance.element = element;
    return instance;
  }
}

function reconcileChildren(
  instance: CoreInstance,
  element: CoreElement
): CoreInstance[] {
  const dom = instance.dom;
  const childInstances = instance.childInstances;
  const nextChildElements = element.props.children || [];
  const newChildInstances = [];
  const count = Math.max(childInstances.length, nextChildElements.length);
  for (let i = 0; i < count; i++) {
    const childInstance = childInstances[i];
    const childElement = nextChildElements[i];
    const newChildInstance = reconcile(dom, childInstance, childElement);
    if (newChildInstance != null) newChildInstances.push(newChildInstance);
  }
  return newChildInstances;
}

function instantiate(element: CoreElement): CoreInstance {
  const { type, props } = element;

  if (isDomElement(type)) {
    const dom = isTextElement(type as string)
      ? document.createTextNode(props.nodeValue || "")
      : document.createElement(type as string);

    updateDomProperties(dom, [], props);

    const childElements = props.children || [];
    const childInstances = childElements.map(instantiate);
    childInstances
      .map(childInstance => childInstance.dom)
      .forEach(childDom => dom.appendChild(childDom));

    const instance: CoreInstance = { dom, element, childInstances };
    return instance;
  } else if ((type as any).prototype instanceof Component) {
    // Instantiate component element
    const instance = {} as CoreInstance;
    const publicInstance = createPublicInstance(element, instance);
    const childElement = publicInstance.render();
    const childInstance = instantiate(childElement);
    const dom = childInstance.dom;

    return (<any>Object).assign(instance, {
      dom,
      element,
      childInstance,
      publicInstance
    });
  } else {
    // Instantiate functional element
    const instance = {} as CoreInstance;
    const publicInstance = type as Function;
    const childElement = publicInstance(element.props);
    const childInstance = instantiate(childElement);
    const dom = childInstance.dom;

    return (<any>Object).assign(instance, {
      dom,
      element,
      childInstance,
      publicInstance
    });
  }
}

function createElement(type: string, config: any, ...args: any) {
  const props = { ...config };
  const hasChildren = args.length > 0;
  const rawChildren = hasChildren ? [].concat(...args) : [];
  props.children = rawChildren
    .filter(c => c != null && c !== false)
    .map((c: Object | string) =>
      c instanceof Object ? c : createTextElement(c)
    );
  return { type, props };
}

function updateDomProperties(
  dom: HTMLElement | Text,
  prevProps: Props,
  nextProps: Props
) {
  // Remove event listeners
  Object.keys(prevProps)
    .filter(isListener)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      (dom as HTMLElement).removeEventListener(eventType, prevProps[name]);
    });

  // Remove attributes
  Object.keys(prevProps)
    .filter(isAttribute)
    .forEach(name => {
      (dom as any)[name] = null;
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isListener)
    .forEach((name: string) => {
      const eventType: string = name.toLowerCase().substring(2);
      (dom as HTMLElement).addEventListener(eventType, nextProps[name]);
    });

  // Set attributes
  Object.keys(nextProps)
    .filter(isAttribute)
    .forEach(name => {
      const attrName = name === "class" ? "className" : name;
      (dom as any)[attrName] = nextProps[name];
    });
}

function createTextElement(value: string) {
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}

function createPublicInstance(
  element: CoreElement,
  internalInstance: CoreInstance
) {
  const { type: instanceType, props } = element;
  const publicInstance = new (instanceType as any)(props);
  publicInstance.__internalInstance = internalInstance;
  return publicInstance;
}

export default {
  render,
  createElement,
  Component
};
