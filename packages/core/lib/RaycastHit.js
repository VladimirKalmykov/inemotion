"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class RaycastHit {
  constructor(ray, distance, collider) {
    _defineProperty(this, "ray", void 0);
    _defineProperty(this, "distance", void 0);
    _defineProperty(this, "collider", void 0);
    this.ray = ray;
    this.distance = distance;
    this.collider = collider;
  }
}
exports.default = RaycastHit;
//# sourceMappingURL=RaycastHit.js.map