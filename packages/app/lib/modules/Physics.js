"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@inemotion/core");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Physics extends _core.BaseModule {
  get fixedUpdateTime() {
    return this._fixedUpdateTime;
  }
  set fixedUpdateTime(value) {
    this._fixedUpdateTime = value;
    this.onFixedUpdateTimeDidChange();
  }
  get deltaTime() {
    return this._deltaTime;
  }
  constructor({
    fixedUpdateTime = 20
  }) {
    super();
    _defineProperty(this, "_fixedUpdateTime", 30);
    _defineProperty(this, "_deltaTime", 0);
    _defineProperty(this, "_updateTimerId", null);
    _defineProperty(this, "_lastUpdateTimestamp", void 0);
    _defineProperty(this, "_onUpdate", () => {
      this._deltaTime = new Date().getTime() - this._lastUpdateTimestamp;
      this.onUpdate();
    });
    this.fixedUpdateTime = fixedUpdateTime;
  }
  start() {
    if (typeof this.onUpdate !== "function") {
      throw new Error("onUpdate should be spcified");
    }
    this.runUpdate();
  }
  runUpdate() {
    this._updateTimerId = setInterval(this._onUpdate, this.fixedUpdateTime);
  }
  onUpdate() {
    throw new Error("onUpdate handler should be monkeypatched by the application");
  }
  onFixedUpdateTimeDidChange() {
    if (this._updateTimerId) {
      clearInterval(this._updateTimerId);
      this.runUpdate();
    }
  }
}
exports.default = Physics;
_defineProperty(Physics, "serializableFields", ["fixedUpdateTime"]);
//# sourceMappingURL=Physics.js.map