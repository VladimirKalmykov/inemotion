"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@inemotion/core");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class GameObject extends _core.BaseModule {
  constructor(scene) {
    super();
    _defineProperty(this, "name", void 0);
    _defineProperty(this, "updateFrameStamp", 0);
    _defineProperty(this, "transform", new _core.Transform2D(this));
    _defineProperty(this, "scene", void 0);
    _defineProperty(this, "components", new _core.Collection());
    if (!scene) {
      throw new Error("You must specify scene for the instance of GameObject");
    }
    this.scene = scene;
  }
  findComponent(ComponentClass) {
    return this.components.find(component => component instanceof ComponentClass);
  }
  setPosition(x, y) {
    this.transform.position.x = x;
    this.transform.position.y = y;
  }
  addComponent(ComponentClass, config) {
    const component = new ComponentClass(this, config);
    this.components.push(component);
    return component;
  }
  getComponent(ComponentClass) {
    return this.components.find(component => component instanceof ComponentClass);
  }
  removeComponent(componentToRemove) {
    const index = this.components.findIndex(component => component === componentToRemove);
    if (index > -1) {
      componentToRemove.destroy();
      this.components.splice(index, 1);
    }
  }
  onStart() {
    for (const component of this.components) {
      component.onStart();
    }
  }
  onFixedUpdate() {
    for (const component of this.components) {
      component.onFixedUpdate();
    }
    this.updateFrameStamp++;
  }
  onUpdate() {
    this.scene.app.renderer.translate2D(this.transform.position);
    for (const component of this.components) {
      component.onUpdate();
    }
    this.scene.app.renderer.cancelTranslate2D(this.transform.position);
  }
  onUI() {
    for (const component of this.components) {
      component.onUI();
    }
  }
}
exports.default = GameObject;
_defineProperty(GameObject, "serializableFields", ["name", "transform", "components"]);
_defineProperty(GameObject, "hookTypes", ["render", "fixed-update", "updated"]);
//# sourceMappingURL=GameObject.js.map