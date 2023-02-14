"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@inemotion/core");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const DEFAULT_RENDERER = () => {};
class CanvasRenderer extends _core.Component {
  constructor(gameObject, config) {
    super(gameObject);
    _defineProperty(this, "renderer", void 0);
    this.renderer = config.renderer || DEFAULT_RENDERER;
  }
  update() {
    this.renderer(this.gameObject.scene.app.renderer.context);
  }
}
exports.default = CanvasRenderer;
//# sourceMappingURL=CanvasRenderer.js.map