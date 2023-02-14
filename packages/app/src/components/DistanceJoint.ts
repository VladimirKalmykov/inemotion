import { Component, IGameObject, ICanvas2DApi } from "@inemotion/core";

function getAngle(cx: number, cy: number, ex: number, ey: number): number {
  const dy = ey - cy;
  const dx = ex - cx;
  const theta = Math.atan2(dy, dx); // range (-PI, PI]
  return theta;
}

interface IDistanceJointConfig {
  targetObject: IGameObject;
}

export default class DistanceJoint extends Component {
  public targetObject: IGameObject;
  private dist: number;
  private lastFrameStamp: number;
  constructor(gameObject: IGameObject, config: IDistanceJointConfig) {
    super(gameObject);
    const {
      targetObject,
    } = config;

    if (!targetObject) {
      throw new Error("Target object requires to be provided an actual game object");
    }

    this.targetObject = targetObject;

    /* Calc initial distance between current gameObject and target */
    const x1 = this.targetObject.transform.position.x;
    const y1 = this.targetObject.transform.position.y;
    const x2 = gameObject.transform.position.x;
    const y2 = gameObject.transform.position.y;

    this.dist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }

  public onFixedUpdate() {
    // Ignore update if it is already updated in current frame
    if (this.lastFrameStamp === this.gameObject.updateFrameStamp) {
      return;
    }
    const x1 = this.targetObject.transform.position.x;
    const y1 = this.targetObject.transform.position.y;
    const x2 = this.gameObject.transform.position.x;
    const y2 = this.gameObject.transform.position.y;
    const angle: number = getAngle(x2, y2, x1, y1);

    const newDist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

    const diff = (newDist - this.dist);
    const nextX = x2 + diff * Math.cos(angle);
    const nextY = y2 + diff * Math.sin(angle);

    this.gameObject.transform.position.x = nextX;
    this.gameObject.transform.position.y = nextY;

    this.lastFrameStamp = this.gameObject.updateFrameStamp;

    this.gameObject.triggerHooks("updated");
  }

  private renderLines(ctx: ICanvas2DApi) {
    const x1 = this.targetObject.transform.position.x;
    const y1 = this.targetObject.transform.position.y;
    const x2 = this.gameObject.transform.position.x;
    const y2 = this.gameObject.transform.position.y;

    const backupStyle = ctx.strokeStyle;
    ctx.strokeStyle = "white";

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Repair fill style
    ctx.strokeStyle = backupStyle;
  }
}
