"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@inemotion/core");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const defaultOnUpdate = () => {};
class HTMLCanvas2DRenderer extends _core.BaseModule {
  get autoSize() {
    return this._autoSize;
  }
  set autoSize(value) {
    this._autoSize = value;
    this.applyAutoSize();
  }
  get maxFps() {
    return this._maxFps;
  }
  set maxFps(value) {
    this._maxFps = value;
    this.applyMaxFps();
  }
  get dimension() {
    return this._dimension;
  }
  constructor({
    autoSize = true,
    maxFps = 90
  }) {
    super();
    _defineProperty(this, "_autoSize", false);
    _defineProperty(this, "_maxFps", 60);
    _defineProperty(this, "onUpdate", defaultOnUpdate);
    _defineProperty(this, "onUI", defaultOnUpdate);
    _defineProperty(this, "element", void 0);
    _defineProperty(this, "deltaTime", 0);
    _defineProperty(this, "context", void 0);
    _defineProperty(this, "_dimension", void 0);
    _defineProperty(this, "maxFrameSize", 0);
    _defineProperty(this, "lastFrameTimeStamp", 0);
    _defineProperty(this, "prevFrameOverlap", 0);
    _defineProperty(this, "animationFrameRequestId", void 0);
    _defineProperty(this, "fitCanvasDimensionToElement", () => {
      this.element.width = this.element.offsetWidth;
      this.element.height = this.element.offsetHeight;
      this._dimension = new _core.Vector2(this.element.offsetWidth, this.element.offsetHeight);
    });
    _defineProperty(this, "applyAutoSize", () => {
      if (this.autoSize) {
        this.element.style.width = "100%";
        this.element.style.height = "100%";
        setTimeout(this.fitCanvasDimensionToElement);
      }
    });
    _defineProperty(this, "applyMaxFps", () => {
      this.maxFrameSize = 1000 / this.maxFps;
    });
    _defineProperty(this, "renderFrame", () => {
      if (!this.context) {
        return;
      }
      this.deltaTime = Number(new Date()) - this.lastFrameTimeStamp + this.prevFrameOverlap;
      if (this.deltaTime >= this.maxFrameSize) {
        this.prevFrameOverlap = this.deltaTime - this.maxFrameSize;
        if (this.prevFrameOverlap > this.maxFrameSize) {
          this.prevFrameOverlap = 0;
        }
        this.clear();
        this.resetTransformationForCamera();
        this.onUpdate(this.deltaTime);
        this.resetTranformationForUI();
        this.onUI(this.deltaTime);
        this.renderFps();
        this.lastFrameTimeStamp = Number(new Date());
        this.deltaTime = 0;
      }
      this.animationFrameRequestId = requestAnimationFrame(this.renderFrame);
    });
    this.element = document.createElement("canvas");
    this.context = this.element.getContext("2d");
    this.deltaTime = 0;
    this.disposables.add(() => {
      this.element = null;
      this.context = null;
      cancelAnimationFrame(this.animationFrameRequestId);
    });
    this.autoSize = autoSize;
    this.maxFps = maxFps;
    this.fitCanvasDimensionToElement();
    window.addEventListener("resize", this.fitCanvasDimensionToElement);
    this.disposables.add(() => {
      window.removeEventListener("resize", this.fitCanvasDimensionToElement);
    });
  }
  start() {
    this.renderFrame();
  }
  getViewportDimension() {
    return this.dimension;
  }
  translate2D(position) {
    this.context.translate(position.x, position.y);
  }
  cancelTranslate2D(position) {
    this.context.translate(position.x * -1, position.y * -1);
  }
  transform2D(transform) {
    this.context.transform(transform.scale.x, 0, 0, transform.scale.y, transform.position.x, transform.position.y);
    this.context.rotate(transform.rotate.z);
  }
  cancelTransform2D(transform) {
    this.context.transform(transform.scale.x * -1, 0, 0, transform.scale.y * -1, transform.position.x * -1, transform.position.y * -1);
    this.context.rotate(transform.rotate.z);
  }
  resetTransformationForCamera() {
    this.context.setTransform(1, 0, 0, 1, this.element.offsetWidth / 2, this.element.offsetHeight / 2);
    this.context.rotate(0);
  }
  resetTranformationForUI() {
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.rotate(0);
  }
  clear() {
    this.context.clearRect(0, 0, this.element.width, this.element.height);
  }
  renderFps() {
    const backupStyle = this.context.fillStyle;
    const fpsText = `FPS: ${Math.round(1000 / (this.deltaTime || 1))}`;
    this.context.font = "14px Tahoma";
    this.context.fillStyle = "white";
    this.context.fillText(fpsText, 9, 11);
    this.context.fillStyle = "black";
    this.context.fillText(fpsText, 10, 10);
    this.context.fillStyle = backupStyle;
  }
}
exports.default = HTMLCanvas2DRenderer;
_defineProperty(HTMLCanvas2DRenderer, "serializableFields", ["autoSize", "maxFps"]);
//# sourceMappingURL=HTMLCanvas2DRenderer.js.map