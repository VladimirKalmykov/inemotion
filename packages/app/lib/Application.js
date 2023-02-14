"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@inemotion/core");
var _HTMLCanvas2DRenderer = _interopRequireDefault(require("./HTMLCanvas2DRenderer"));
var _Scene = _interopRequireDefault(require("./Scene"));
var _Physics = _interopRequireDefault(require("./modules/Physics"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class Application extends _core.BaseModule {
  get activeCamera() {
    if (!this._activeCamera) {
      if (this._activeScene) {
        this._activeCamera = this._activeScene.getMainCamera();
      }
    }
    return this._activeCamera;
  }
  set activeCamera(value) {
    this._activeCamera = value;
  }
  constructor({
    renderer = {},
    plugins: userPlugins = [],
    scenes = [],
    startSceneId = 0,
    physics = {}
  } = {}) {
    super();
    _defineProperty(this, "element", void 0);
    _defineProperty(this, "plugins", void 0);
    _defineProperty(this, "scenes", void 0);
    _defineProperty(this, "renderer", void 0);
    _defineProperty(this, "startSceneId", void 0);
    _defineProperty(this, "time", void 0);
    _defineProperty(this, "_activeCamera", void 0);
    _defineProperty(this, "physics", void 0);
    _defineProperty(this, "_activeScene", void 0);
    this.plugins = new _core.Collection(userPlugins);
    this.scenes = new _core.Collection(scenes.map(() => new _Scene.default()));
    this.physics = new _Physics.default(physics);
    this.physics.onUpdate = () => {
      this.activeScene.onFixedUpdate();
      for (const plugin of this.plugins) {
        plugin.onFixedUpdate();
      }
    };
    this.time = {
      get deltaTime() {
        return this.renderer.deltaTime;
      },
      get fixedDeltaTime() {
        return this.physics.deltaTime;
      }
    };
    if (this.scenes.length === 0) {
      this.scenes.push(new _Scene.default());
    }
    this.renderer = new _HTMLCanvas2DRenderer.default(renderer);
    this.renderer.onUpdate = () => {
      this.activeCamera.applyTransform();
      this.activeScene.onUpdate();
      for (const plugin of this.plugins) {
        plugin.onUpdate();
      }
    };
    this.renderer.onUI = () => {
      this.activeScene.onUI();
      for (const plugin of this.plugins) {
        plugin.onUI();
      }
    };
    let startScene = typeof startSceneId === "string" ? this.getSceneByName(startSceneId) : this.getSceneByIndex(startSceneId);
    if (!startScene) {
      startScene = this.scenes[0];
    }
    this.activeScene = startScene;
  }
  get activeScene() {
    return this._activeScene;
  }
  set activeScene(nextActiveScene) {
    this.activeCamera = null;
    if (!this.scenes.includes(nextActiveScene)) {
      throw new Error("Active scene should be in application scenes");
    }
    const scene = nextActiveScene;
    if (!this._activeScene) {
      this.triggerHooks("set-active-scene", [scene]);
    } else {
      this.triggerHooks("change-active-scene", [scene]);
    }
    this._activeScene = scene;
    scene.app = this;
    this.activeCamera = scene.getMainCamera();
  }
  addPlugin(PluginClass, config) {
    const plugin = new PluginClass(this, config);
    this.plugins.push(plugin);
    return plugin;
  }
  removePlugin(pluginToRemove) {
    const index = this.plugins.findIndex(plugin => plugin === pluginToRemove);
    if (index > -1) {
      pluginToRemove.destroy();
      this.plugins.splice(index, 1);
    }
  }
  findPlugin(PluginClass) {
    return this.plugins.find(plugin => plugin instanceof PluginClass);
  }
  getSceneByIndex(index) {
    return this.scenes[index];
  }
  getSceneByName(name) {
    return this.scenes.find(scene => scene.name === name);
  }
  start() {
    this.activeScene.onStart();
    for (const plugin of this.plugins) {
      plugin.onStart();
    }
    this.physics.start();
    this.renderer.start();
  }
}
exports.default = Application;
_defineProperty(Application, "serialazableFields", ["renderer", "plugins", "scenes", "startSceneIndex"]);
_defineProperty(Application, "hookTypes", ["set-active-scene", "change-active-scene"]);
//# sourceMappingURL=Application.js.map