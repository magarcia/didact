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

/***/ "./examples/components/App.tsx":
/*!*************************************!*\
  !*** ./examples/components/App.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    }\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar js_framework_1 = __webpack_require__(/*! ../../src/js-framework */ \"./src/js-framework/index.ts\");\nvar Header_1 = __webpack_require__(/*! ./Header */ \"./examples/components/Header.tsx\");\nvar TodoItem_1 = __webpack_require__(/*! ./TodoItem */ \"./examples/components/TodoItem.tsx\");\nvar Footer_1 = __webpack_require__(/*! ./Footer */ \"./examples/components/Footer.tsx\");\nvar constants_1 = __webpack_require__(/*! ./constants */ \"./examples/components/constants.ts\");\nvar Todo_1 = __webpack_require__(/*! ../models/Todo */ \"./examples/models/Todo.ts\");\nvar constants_2 = __webpack_require__(/*! ./constants */ \"./examples/components/constants.ts\");\nvar App = (function (_super) {\n    __extends(App, _super);\n    function App(props) {\n        var _this = _super.call(this, props) || this;\n        _this.state = {\n            todos: [new Todo_1.Todo(\"Buy milk\"), new Todo_1.Todo(\"Buy coffee\", true)],\n            filter: constants_1.Filters.ALL_TODOS,\n            editing: null\n        };\n        return _this;\n    }\n    App.filterTodos = function (todos, filter) {\n        if (filter == constants_1.Filters.ACTIVE_TODOS) {\n            return todos.filter(function (todo) { return !todo.completed; });\n        }\n        if (filter == constants_1.Filters.COMPLETED_TODOS) {\n            return todos.filter(function (todo) { return todo.completed; });\n        }\n        return todos;\n    };\n    App.countCompletedTodos = function (todos) {\n        return todos.filter(function (todo) { return todo.completed; }).length;\n    };\n    App.countActiveTodos = function (todos) {\n        return todos.filter(function (todo) { return !todo.completed; }).length;\n    };\n    App.prototype.toggleAll = function (event) {\n        var target = event.target;\n        var checked = target.checked;\n        this.setState({\n            todos: this.state.todos.map(function (todo) {\n                todo.completed = checked;\n                return todo;\n            })\n        });\n    };\n    App.prototype.toggleTodo = function (todo) {\n        todo.toggle();\n        this.setState({});\n    };\n    App.prototype.removeTodo = function (todo) {\n        this.setState({\n            todos: this.state.todos.filter(function (t) { return t != todo; })\n        });\n    };\n    App.prototype.setFilter = function (filter) {\n        this.setState({ filter: filter });\n    };\n    App.prototype.clearCompleted = function () {\n        this.setState({\n            todos: this.state.todos.filter(function (todo) { return !todo.completed; })\n        });\n    };\n    App.prototype.onKeyDown = function (event) {\n        var target = event.target;\n        if (event.keyCode == constants_2.ENTER_KEY) {\n            event.preventDefault();\n            this.setState({\n                todos: this.state.todos.concat([new Todo_1.Todo(target.value.trim())])\n            });\n            target.value = \"\";\n        }\n    };\n    App.prototype.edit = function (todo) {\n        this.setState({ editing: todo });\n    };\n    App.prototype.save = function (todo, text) {\n        todo.title = text;\n        this.setState({ editing: null });\n    };\n    App.prototype.cancel = function () {\n        this.setState({ editing: null });\n    };\n    App.prototype.render = function () {\n        var _this = this;\n        var _a = this.state, todos = _a.todos, filter = _a.filter;\n        var filteredTodos = App.filterTodos(todos, filter);\n        var completedTodosCount = App.countCompletedTodos(todos);\n        var activeTodoCount = App.countActiveTodos(todos);\n        return (js_framework_1.default.createElement(\"div\", null,\n            js_framework_1.default.createElement(Header_1.Header, { onKeyDown: this.onKeyDown.bind(this) }),\n            js_framework_1.default.createElement(\"section\", { class: \"main\" },\n                js_framework_1.default.createElement(\"input\", { id: \"toggle-all\", class: \"toggle-all\", type: \"checkbox\", onChange: this.toggleAll.bind(this), checked: activeTodoCount === 0 }),\n                js_framework_1.default.createElement(\"label\", { htmlFor: \"toggle-all\" }, \"Mark all as complete\"),\n                js_framework_1.default.createElement(\"ul\", { class: \"todo-list\" }, filteredTodos.map(function (todo) {\n                    return (js_framework_1.default.createElement(TodoItem_1.TodoItem, { todo: todo, editing: _this.state.editing == todo, onToggle: _this.toggleTodo.bind(_this, todo), onDestroy: _this.removeTodo.bind(_this, todo), onEdit: _this.edit.bind(_this, todo), onSave: _this.save.bind(_this, todo), onCancel: _this.cancel.bind(_this) }));\n                }))),\n            js_framework_1.default.createElement(Footer_1.Footer, { count: filteredTodos.length, completedCount: completedTodosCount, nowShowing: filter, onFilterSelected: this.setFilter.bind(this), onClearCompleted: this.clearCompleted.bind(this) })));\n    };\n    return App;\n}(js_framework_1.Component));\nexports.App = App;\n\n\n//# sourceURL=webpack:///./examples/components/App.tsx?");

