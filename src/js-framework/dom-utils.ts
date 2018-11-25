const TEXT_ELEMENT = "TEXT ELEMENT";

const isEvent = name => name.startsWith("on");
const isAttribute = name =>
  !isEvent(name) && name != "children" && name != "style";
const isNew = (prev, next) => key => prev[key] !== next[key];
const isGone = (prev, next) => key => !(key in next);

export function updateDomProperties(dom, prevProps, nextProps) {
  // Remove event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key =>
        isGone(prevProps, nextProps)(key) || isNew(prevProps, nextProps)(key)
    )
    .forEach(name => {
      let eventType = name.toLowerCase().substring(2);
      if (eventType == "doubleclick") eventType = "dblclick";
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // Remove attributes
  Object.keys(prevProps)
    .filter(isAttribute)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      const attrName = name === "class" ? "className" : name;
      dom[attrName] = null;
    });

  // Set attributes
  Object.keys(nextProps)
    .filter(isAttribute)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const attrName = name === "class" ? "className" : name;
      dom[attrName] = nextProps[name];
    });

  // Set style
  prevProps.style = prevProps.style || {};
  nextProps.style = nextProps.style || {};
  Object.keys(nextProps.style)
    .filter(isNew(prevProps.style, nextProps.style))
    .forEach(key => {
      dom.style[key] = nextProps.style[key];
    });
  Object.keys(prevProps.style)
    .filter(isGone(prevProps.style, nextProps.style))
    .forEach(key => {
      dom.style[key] = "";
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      let eventType = name.toLowerCase().substring(2);
      if (eventType == "doubleclick") eventType = "dblclick";
      dom.addEventListener(eventType, nextProps[name]);
    });
}

export function createDomElement(fiber) {
  const isTextElement = fiber.type === TEXT_ELEMENT;
  const dom = isTextElement
    ? document.createTextNode("")
    : document.createElement(fiber.type);
  updateDomProperties(dom, [], fiber.props);
  return dom;
}

export function createElement(type, config, ...args) {
  const props = (<any>Object).assign({}, config);
  const hasChildren = args.length > 0;
  const rawChildren = hasChildren ? [].concat(...args) : [];
  props.children = rawChildren
    .filter(c => c != null && c !== false)
    .map(c => (c instanceof Object ? c : createTextElement(c)));
  return { type, props };
}

function createTextElement(value) {
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}
