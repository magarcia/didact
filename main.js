/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./examples/main.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/main.tsx":
/*!***************************!*\
  !*** ./examples/main.tsx ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst core_1 = __webpack_require__(/*! ../src/core */ \"./src/core.ts\");\nconst rootDom = document.getElementById(\"root\");\nconst stories = [\n    { name: \"Didact introduction\", url: \"http://bit.ly/2pX7HNn\" },\n    { name: \"Rendering DOM elements \", url: \"http://bit.ly/2qCOejH\" },\n    { name: \"Element creation and JSX\", url: \"http://bit.ly/2qGbw8S\" },\n    { name: \"Instances and reconciliation\", url: \"http://bit.ly/2q4A746\" },\n    { name: \"Components and state\", url: \"http://bit.ly/2rE16nh\" }\n];\nclass App extends core_1.default.Component {\n    render() {\n        return (core_1.default.createElement(\"div\", null,\n            core_1.default.createElement(\"h1\", { class: \"title\" }, \"Stories\"),\n            core_1.default.createElement(\"div\", null, this.props.stories.map(story => {\n                return core_1.default.createElement(Story, { name: story.name, url: story.url });\n            }))));\n    }\n}\nfunction LikeButton(props) {\n    return (core_1.default.createElement(\"div\", { class: \"tags is-normal has-addons\", style: \"cursor: pointer;\", onClick: e => props.like(e) },\n        core_1.default.createElement(\"span\", { class: \"tag\", style: \"width: 35px\" }, props.likes),\n        core_1.default.createElement(\"span\", { class: \"tag is-danger\" },\n            core_1.default.createElement(\"i\", { class: \"fas fa-heart\" }))));\n}\nclass Story extends core_1.default.Component {\n    constructor(props) {\n        super(props);\n        this.state = { likes: Math.ceil(Math.random() * 100) };\n    }\n    like(e) {\n        this.setState({\n            likes: this.state.likes + 1\n        });\n    }\n    render() {\n        const { name, url } = this.props;\n        const { likes } = this.state;\n        return (core_1.default.createElement(\"div\", { style: \"margin: 8px 0;\" },\n            core_1.default.createElement(\"div\", { style: \"width: 75px\", class: \"is-inline-block\" },\n                core_1.default.createElement(LikeButton, { likes: likes, like: this.like.bind(this) })),\n            core_1.default.createElement(\"a\", { href: url }, name)));\n    }\n}\ncore_1.default.render(core_1.default.createElement(App, { stories: stories }), rootDom);\n\n\n//# sourceURL=webpack:///./examples/main.tsx?");

/***/ }),