/***/ }),

/***/ "./examples/components/Footer.tsx":
/*!****************************************!*\
  !*** ./examples/components/Footer.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar js_framework_1 = __webpack_require__(/*! ../../src/js-framework */ \"./src/js-framework/index.ts\");\nvar constants_1 = __webpack_require__(/*! ./constants */ \"./examples/components/constants.ts\");\nfunction Footer(props) {\n    var activeTodoWord = props.count == 1 ? \"item\" : \"items\";\n    return (js_framework_1.default.createElement(\"footer\", { class: \"footer\" },\n        js_framework_1.default.createElement(\"span\", { class: \"todo-count\" },\n            js_framework_1.default.createElement(\"strong\", null, props.count),\n            \" \",\n            activeTodoWord,\n            \" left\"),\n        js_framework_1.default.createElement(\"ul\", { class: \"filters\" },\n            js_framework_1.default.createElement(\"li\", null,\n                js_framework_1.default.createElement(\"a\", { onClick: function () { return props.onFilterSelected(constants_1.Filters.ALL_TODOS); }, class: props.nowShowing === constants_1.Filters.ALL_TODOS ? \"selected\" : \"\" }, \"All\")),\n            \" \",\n            js_framework_1.default.createElement(\"li\", null,\n                js_framework_1.default.createElement(\"a\", { onClick: function () { return props.onFilterSelected(constants_1.Filters.ACTIVE_TODOS); }, class: props.nowShowing === constants_1.Filters.ACTIVE_TODOS ? \"selected\" : \"\" }, \"Active\")),\n            \" \",\n            js_framework_1.default.createElement(\"li\", null,\n                js_framework_1.default.createElement(\"a\", { onClick: function () { return props.onFilterSelected(constants_1.Filters.COMPLETED_TODOS); }, class: props.nowShowing === constants_1.Filters.COMPLETED_TODOS ? \"selected\" : \"\" }, \"Completed\"))),\n        props.completedCount > 0 && (js_framework_1.default.createElement(\"button\", { className: \"clear-completed\", onClick: props.onClearCompleted }, \"Clear completed\"))));\n}\nexports.Footer = Footer;\n\n\n//# sourceURL=webpack:///./examples/components/Footer.tsx?");

/***/ }),

/***/ "./examples/components/Header.tsx":
/*!****************************************!*\
  !*** ./examples/components/Header.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar js_framework_1 = __webpack_require__(/*! ../../src/js-framework */ \"./src/js-framework/index.ts\");\nfunction Header(props) {\n    return (js_framework_1.default.createElement(\"header\", { class: \"header\" },\n        js_framework_1.default.createElement(\"h1\", null, \"todos\"),\n        js_framework_1.default.createElement(\"input\", { class: \"new-todo\", placeholder: \"What needs to be done?\", onKeyDown: props.onKeyDown, autoFocus: true })));\n}\nexports.Header = Header;\n\n\n//# sourceURL=webpack:///./examples/components/Header.tsx?");

/***/ }),

