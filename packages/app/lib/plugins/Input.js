"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@inemotion/core");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Input extends _core.Plugin {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "state", {
      mouse: {
        buttons: {},
        position: _core.Vector2.zero
      }
    });
    _defineProperty(this, "mouseDownHandler", e => {
      this.state.mouse.buttons[e.button] = {
        pressed: true,
        nativeEvent: e
      };
    });
    _defineProperty(this, "mouseUpHandler", e => {
      this.state.mouse.buttons[e.button] = {
        pressed: false,
        nativeEvent: e
      };
    });
    _defineProperty(this, "mouseMoveHandler", e => {
      this.state.mouse.position = new _core.Vector2(e.clientX, e.clientY);
    });
  }
  onStart() {
    this.app.renderer.element.addEventListener("mousedown", this.mouseDownHandler);
    this.app.renderer.element.addEventListener("mouseup", this.mouseUpHandler);
    this.app.renderer.element.addEventListener("mousemove", this.mouseMoveHandler);
  }
  onDestroy() {
    this.app.renderer.element.removeEventListener("mousedown", this.mouseDownHandler);
    this.app.renderer.element.removeEventListener("mouseup", this.mouseUpHandler);
  }
  getMouseButtonDown(button) {
    return this.state.mouse.buttons[button] && this.state.mouse.buttons[button].pressed;
  }
  geMouseButtonEvent(button) {
    return this.state.mouse.buttons[button] && this.state.mouse.buttons[button].nativeEvent;
  }
  getMousePosition() {
    return this.state.mouse.position;
  }
}
exports.default = Input;
//# sourceMappingURL=Input.js.map