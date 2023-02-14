"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@inemotion/core");
class ShowGameObjectCenter extends _core.Plugin {
  onUI() {
    for (const gameObject of this.app.activeScene.gameObjects) {
      this.drawPointAt(this.app.activeCamera.worldToViewportPoint(gameObject.transform.position), gameObject.name);
    }
  }
  drawPointAt(point, name) {
    const ctx = this.app.renderer.context;
    const backupStrokeStyle = ctx.strokeStyle;
    const backupFillStyle = ctx.fillStyle;
    ctx.strokeStyle = "cyan";
    ctx.fillStyle = "cyan";
    ctx.beginPath();
    ctx.moveTo(point.x - 10, point.y);
    ctx.lineTo(point.x + 10, point.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(point.x, point.y - 10);
    ctx.lineTo(point.x, point.y + 10);
    ctx.stroke();
    ctx.font = "10px Tahoma";
    ctx.fillStyle = "cyan";
    ctx.fillText(name, point.x + 10, point.y + 20);
    ctx.strokeStyle = backupStrokeStyle;
    ctx.fillStyle = backupFillStyle;
  }
}
exports.default = ShowGameObjectCenter;
//# sourceMappingURL=ShowGameObjectCenter.js.map