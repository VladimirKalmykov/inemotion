import { Plugin, Vector2 } from "@inemotion/core";

export default class ShowGameObjectCenter extends Plugin {

  public onUI() {
    for (const gameObject of this.app.activeScene.gameObjects) {
      this.drawPointAt(
        this.app.activeCamera.worldToViewportPoint(gameObject.transform.position),
        gameObject.name,
      );
    }
  }

  private drawPointAt(point: Vector2, name: string) {
    // Memoize fill style
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

    // Title
    ctx.font = "10px Tahoma";
    ctx.fillStyle = "cyan";
    ctx.fillText(name, point.x + 10, point.y + 20);

    // Repair fill style
    ctx.strokeStyle = backupStrokeStyle;
    ctx.fillStyle = backupFillStyle;
  }
}
