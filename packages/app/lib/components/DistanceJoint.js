"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@inemotion/core");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getAngle(cx, cy, ex, ey) {
  const dy = ey - cy;
  const dx = ex - cx;
  const theta = Math.atan2(dy, dx);
  return theta;
}
class DistanceJoint extends _core.Component {
  constructor(gameObject, config) {
    super(gameObject);
    _defineProperty(this, "targetObject", void 0);
    _defineProperty(this, "dist", void 0);
    _defineProperty(this, "lastFrameStamp", void 0);
    const {
      targetObject
    } = config;
    if (!targetObject) {
      throw new Error("Target object requires to be provided an actual game object");
    }
    this.targetObject = targetObject;
    const x1 = this.targetObject.transform.position.x;
    const y1 = this.targetObject.transform.position.y;
    const x2 = gameObject.transform.position.x;
    const y2 = gameObject.transform.position.y;
    this.dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
  onFixedUpdate() {
    if (this.lastFrameStamp === this.gameObject.updateFrameStamp) {
      return;
    }
    const x1 = this.targetObject.transform.position.x;
    const y1 = this.targetObject.transform.position.y;
    const x2 = this.gameObject.transform.position.x;
    const y2 = this.gameObject.transform.position.y;
    const angle = getAngle(x2, y2, x1, y1);
    const newDist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    const diff = newDist - this.dist;
    const nextX = x2 + diff * Math.cos(angle);
    const nextY = y2 + diff * Math.sin(angle);
    this.gameObject.transform.position.x = nextX;
    this.gameObject.transform.position.y = nextY;
    this.lastFrameStamp = this.gameObject.updateFrameStamp;
    this.gameObject.triggerHooks("updated");
  }
  renderLines(ctx) {
    const x1 = this.targetObject.transform.position.x;
    const y1 = this.targetObject.transform.position.y;
    const x2 = this.gameObject.transform.position.x;
    const y2 = this.gameObject.transform.position.y;
    const backupStyle = ctx.strokeStyle;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.strokeStyle = backupStyle;
  }
}
exports.default = DistanceJoint;
//# sourceMappingURL=DistanceJoint.js.map