import { FiberTags, EffectTags, Fiber } from "./Fiber";
import { updateDomProperties, createDomElement } from "./dom-utils";
import { createInstance, Component } from "./Component";

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: (() => number);
};

declare global {
  interface Window {
    requestIdleCallback: ((
      callback: ((deadline: RequestIdleCallbackDeadline) => void),
      opts?: RequestIdleCallbackOptions
    ) => RequestIdleCallbackHandle);
    cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
  }
}

interface UpdateUnit {
  from: FiberTags.HOST_ROOT | FiberTags.CLASS_COMPONENT;
  dom?: HTMLElement;
  newProps?: any;
  instance?: Component;
  partialState?: any;
}
// Global state
const updateQueue: UpdateUnit[] = [];
let nextUnitOfWork = null;
let pendingCommit = null;

export function render(elements, containerDom) {
  updateQueue.push({
    from: FiberTags.HOST_ROOT,
    dom: containerDom,
    newProps: { children: elements }
  });
  window.requestIdleCallback(performWork);
}

export function scheduleUpdate(instance, partialState) {
  updateQueue.push({
    from: FiberTags.CLASS_COMPONENT,
    instance: instance,
    partialState: partialState
  });
  window.requestIdleCallback(performWork);
}

const ENOUGH_TIME = 1; // milliseconds

function performWork(deadline) {
  workLoop(deadline);
  if (nextUnitOfWork || updateQueue.length > 0) {
    window.requestIdleCallback(performWork);
  }
}

function workLoop(deadline) {
  if (!nextUnitOfWork) {
    resetNextUnitOfWork();
  }
  while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (pendingCommit) {
    commitAllWork(pendingCommit);
  }
}

function resetNextUnitOfWork() {
  const update = updateQueue.shift();
  if (!update) {
    return;
  }

  // Copy the setState parameter from the update payload to the corresponding fiber
  if (update.partialState) {
    update.instance.__fiber.partialState = update.partialState;
  }

  const root =
    update.from == FiberTags.HOST_ROOT
      ? (update.dom as any)._rootContainerFiber
      : getRoot(update.instance.__fiber);

  if (root) delete root.alternate;
  nextUnitOfWork = {
    tag: FiberTags.HOST_ROOT,
    stateNode: update.dom || root.stateNode,
    props: update.newProps || root.props,
    alternate: root
  };
}

function getRoot(fiber: Fiber) {
  let node = fiber;
  while (node.parent) {
    node = node.parent;
  }
  return node;
}

function performUnitOfWork(wipFiber: Fiber) {
  // if (wipFiber && wipFiber.tag == FiberTags.HOST_ROOT)
  //   console.log("performUnitOfWork", wipFiber);
  beginWork(wipFiber);
  if (wipFiber.child) {
    return wipFiber.child;
  }

  // No child, we call completeWork until we find a sibling
  let uow = wipFiber;
  while (uow) {
    completeWork(uow);
    if (uow.sibling) {
      // Sibling needs to beginWork
      return uow.sibling;
    }
    uow = uow.parent;
  }
}

function beginWork(wipFiber: Fiber) {
  if (wipFiber.tag == FiberTags.CLASS_COMPONENT) {
    updateClassComponent(wipFiber);
  } else if (wipFiber.tag == FiberTags.FUNCTION_COMPONENT) {
    updateFunctionComponent(wipFiber);
  } else {
    updateHostComponent(wipFiber);
  }
}

function updateHostComponent(wipFiber: Fiber) {
  if (!wipFiber.stateNode) {
    wipFiber.stateNode = createDomElement(wipFiber);
  }
  const newChildElements = wipFiber.props.children;
  reconcileChildrenArray(wipFiber, newChildElements);
}

function updateClassComponent(wipFiber: Fiber) {
  let instance = wipFiber.stateNode as Component;
  if (instance == null) {
    // Call class constructor
    instance = wipFiber.stateNode = createInstance(wipFiber);
  } else if (wipFiber.props == instance.props && !wipFiber.partialState) {
    // No need to render, clone children from last time
    cloneChildFibers(wipFiber);
    return;
  }

  instance.props = wipFiber.props;
  instance.state = (<any>Object).assign(
    {},
    instance.state,
    wipFiber.partialState
  );
  wipFiber.partialState = null;

  const newChildElements = (wipFiber.stateNode as Component).render();
  reconcileChildrenArray(wipFiber, newChildElements);
}

function updateFunctionComponent(wipFiber: Fiber) {
  let instance = wipFiber.stateNode as any;
  if (instance == null) {
    instance = wipFiber.type as any;
    wipFiber.stateNode = wipFiber.type as Function;
  } else if (wipFiber.props == instance.props) {
    // No need to render, clone children from last time
    cloneChildFibers(wipFiber);
    return;
  }

  instance.props = wipFiber.props;

  const newChildElements = (wipFiber.stateNode as Function)(instance.props);
  reconcileChildrenArray(wipFiber, newChildElements);
}

