"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@inemotion/core");
var _GameObject = _interopRequireDefault(require("./GameObject"));
var _Camera = _interopRequireDefault(require("./components/Camera"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Scene extends _core.BaseModule {
  constructor() {
    super();
    _defineProperty(this, "gameObjects", void 0);
    _defineProperty(this, "name", void 0);
    _defineProperty(this, "app", void 0);
    this.gameObjects = new _core.Collection();
  }
  onUpdate() {
    for (const gameObject of this.gameObjects) {
      gameObject.onUpdate();
    }
  }
  onUI() {
    for (const gameObject of this.gameObjects) {
      gameObject.onUI();
    }
  }
  onFixedUpdate() {
    for (const gameObject of this.gameObjects) {
      gameObject.onFixedUpdate();
    }
  }
  addEmptyGameObject(name) {
    const go = new _GameObject.default(this);
    if (name) {
      go.name = name;
    }
    return this.addGameObject(go);
  }
  addGameObject(gameObject) {
    const go = typeof gameObject === "function" ? new gameObject(this) : gameObject;
    go.scene = this;
    this.gameObjects.push(go);
    return go;
  }
  getMainCamera() {
    const foundedCameras = [];
    console.log('gameObjects', this.gameObjects);
    for (const go of this.gameObjects) {
      const camera = go.getComponent(_Camera.default);
      if (camera) {
        if (go.name === "MainCamera") {
          return camera;
        }
        foundedCameras.push(camera);
      }
    }
    if (foundedCameras.length > 0) {
      return foundedCameras[0];
    }
    return null;
  }
  onStart() {
    for (const gameObject of this.gameObjects) {
      gameObject.onStart();
    }
  }
}
exports.default = Scene;
_defineProperty(Scene, "serializableFields", ["gameObjects"]);
//# sourceMappingURL=Scene.js.map