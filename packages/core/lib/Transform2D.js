"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Vector = _interopRequireDefault(require("./Vector2"));
var _Vector2 = _interopRequireDefault(require("./Vector3"));
var _Serializable = _interopRequireDefault(require("./Serializable"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Transform2D extends _Serializable.default {
  constructor(parent) {
    super();
    _defineProperty(this, "parent", void 0);
    _defineProperty(this, "position", void 0);
    _defineProperty(this, "scale", void 0);
    _defineProperty(this, "rotate", void 0);
    this.parent = parent;
    this.position = _Vector.default.zero;
    this.scale = _Vector.default.one;
    this.rotate = _Vector2.default.zero;
  }
}
exports.default = Transform2D;
_defineProperty(Transform2D, "serializableFields", ["position"]);
//# sourceMappingURL=Transform2D.js.map