function arrify(val) {
  return val == null ? [] : Array.isArray(val) ? val : [val];
}

function reconcileChildrenArray(wipFiber: Fiber, newChildElements) {
  const elements = arrify(newChildElements);

  let index = 0;
  let oldFiber = wipFiber.alternate ? wipFiber.alternate.child : null;
  let newFiber = null;
  while (index < elements.length || oldFiber != null) {
    const prevFiber = newFiber;
    const element = index < elements.length && elements[index];
    const sameType = oldFiber && element && element.type == oldFiber.type;

    if (sameType) {
      delete oldFiber.alternate;
      newFiber = {
        type: oldFiber.type,
        tag: oldFiber.tag,
        stateNode: oldFiber.stateNode,
        props: element.props,
        parent: wipFiber,
        alternate: oldFiber,
        partialState: oldFiber.partialState,
        effectTag: EffectTags.UPDATE
      };
    }

    if (element && !sameType) {
      newFiber = {
        type: element.type,
        tag:
          typeof element.type === "string"
            ? FiberTags.HOST_COMPONENT
            : element.type.prototype instanceof Component
            ? FiberTags.CLASS_COMPONENT
            : FiberTags.FUNCTION_COMPONENT,
        props: element.props,
        parent: wipFiber,
        effectTag: EffectTags.PLACEMENT
      };
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = EffectTags.DELETION;
      wipFiber.effects = wipFiber.effects || [];
      wipFiber.effects.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index == 0) {
      wipFiber.child = newFiber;
    } else if (prevFiber && element) {
      prevFiber.sibling = newFiber;
    }

    index++;
  }
}

function cloneChildFibers(parentFiber: Fiber) {
  const oldFiber = parentFiber.alternate;
  if (!oldFiber.child) {
    return;
  }

  let oldChild = oldFiber.child;
  let prevChild = null;
  while (oldChild) {
    delete oldChild.alternate;
    const newChild: Fiber = {
      type: oldChild.type,
      tag: oldChild.tag,
      stateNode: oldChild.stateNode,
      props: oldChild.props,
      partialState: oldChild.partialState,
      alternate: oldChild,
      parent: parentFiber
    };
    if (prevChild) {
      prevChild.sibling = newChild;
    } else {
      parentFiber.child = newChild;
    }
    prevChild = newChild;
    oldChild = oldChild.sibling;
  }
}

function completeWork(fiber: Fiber) {
  if (fiber.tag == FiberTags.CLASS_COMPONENT) {
    (fiber.stateNode as any).__fiber = fiber;
  }

  if (fiber.parent) {
    const childEffects = fiber.effects || [];
    const thisEffect = fiber.effectTag != null ? [fiber] : [];
    const parentEffects = fiber.parent.effects || [];
    fiber.parent.effects = parentEffects.concat(childEffects, thisEffect);
  } else {
    pendingCommit = fiber;
  }
}

function commitAllWork(fiber) {
  while (fiber.effects.length > 0) {
    const f = fiber.effects.shift();
    commitWork(f);
  }
  fiber.stateNode._rootContainerFiber = fiber;
  nextUnitOfWork = null;
  pendingCommit = null;
}

function commitWork(fiber: Fiber) {
  if (fiber.tag == FiberTags.HOST_ROOT) {
    return;
  }

  let domParentFiber = fiber.parent;
  while (
    domParentFiber.tag === FiberTags.CLASS_COMPONENT ||
    domParentFiber.tag === FiberTags.FUNCTION_COMPONENT
  ) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.stateNode;

  if (
    fiber.effectTag == EffectTags.PLACEMENT &&
    fiber.tag == FiberTags.HOST_COMPONENT
  ) {
    (domParent as HTMLElement).appendChild(fiber.stateNode as HTMLElement);
  } else if (fiber.effectTag == EffectTags.UPDATE) {
    updateDomProperties(fiber.stateNode, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag == EffectTags.DELETION) {
    commitDeletion(fiber, domParent);
  }
}

function commitDeletion(fiber: Fiber, domParent) {
  let node = fiber;
  while (true) {
    if (
      node.tag == FiberTags.CLASS_COMPONENT ||
      node.tag == FiberTags.FUNCTION_COMPONENT
    ) {
      node = node.child;
      continue;
    }
    domParent.removeChild(node.stateNode);
    while (node != fiber && !node.sibling) {
      node = node.parent;
    }
    if (node == fiber) {
      return;
    }
    node = node.sibling;
  }
}
