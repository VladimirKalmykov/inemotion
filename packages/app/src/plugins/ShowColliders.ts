import { Plugin, Vector2 } from "@inemotion/core";
import Collider from "../components/Collider";

export default class ShowGameObjectCenter extends Plugin {
  public onUI() {
    for (const gameObject of this.app.activeScene.gameObjects) {
      const collider = gameObject.findComponent(Collider);
      if (collider) {
        /* Get rectangular borders of collider */
        const boundingRect = (collider as Collider).getBoundingRect();
        /* Add to game object position */
        const rectStart = Vector2.add(
          gameObject.transform.position,
          boundingRect[0],
        );
        const rectEnd = Vector2.add(
          gameObject.transform.position,
          boundingRect[1],
        );
        /* Draw rect in UI canvas */
        this.drawRect(
          this.app.renderer.context,
          [
            this.app.activeCamera.worldToViewportPoint(rectStart),
            this.app.activeCamera.worldToViewportPoint(rectEnd),
          ],
        );
      }
    }
  }
  private drawRect(ctx: CanvasRenderingContext2D, rect: Vector2[]) {
    const backupStyle = ctx.strokeStyle;
    ctx.strokeStyle = "pink";

    ctx.beginPath();
    ctx.rect(rect[0].x, rect[0].y, rect[1].x - rect[0].x, rect[1].y - rect[0].y);
    ctx.stroke();

    // Repair fill style
    ctx.strokeStyle = backupStyle;
  }
}
