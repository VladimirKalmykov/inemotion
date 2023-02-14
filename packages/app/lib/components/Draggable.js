"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Collider = _interopRequireDefault(require("./Collider"));
var _Input = _interopRequireDefault(require("../plugins/Input"));
var _core = require("@inemotion/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Draggable extends _core.Component {
  constructor(go) {
    super(go);
    _defineProperty(this, "_inputPlugin", void 0);
    _defineProperty(this, "_collider", void 0);
  }
  onStart() {
    this._inputPlugin = this.gameObject.scene.app.findPlugin(_Input.default);
    if (!this._inputPlugin) {
      throw new Error("To use Draggable component the plugin Input should be added to the application");
    }
    this._collider = this.gameObject.findComponent(_Collider.default);
    if (!this._collider) {
      throw new Error("To use Draggable component you need to add Collider component to the GameObject");
    }
  }
  onUpdate() {
    if (this._inputPlugin.getMouseButtonDown(0)) {
      const mousePos = this._inputPlugin.getMousePosition();
      const ray = this.gameObject.scene.app.activeCamera.viewportPointToRay2D(mousePos);
      if (this._collider.raycast(ray)) {}
    }
  }
}
exports.default = Draggable;
//# sourceMappingURL=Draggable.js.map