/***/ "./examples/components/TodoItem.tsx":
/*!******************************************!*\
  !*** ./examples/components/TodoItem.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar js_framework_1 = __webpack_require__(/*! ../../src/js-framework */ \"./src/js-framework/index.ts\");\nvar constants_1 = __webpack_require__(/*! ./constants */ \"./examples/components/constants.ts\");\nfunction TodoItem(props) {\n    var todo = props.todo;\n    var completedClass = todo.completed ? \"completed\" : \"\";\n    var editingClass = props.editing ? \"editing\" : \"\";\n    var editText = todo.title;\n    function handleKeyDown(event) {\n        if (event.keyCode === constants_1.ESCAPE_KEY) {\n            event.target.value = props.todo.title;\n            props.onCancel(event);\n        }\n        else if (event.keyCode === constants_1.ENTER_KEY) {\n            handleSubmit(event);\n        }\n    }\n    function handleSubmit(event) {\n        props.onSave(event.target.value.trim());\n    }\n    return (js_framework_1.default.createElement(\"li\", { class: [completedClass, editingClass].join(\" \") },\n        js_framework_1.default.createElement(\"div\", { class: \"view\" },\n            js_framework_1.default.createElement(\"input\", { class: \"toggle\", type: \"checkbox\", checked: todo.completed, onChange: props.onToggle }),\n            js_framework_1.default.createElement(\"label\", { onDoubleClick: props.onEdit }, todo.title),\n            js_framework_1.default.createElement(\"button\", { class: \"destroy\", onClick: props.onDestroy })),\n        js_framework_1.default.createElement(\"input\", { class: \"edit\", value: editText, onBlur: handleSubmit, onChange: handleSubmit, onKeyDown: handleKeyDown })));\n}\nexports.TodoItem = TodoItem;\n\n\n//# sourceURL=webpack:///./examples/components/TodoItem.tsx?");

/***/ }),

/***/ "./examples/components/constants.ts":
/*!******************************************!*\
  !*** ./examples/components/constants.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Filters;\n(function (Filters) {\n    Filters[\"ALL_TODOS\"] = \"ALL_TODOS\";\n    Filters[\"ACTIVE_TODOS\"] = \"ACTIVE_TODOS\";\n    Filters[\"COMPLETED_TODOS\"] = \"COMPLETED_TODOS\";\n})(Filters = exports.Filters || (exports.Filters = {}));\nexports.ENTER_KEY = 13;\nexports.ESCAPE_KEY = 27;\n\n\n//# sourceURL=webpack:///./examples/components/constants.ts?");

/***/ }),

/***/ "./examples/main.tsx":
/*!***************************!*\
  !*** ./examples/main.tsx ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar js_framework_1 = __webpack_require__(/*! ../src/js-framework */ \"./src/js-framework/index.ts\");\nvar App_1 = __webpack_require__(/*! ./components/App */ \"./examples/components/App.tsx\");\nvar rootDom = document.getElementsByClassName(\"todoapp\")[0];\nvar stories = [\n    { name: \"Didact introduction\", url: \"http://bit.ly/2pX7HNn\" },\n    { name: \"Rendering DOM elements \", url: \"http://bit.ly/2qCOejH\" },\n    { name: \"Element creation and JSX\", url: \"http://bit.ly/2qGbw8S\" },\n    { name: \"Instances and reconciliation\", url: \"http://bit.ly/2q4A746\" },\n    { name: \"Components and state\", url: \"http://bit.ly/2rE16nh\" }\n];\njs_framework_1.default.render(js_framework_1.default.createElement(App_1.App, { stories: stories }), rootDom);\n\n\n//# sourceURL=webpack:///./examples/main.tsx?");

/***/ }),

/***/ "./examples/models/Todo.ts":
/*!*********************************!*\
  !*** ./examples/models/Todo.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Todo = (function () {\n    function Todo(title, completed) {\n        if (completed === void 0) { completed = false; }\n        this.title = title;\n        this.completed = completed;\n    }\n    Todo.prototype.toggle = function () {\n        this.completed = !this.completed;\n    };\n    return Todo;\n}());\nexports.Todo = Todo;\n\n\n//# sourceURL=webpack:///./examples/models/Todo.ts?");

/***/ }),

