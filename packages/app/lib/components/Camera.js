"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@inemotion/core");
class Camera extends _core.Component {
  constructor(gameObject) {
    super(gameObject);
  }
  applyTransform() {
    this.gameObject.scene.app.renderer.cancelTransform2D(this.gameObject.transform);
  }
  worldToViewportPoint(point) {
    const dimension = this.gameObject.scene.app.renderer.getViewportDimension();
    const modifiedPoint = this.scaleWorldToCameraViewPoint(point);
    const x = dimension.x / 2 - this.gameObject.transform.position.x + modifiedPoint.x;
    const y = dimension.y / 2 - this.gameObject.transform.position.y + modifiedPoint.y;
    return new _core.Vector2(x, y);
  }
  viewportToWorlPoint(point) {
    const dimension = this.gameObject.scene.app.renderer.getViewportDimension();
    const scaledPoint = this.scaleCameraViewToWorldPoint(point);
    const x = dimension.x / 2 + this.gameObject.transform.position.x + scaledPoint.x;
    const y = dimension.y / 2 + this.gameObject.transform.position.y + scaledPoint.y;
    return new _core.Vector2(x, y);
  }
  getVectorPerspective(point) {
    const camera = this.gameObject.transform.position;
    const angle = _core.Vector2.getAngle(camera, point);
    const distance = _core.Vector2.getDistance(camera, point);
    const relativePoint = _core.Vector2.getPointAtAngle(angle, distance);
    const modX = relativePoint.x - relativePoint.x * this.gameObject.transform.scale.x;
    const modY = relativePoint.y - relativePoint.y * this.gameObject.transform.scale.y;
    return new _core.Vector2(modX, modY);
  }
  scaleWorldToCameraViewPoint(point) {
    const scale = this.gameObject.transform.scale;
    return new _core.Vector2(point.x * scale.x, point.y * scale.y);
  }
  scaleCameraViewToWorldPoint(point) {
    const scale = this.gameObject.transform.scale;
    return new _core.Vector2(point.x / scale.x, point.y / scale.y);
  }
  viewportPointToRay2D(point) {
    return new _core.Ray2D(this.viewportToWorlPoint(point), _core.Vector2.zero);
  }
}
exports.default = Camera;
//# sourceMappingURL=Camera.js.map