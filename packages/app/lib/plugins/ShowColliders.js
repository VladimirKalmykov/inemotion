"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@inemotion/core");
var _Collider = _interopRequireDefault(require("../components/Collider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ShowGameObjectCenter extends _core.Plugin {
  onUI() {
    for (const gameObject of this.app.activeScene.gameObjects) {
      const collider = gameObject.findComponent(_Collider.default);
      if (collider) {
        const boundingRect = collider.getBoundingRect();
        const rectStart = _core.Vector2.add(gameObject.transform.position, boundingRect[0]);
        const rectEnd = _core.Vector2.add(gameObject.transform.position, boundingRect[1]);
        this.drawRect(this.app.renderer.context, [this.app.activeCamera.worldToViewportPoint(rectStart), this.app.activeCamera.worldToViewportPoint(rectEnd)]);
      }
    }
  }
  drawRect(ctx, rect) {
    const backupStyle = ctx.strokeStyle;
    ctx.strokeStyle = "pink";
    ctx.beginPath();
    ctx.rect(rect[0].x, rect[0].y, rect[1].x - rect[0].x, rect[1].y - rect[0].y);
    ctx.stroke();
    ctx.strokeStyle = backupStyle;
  }
}
exports.default = ShowGameObjectCenter;
//# sourceMappingURL=ShowColliders.js.map