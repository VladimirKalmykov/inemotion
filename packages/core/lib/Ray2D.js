"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Serializable = _interopRequireDefault(require("./Serializable"));
var _Vector = _interopRequireDefault(require("./Vector2"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Ray extends _Serializable.default {
  constructor(origin, direction = _Vector.default.zero) {
    super();
    _defineProperty(this, "origin", void 0);
    _defineProperty(this, "direction", void 0);
    this.origin = origin;
    this.direction = direction.normalize();
  }
  getPoint(distance) {
    const relativePoint = _Vector.default.interpolatePoints(_Vector.default.zero, this.direction, distance);
    return _Vector.default.add(this.origin, relativePoint);
  }
}
exports.default = Ray;
_defineProperty(Ray, "serializableFields", ["origin", "direction"]);
//# sourceMappingURL=Ray2D.js.map