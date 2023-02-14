"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Serializable = _interopRequireDefault(require("./Serializable"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Vector3 extends _Serializable.default {
  static get zero() {
    return new Vector3(0, 0, 0);
  }
  static get one() {
    return new Vector3(1, 1, 1);
  }
  static fromSerialized(data) {
    return new Vector3(data[0] || 0, data[1] || 0, data[2] || 0);
  }
  constructor(x, y, z) {
    super();
    _defineProperty(this, "x", void 0);
    _defineProperty(this, "y", void 0);
    _defineProperty(this, "z", void 0);
    this.x = x;
    this.y = y;
    this.z = z;
  }
  serialize() {
    return [this.x, this.y, this.z];
  }
  deserialize(data) {
    this.x = data[0];
    this.y = data[1];
    this.z = data[2];
  }
}
exports.default = Vector3;
//# sourceMappingURL=Vector3.js.map