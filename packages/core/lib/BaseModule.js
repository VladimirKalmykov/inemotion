"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Disposables = _interopRequireDefault(require("./Disposables"));
var _Serializable = _interopRequireDefault(require("./Serializable"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class BaseModule extends _Serializable.default {
  constructor() {
    super();
    _defineProperty(this, "disposables", void 0);
    _defineProperty(this, "hooks", void 0);
    this.disposables = new _Disposables.default();
    this.hooks = {};
    const hookTypes = Object.getPrototypeOf(this).constructor.hookTypes || [];
    if (hookTypes.length > 0) {
      this.registerHookTypes(hookTypes);
    }
  }
  registerHookTypes(hookTypes) {
    for (const hookName of hookTypes) {
      if (this.hooks[hookName]) {
        throw new Error(`Hook "${hookName}" already exists`);
      }
      this.hooks[hookName] = [];
    }
  }
  addHook(hookType, hook) {
    if (!this.hooks[hookType]) {
      throw new TypeError(`Unknown hook type "${hookType}"`);
    }
    this.hooks[hookType].push(hook);
    return () => this.removeHook(hookType, hook);
  }
  removeHook(hookType, hookToRemove) {
    if (!this.hooks[hookType]) {
      throw new TypeError(`Unknown hook type "${hookType}"`);
    }
    const index = this.hooks[hookType].findIndex(hook => hook === hookToRemove);
    if (index > -1) {
      this.hooks[hookType].splice(index, 1);
    }
  }
  triggerHooks(hookType, args = []) {
    if (!this.hooks[hookType]) {
      throw new TypeError(`Unknown hook type "${hookType}"`);
    }
    for (const hook of this.hooks[hookType]) {
      Reflect.apply(hook, this, args);
    }
  }
  destroy() {
    this.disposables.dispose();
    if (typeof this.onDestroy === "function") {
      this.onDestroy();
    }
  }
  dispose() {
    this.dispose();
  }
  onDestroy() {}
}
exports.default = BaseModule;
//# sourceMappingURL=BaseModule.js.map