/***/ "./src/core.ts":
/*!*********************!*\
  !*** ./src/core.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction updateInstance(internalInstance) {\n    const parentDom = internalInstance.dom.parentNode;\n    const element = internalInstance.element;\n    reconcile(parentDom, internalInstance, element);\n}\nclass Component {\n    constructor(props) {\n        this.props = props;\n        this.state = {};\n    }\n    setState(partialState) {\n        this.state = Object.assign({}, this.state, partialState);\n        updateInstance(this.__internalInstance);\n    }\n    render() { }\n}\nconst TEXT_ELEMENT = \"TEXT ELEMENT\";\nlet rootInstance = null;\nfunction isTextElement(type) {\n    return type === TEXT_ELEMENT;\n}\nfunction isAttribute(name) {\n    return !isListener(name) && name != \"children\";\n}\nfunction isListener(name) {\n    return name.indexOf(\"on\") === 0;\n}\nfunction isDomElement(t) {\n    return typeof t === \"string\";\n}\nfunction render(element, container) {\n    const prevInstance = rootInstance;\n    const nextInstance = reconcile(container, prevInstance, element);\n    rootInstance = nextInstance;\n}\nfunction reconcile(parentDom, instance, element) {\n    if (instance == null) {\n        const newInstance = instantiate(element);\n        parentDom.appendChild(newInstance.dom);\n        return newInstance;\n    }\n    else if (element == null) {\n        parentDom.removeChild(instance.dom);\n        return null;\n    }\n    else if (instance.element.type !== element.type) {\n        const newInstance = instantiate(element);\n        parentDom.replaceChild(newInstance.dom, instance.dom);\n        return newInstance;\n    }\n    else if (typeof element.type === \"string\") {\n        updateDomProperties(instance.dom, instance.element.props, element.props);\n        instance.element = element;\n        instance.childInstances = reconcileChildren(instance, element);\n        return instance;\n    }\n    else if (instance.publicInstance instanceof Component) {\n        instance.publicInstance.props = element.props;\n        const childElement = (instance.publicInstance.render());\n        const oldChildInstance = instance.childInstance;\n        const childInstance = reconcile(parentDom, oldChildInstance, childElement);\n        instance.dom = childInstance.dom;\n        instance.childInstance = childInstance;\n        instance.element = element;\n        return instance;\n    }\n    else {\n        const childElement = (instance.publicInstance(element.props));\n        const oldChildInstance = instance.childInstance;\n        const childInstance = reconcile(parentDom, oldChildInstance, childElement);\n        instance.dom = childInstance.dom;\n        instance.childInstance = childInstance;\n        instance.element = element;\n        return instance;\n    }\n}\nfunction reconcileChildren(instance, element) {\n    const dom = instance.dom;\n    const childInstances = instance.childInstances;\n    const nextChildElements = element.props.children || [];\n    const newChildInstances = [];\n    const count = Math.max(childInstances.length, nextChildElements.length);\n    for (let i = 0; i < count; i++) {\n        const childInstance = childInstances[i];\n        const childElement = nextChildElements[i];\n        const newChildInstance = reconcile(dom, childInstance, childElement);\n        if (newChildInstance != null)\n            newChildInstances.push(newChildInstance);\n    }\n    return newChildInstances;\n}\nfunction instantiate(element) {\n    const { type, props } = element;\n    if (isDomElement(type)) {\n        const dom = isTextElement(type)\n            ? document.createTextNode(props.nodeValue || \"\")\n            : document.createElement(type);\n        updateDomProperties(dom, [], props);\n        const childElements = props.children || [];\n        const childInstances = childElements.map(instantiate);\n        childInstances\n            .map(childInstance => childInstance.dom)\n            .forEach(childDom => dom.appendChild(childDom));\n        const instance = { dom, element, childInstances };\n        return instance;\n    }\n    else if (type.prototype instanceof Component) {\n        const instance = {};\n        const publicInstance = createPublicInstance(element, instance);\n        const childElement = publicInstance.render();\n        const childInstance = instantiate(childElement);\n        const dom = childInstance.dom;\n        return Object.assign(instance, {\n            dom,\n            element,\n            childInstance,\n            publicInstance\n        });\n    }\n    else {\n        const instance = {};\n        const publicInstance = type;\n        const childElement = publicInstance(element.props);\n        const childInstance = instantiate(childElement);\n        const dom = childInstance.dom;\n        return Object.assign(instance, {\n            dom,\n            element,\n            childInstance,\n            publicInstance\n        });\n    }\n}\nfunction createElement(type, config, ...args) {\n    const props = Object.assign({}, config);\n    const hasChildren = args.length > 0;\n    const rawChildren = hasChildren ? [].concat(...args) : [];\n    props.children = rawChildren\n        .filter(c => c != null && c !== false)\n        .map((c) => c instanceof Object ? c : createTextElement(c));\n    return { type, props };\n}\nfunction updateDomProperties(dom, prevProps, nextProps) {\n    Object.keys(prevProps)\n        .filter(isListener)\n        .forEach(name => {\n        const eventType = name.toLowerCase().substring(2);\n        dom.removeEventListener(eventType, prevProps[name]);\n    });\n    Object.keys(prevProps)\n        .filter(isAttribute)\n        .forEach(name => {\n        dom[name] = null;\n    });\n    Object.keys(nextProps)\n        .filter(isListener)\n        .forEach((name) => {\n        const eventType = name.toLowerCase().substring(2);\n        dom.addEventListener(eventType, nextProps[name]);\n    });\n    Object.keys(nextProps)\n        .filter(isAttribute)\n        .forEach(name => {\n        const attrName = name === \"class\" ? \"className\" : name;\n        dom[attrName] = nextProps[name];\n    });\n}\nfunction createTextElement(value) {\n    return createElement(TEXT_ELEMENT, { nodeValue: value });\n}\nfunction createPublicInstance(element, internalInstance) {\n    const { type: instanceType, props } = element;\n    const publicInstance = new instanceType(props);\n    publicInstance.__internalInstance = internalInstance;\n    return publicInstance;\n}\nexports.default = {\n    render,\n    createElement,\n    Component\n};\n\n\n//# sourceURL=webpack:///./src/core.ts?");

/***/ })

/******/ });