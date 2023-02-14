"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _BaseModule = _interopRequireDefault(require("./BaseModule"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Plugin extends _BaseModule.default {
  constructor(app, config) {
    super();
    _defineProperty(this, "app", void 0);
    _defineProperty(this, "config", void 0);
    this.app = app;
    this.config = config;
  }
  onStart() {}
  onUpdate() {}
  onFixedUpdate() {}
  onUI() {}
}
exports.default = Plugin;
//# sourceMappingURL=Plugin.js.map