/***/ "./src/js-framework/Component.ts":
/*!***************************************!*\
  !*** ./src/js-framework/Component.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar reconciler_1 = __webpack_require__(/*! ./reconciler */ \"./src/js-framework/reconciler.ts\");\nvar Component = (function () {\n    function Component(props) {\n        this.props = (props || {});\n        this.state = (this.state || {});\n    }\n    Component.prototype.setState = function (partialState) {\n        reconciler_1.scheduleUpdate(this, partialState);\n    };\n    Component.prototype.render = function () { };\n    return Component;\n}());\nexports.Component = Component;\nfunction createInstance(fiber) {\n    var instance = new fiber.type(fiber.props);\n    instance.__fiber = fiber;\n    return instance;\n}\nexports.createInstance = createInstance;\n\n\n//# sourceURL=webpack:///./src/js-framework/Component.ts?");

/***/ }),

/***/ "./src/js-framework/Fiber.ts":
/*!***********************************!*\
  !*** ./src/js-framework/Fiber.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar FiberTags;\n(function (FiberTags) {\n    FiberTags[FiberTags[\"HOST_COMPONENT\"] = 0] = \"HOST_COMPONENT\";\n    FiberTags[FiberTags[\"CLASS_COMPONENT\"] = 1] = \"CLASS_COMPONENT\";\n    FiberTags[FiberTags[\"FUNCTION_COMPONENT\"] = 2] = \"FUNCTION_COMPONENT\";\n    FiberTags[FiberTags[\"HOST_ROOT\"] = 3] = \"HOST_ROOT\";\n})(FiberTags = exports.FiberTags || (exports.FiberTags = {}));\nvar EffectTags;\n(function (EffectTags) {\n    EffectTags[EffectTags[\"PLACEMENT\"] = 0] = \"PLACEMENT\";\n    EffectTags[EffectTags[\"UPDATE\"] = 1] = \"UPDATE\";\n    EffectTags[EffectTags[\"DELETION\"] = 2] = \"DELETION\";\n})(EffectTags = exports.EffectTags || (exports.EffectTags = {}));\n\n\n//# sourceURL=webpack:///./src/js-framework/Fiber.ts?");

/***/ }),

/***/ "./src/js-framework/dom-utils.ts":
/*!***************************************!*\
  !*** ./src/js-framework/dom-utils.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar TEXT_ELEMENT = \"TEXT ELEMENT\";\nvar isEvent = function (name) { return name.startsWith(\"on\"); };\nvar isAttribute = function (name) {\n    return !isEvent(name) && name != \"children\" && name != \"style\";\n};\nvar isNew = function (prev, next) { return function (key) { return prev[key] !== next[key]; }; };\nvar isGone = function (prev, next) { return function (key) { return !(key in next); }; };\nfunction updateDomProperties(dom, prevProps, nextProps) {\n    Object.keys(prevProps)\n        .filter(isEvent)\n        .filter(function (key) {\n        return isGone(prevProps, nextProps)(key) || isNew(prevProps, nextProps)(key);\n    })\n        .forEach(function (name) {\n        var eventType = name.toLowerCase().substring(2);\n        if (eventType == \"doubleclick\")\n            eventType = \"dblclick\";\n        dom.removeEventListener(eventType, prevProps[name]);\n    });\n    Object.keys(prevProps)\n        .filter(isAttribute)\n        .filter(isGone(prevProps, nextProps))\n        .forEach(function (name) {\n        var attrName = name === \"class\" ? \"className\" : name;\n        dom[attrName] = null;\n    });\n    Object.keys(nextProps)\n        .filter(isAttribute)\n        .filter(isNew(prevProps, nextProps))\n        .forEach(function (name) {\n        var attrName = name === \"class\" ? \"className\" : name;\n        dom[attrName] = nextProps[name];\n    });\n    prevProps.style = prevProps.style || {};\n    nextProps.style = nextProps.style || {};\n    Object.keys(nextProps.style)\n        .filter(isNew(prevProps.style, nextProps.style))\n        .forEach(function (key) {\n        dom.style[key] = nextProps.style[key];\n    });\n    Object.keys(prevProps.style)\n        .filter(isGone(prevProps.style, nextProps.style))\n        .forEach(function (key) {\n        dom.style[key] = \"\";\n    });\n    Object.keys(nextProps)\n        .filter(isEvent)\n        .filter(isNew(prevProps, nextProps))\n        .forEach(function (name) {\n        var eventType = name.toLowerCase().substring(2);\n        if (eventType == \"doubleclick\")\n            eventType = \"dblclick\";\n        dom.addEventListener(eventType, nextProps[name]);\n    });\n}\nexports.updateDomProperties = updateDomProperties;\nfunction createDomElement(fiber) {\n    var isTextElement = fiber.type === TEXT_ELEMENT;\n    var dom = isTextElement\n        ? document.createTextNode(\"\")\n        : document.createElement(fiber.type);\n    updateDomProperties(dom, [], fiber.props);\n    return dom;\n}\nexports.createDomElement = createDomElement;\nfunction createElement(type, config) {\n    var args = [];\n    for (var _i = 2; _i < arguments.length; _i++) {\n        args[_i - 2] = arguments[_i];\n    }\n    var props = Object.assign({}, config);\n    var hasChildren = args.length > 0;\n    var rawChildren = hasChildren ? [].concat.apply([], args) : [];\n    props.children = rawChildren\n        .filter(function (c) { return c != null && c !== false; })\n        .map(function (c) { return (c instanceof Object ? c : createTextElement(c)); });\n    return { type: type, props: props };\n}\nexports.createElement = createElement;\nfunction createTextElement(value) {\n    return createElement(TEXT_ELEMENT, { nodeValue: value });\n}\n\n\n//# sourceURL=webpack:///./src/js-framework/dom-utils.ts?");

/***/ }),

