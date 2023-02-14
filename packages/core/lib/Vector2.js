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
class Vector2 extends _Serializable.default {
  static add(vector1, vector2) {
    return new Vector2(vector1.x + vector2.x, vector1.y + vector2.y);
  }
  static interpolatePoints(point1, point2, t) {
    const nx = point1.x + (point2.x - point1.x) * t;
    const ny = point1.y + (point2.y - point1.y) * t;
    return new Vector2(nx, ny);
  }
  static getPointAtAngle(angle, distance) {
    const angle2 = 180 - 90 - angle;
    const x = distance * Math.sin(angle * Math.PI / 180) / Math.sin(90 * Math.PI / 180);
    const y = distance * Math.sin(angle2 * Math.PI / 180) / Math.sin(90 * Math.PI / 180);
    return new Vector2(y, x);
  }
  static getAngle(point1, point2) {
    return Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
  }
  static getAngleBetweenLines(point1, point2, point3, point4) {
    const dAx = point2.x - point1.x;
    const dAy = point2.y - point1.y;
    const dBx = point4.x - point3.x;
    const dBy = point4.y - point3.y;
    const angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
    return angle * (180 / Math.PI);
  }
  static getAbsoluteAngleBetweenLines(point1, point2, point3, point4) {
    const dAx = point2.x - point1.x;
    const dAy = point2.y - point1.y;
    const dBx = point4.x - point3.x;
    const dBy = point4.y - point3.y;
    let angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
    if (angle < 0) {
      angle = angle * -1;
    }
    return angle * (180 / Math.PI);
  }
  static getDistance(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }
  static getLinesIntersectionPoint(A1, A2, B1, B2) {
    const aAC = Vector2.getAngleBetweenLines(A1, A2, A1, B1);
    const aCB = Vector2.getAngleBetweenLines(B1, A1, B1, B2);
    const lC = Vector2.getDistance(A1, B1);
    const aAB = 180 - aAC - aCB;
    const A = lC * Math.sin(aCB * Math.PI / 180) / Math.sin(aAB * Math.PI / 180);
    const B = A * Math.sin(aAC * Math.PI / 180) / Math.sin(aCB * Math.PI / 180);
    const lA = Vector2.getDistance(A1, A2);
    const lB = Vector2.getDistance(B1, B2);
    const frec = A / lA;
    const frec2 = B / lB;
    return frec <= 1 && frec >= 0 && frec2 <= 1 && frec2 >= 0 ? Vector2.interpolatePoints(A1, A2, frec) : null;
  }
  static getRaysIntersectionPoint(A1, A2, B1, B2) {
    const aAC = Vector2.getAngleBetweenLines(A1, A2, A1, B1);
    const aCB = Vector2.getAngleBetweenLines(B1, A1, B1, B2);
    const aAB = 180 - aAC - aCB;
    const lC = Vector2.getDistance(A1, B1);
    const A = lC * Math.sin(aCB * Math.PI / 180) / Math.sin(aAB * Math.PI / 180);
    const lA = Vector2.getDistance(A1, A2);
    return Vector2.interpolatePoints(A1, A2, A / lA);
  }
  static get zero() {
    return new Vector2(0, 0);
  }
  static get one() {
    return new Vector2(1, 1);
  }
  static fromSerialized(data) {
    return new Vector2(data[0] || 0, data[1] || 0);
  }
  constructor(x, y) {
    super();
    _defineProperty(this, "x", void 0);
    _defineProperty(this, "y", void 0);
    this.x = x;
    this.y = y;
  }
  normalize() {
    const multiply = 1 / Math.max(this.x, this.y);
    return new Vector2(this.x * multiply, this.y * multiply);
  }
  serialize() {
    return [this.x, this.y];
  }
  deserialize(data) {
    this.x = data[0];
    this.y = data[1];
  }
}
exports.default = Vector2;
//# sourceMappingURL=Vector2.js.map