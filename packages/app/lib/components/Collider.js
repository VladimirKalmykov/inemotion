"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@inemotion/core");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Collider extends _core.Component {
  constructor(gameObject) {
    super(gameObject);
    _defineProperty(this, "transform", void 0);
    this.transform = new _core.Transform2D(this);
  }
  getBoundingRect() {
    return [_core.Vector2.zero, _core.Vector2.zero];
  }
  raycast() {}
}
exports.default = Collider;
//# sourceMappingURL=Collider.js.map