/***/ "./src/js-framework/index.ts":
/*!***********************************!*\
  !*** ./src/js-framework/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar reconciler_1 = __webpack_require__(/*! ./reconciler */ \"./src/js-framework/reconciler.ts\");\nvar dom_utils_1 = __webpack_require__(/*! ./dom-utils */ \"./src/js-framework/dom-utils.ts\");\nvar Component_1 = __webpack_require__(/*! ./Component */ \"./src/js-framework/Component.ts\");\nexports.Component = Component_1.Component;\nexports.default = {\n    render: reconciler_1.render,\n    createElement: dom_utils_1.createElement,\n    renderToString: console.log\n};\n\n\n//# sourceURL=webpack:///./src/js-framework/index.ts?");

/***/ }),

/***/ "./src/js-framework/reconciler.ts":
/*!****************************************!*\
  !*** ./src/js-framework/reconciler.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Fiber_1 = __webpack_require__(/*! ./Fiber */ \"./src/js-framework/Fiber.ts\");\nvar dom_utils_1 = __webpack_require__(/*! ./dom-utils */ \"./src/js-framework/dom-utils.ts\");\nvar Component_1 = __webpack_require__(/*! ./Component */ \"./src/js-framework/Component.ts\");\nvar updateQueue = [];\nvar nextUnitOfWork = null;\nvar pendingCommit = null;\nfunction render(elements, containerDom) {\n    updateQueue.push({\n        from: Fiber_1.FiberTags.HOST_ROOT,\n        dom: containerDom,\n        newProps: { children: elements }\n    });\n    window.requestIdleCallback(performWork);\n}\nexports.render = render;\nfunction scheduleUpdate(instance, partialState) {\n    updateQueue.push({\n        from: Fiber_1.FiberTags.CLASS_COMPONENT,\n        instance: instance,\n        partialState: partialState\n    });\n    window.requestIdleCallback(performWork);\n}\nexports.scheduleUpdate = scheduleUpdate;\nvar ENOUGH_TIME = 1;\nfunction performWork(deadline) {\n    workLoop(deadline);\n    if (nextUnitOfWork || updateQueue.length > 0) {\n        window.requestIdleCallback(performWork);\n    }\n}\nfunction workLoop(deadline) {\n    if (!nextUnitOfWork) {\n        resetNextUnitOfWork();\n    }\n    while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {\n        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);\n    }\n    if (pendingCommit) {\n        commitAllWork(pendingCommit);\n    }\n}\nfunction resetNextUnitOfWork() {\n    var update = updateQueue.shift();\n    if (!update) {\n        return;\n    }\n    if (update.partialState) {\n        update.instance.__fiber.partialState = update.partialState;\n    }\n    var root = update.from == Fiber_1.FiberTags.HOST_ROOT\n        ? update.dom._rootContainerFiber\n        : getRoot(update.instance.__fiber);\n    if (root)\n        delete root.alternate;\n    nextUnitOfWork = {\n        tag: Fiber_1.FiberTags.HOST_ROOT,\n        stateNode: update.dom || root.stateNode,\n        props: update.newProps || root.props,\n        alternate: root\n    };\n}\nfunction getRoot(fiber) {\n    var node = fiber;\n    while (node.parent) {\n        node = node.parent;\n    }\n    return node;\n}\nfunction performUnitOfWork(wipFiber) {\n    beginWork(wipFiber);\n    if (wipFiber.child) {\n        return wipFiber.child;\n    }\n    var uow = wipFiber;\n    while (uow) {\n        completeWork(uow);\n        if (uow.sibling) {\n            return uow.sibling;\n        }\n        uow = uow.parent;\n    }\n}\nfunction beginWork(wipFiber) {\n    if (wipFiber.tag == Fiber_1.FiberTags.CLASS_COMPONENT) {\n        updateClassComponent(wipFiber);\n    }\n    else if (wipFiber.tag == Fiber_1.FiberTags.FUNCTION_COMPONENT) {\n        updateFunctionComponent(wipFiber);\n    }\n    else {\n        updateHostComponent(wipFiber);\n    }\n}\nfunction updateHostComponent(wipFiber) {\n    if (!wipFiber.stateNode) {\n        wipFiber.stateNode = dom_utils_1.createDomElement(wipFiber);\n    }\n    var newChildElements = wipFiber.props.children;\n    reconcileChildrenArray(wipFiber, newChildElements);\n}\nfunction updateClassComponent(wipFiber) {\n    var instance = wipFiber.stateNode;\n    if (instance == null) {\n        instance = wipFiber.stateNode = Component_1.createInstance(wipFiber);\n    }\n    else if (wipFiber.props == instance.props && !wipFiber.partialState) {\n        cloneChildFibers(wipFiber);\n        return;\n    }\n    instance.props = wipFiber.props;\n    instance.state = Object.assign({}, instance.state, wipFiber.partialState);\n    wipFiber.partialState = null;\n    var newChildElements = wipFiber.stateNode.render();\n    reconcileChildrenArray(wipFiber, newChildElements);\n}\nfunction updateFunctionComponent(wipFiber) {\n    var instance = wipFiber.stateNode;\n    if (instance == null) {\n        instance = wipFiber.type;\n        wipFiber.stateNode = wipFiber.type;\n    }\n    else if (wipFiber.props == instance.props) {\n        cloneChildFibers(wipFiber);\n        return;\n    }\n    instance.props = wipFiber.props;\n    var newChildElements = wipFiber.stateNode(instance.props);\n    reconcileChildrenArray(wipFiber, newChildElements);\n}\nfunction arrify(val) {\n    return val == null ? [] : Array.isArray(val) ? val : [val];\n}\nfunction reconcileChildrenArray(wipFiber, newChildElements) {\n    var elements = arrify(newChildElements);\n    var index = 0;\n    var oldFiber = wipFiber.alternate ? wipFiber.alternate.child : null;\n    var newFiber = null;\n    while (index < elements.length || oldFiber != null) {\n        var prevFiber = newFiber;\n        var element = index < elements.length && elements[index];\n        var sameType = oldFiber && element && element.type == oldFiber.type;\n        if (sameType) {\n            newFiber = {\n                type: oldFiber.type,\n                tag: oldFiber.tag,\n                stateNode: oldFiber.stateNode,\n                props: element.props,\n                parent: wipFiber,\n                alternate: oldFiber,\n                partialState: oldFiber.partialState,\n                effectTag: Fiber_1.EffectTags.UPDATE\n            };\n        }\n        if (element && !sameType) {\n            newFiber = {\n                type: element.type,\n                tag: typeof element.type === \"string\"\n                    ? Fiber_1.FiberTags.HOST_COMPONENT\n                    : element.type.prototype instanceof Component_1.Component\n                        ? Fiber_1.FiberTags.CLASS_COMPONENT\n                        : Fiber_1.FiberTags.FUNCTION_COMPONENT,\n                props: element.props,\n                parent: wipFiber,\n                effectTag: Fiber_1.EffectTags.PLACEMENT\n            };\n        }\n        if (oldFiber && !sameType) {\n            oldFiber.effectTag = Fiber_1.EffectTags.DELETION;\n            wipFiber.effects = wipFiber.effects || [];\n            wipFiber.effects.push(oldFiber);\n        }\n        if (oldFiber) {\n            oldFiber = oldFiber.sibling;\n        }\n        if (index == 0) {\n            wipFiber.child = newFiber;\n        }\n        else if (prevFiber && element) {\n            prevFiber.sibling = newFiber;\n        }\n        index++;\n    }\n}\nfunction cloneChildFibers(parentFiber) {\n    var oldFiber = parentFiber.alternate;\n    if (!oldFiber.child) {\n        return;\n    }\n    var oldChild = oldFiber.child;\n    var prevChild = null;\n    while (oldChild) {\n        var newChild = {\n            type: oldChild.type,\n            tag: oldChild.tag,\n            stateNode: oldChild.stateNode,\n            props: oldChild.props,\n            partialState: oldChild.partialState,\n            alternate: oldChild,\n            parent: parentFiber\n        };\n        if (prevChild) {\n            prevChild.sibling = newChild;\n        }\n        else {\n            parentFiber.child = newChild;\n        }\n        prevChild = newChild;\n        oldChild = oldChild.sibling;\n    }\n}\nfunction completeWork(fiber) {\n    if (fiber.tag == Fiber_1.FiberTags.CLASS_COMPONENT) {\n        fiber.stateNode.__fiber = fiber;\n    }\n    if (fiber.parent) {\n        var childEffects = fiber.effects || [];\n        var thisEffect = fiber.effectTag != null ? [fiber] : [];\n        var parentEffects = fiber.parent.effects || [];\n        fiber.parent.effects = parentEffects.concat(childEffects, thisEffect);\n    }\n    else {\n        pendingCommit = fiber;\n    }\n}\nfunction commitAllWork(fiber) {\n    while (fiber.effects.length > 0) {\n        var f = fiber.effects.shift();\n        commitWork(f);\n    }\n    fiber.stateNode._rootContainerFiber = fiber;\n    nextUnitOfWork = null;\n    pendingCommit = null;\n}\nfunction commitWork(fiber) {\n    if (fiber.tag == Fiber_1.FiberTags.HOST_ROOT) {\n        return;\n    }\n    var domParentFiber = fiber.parent;\n    while (domParentFiber.tag === Fiber_1.FiberTags.CLASS_COMPONENT ||\n        domParentFiber.tag === Fiber_1.FiberTags.FUNCTION_COMPONENT) {\n        domParentFiber = domParentFiber.parent;\n    }\n    var domParent = domParentFiber.stateNode;\n    if (fiber.effectTag == Fiber_1.EffectTags.PLACEMENT &&\n        fiber.tag == Fiber_1.FiberTags.HOST_COMPONENT) {\n        domParent.appendChild(fiber.stateNode);\n    }\n    else if (fiber.effectTag == Fiber_1.EffectTags.UPDATE &&\n        fiber.tag == Fiber_1.FiberTags.HOST_COMPONENT) {\n        dom_utils_1.updateDomProperties(fiber.stateNode, fiber.alternate.props, fiber.props);\n    }\n    else if (fiber.effectTag == Fiber_1.EffectTags.DELETION) {\n        commitDeletion(fiber, domParent);\n    }\n}\nfunction commitDeletion(fiber, domParent) {\n    var node = fiber;\n    while (true) {\n        if (node.tag == Fiber_1.FiberTags.CLASS_COMPONENT ||\n            node.tag == Fiber_1.FiberTags.FUNCTION_COMPONENT) {\n            node = node.child;\n            continue;\n        }\n        domParent.removeChild(node.stateNode);\n        while (node != fiber && !node.sibling) {\n            node = node.parent;\n        }\n        if (node == fiber) {\n            return;\n        }\n        node = node.sibling;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/js-framework/reconciler.ts?");

/***/ })

/******/ });