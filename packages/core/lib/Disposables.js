"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Disposables extends Array {
  constructor(index = 0) {
    super(index);
    _defineProperty(this, "groups", void 0);
    this.groups = {};
  }
  add(disposable) {
    this.push(disposable);
    return () => {
      const index = this.findIndex(item => item === disposable);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
  }
  dispose() {
    const groupValues = Object.values(this.groups);
    for (const group of groupValues) {
      group.dispose();
    }
    for (const disposable of this) {
      if (typeof disposable === "function") {
        disposable();
      } else if (typeof disposable === "object" && typeof disposable.dispose === "function") {
        disposable.dispose(this);
      } else {
        throw new TypeError("Invald disposable object");
      }
    }
  }
  group(name) {
    if (!this.groups[name]) {
      this.groups[name] = new Disposables();
      this.groups[name].add(() => {
        Reflect.deleteProperty(this.groups, name);
      });
    }
    return this.groups[name];
  }
}
exports.default = Disposables;
//# sourceMappingURL=Disposables.js.map