import { IGameObject, Component, Vector2, ICamera, Ray2D } from "@inemotion/core";

export default class Camera extends Component implements ICamera {
  constructor(gameObject: IGameObject) {
    super(gameObject);
  }

  /** Apply camera transform to canvas context transform */
  public applyTransform() {
    this.gameObject.scene.app.renderer.cancelTransform2D(this.gameObject.transform);
  }

  /** Convert world point to viewport point */
  public worldToViewportPoint(point: Vector2) {
    const dimension = this.gameObject.scene.app.renderer.getViewportDimension();
    const modifiedPoint = this.scaleWorldToCameraViewPoint(point);

    const x = (dimension.x / 2) - this.gameObject.transform.position.x + modifiedPoint.x;
    const y = (dimension.y / 2) - this.gameObject.transform.position.y + modifiedPoint.y;

    return new Vector2(
      x,
      y,
    );
  }

  /** Convert world point to viewport point */
  public viewportToWorlPoint(point: Vector2) {
    const dimension = this.gameObject.scene.app.renderer.getViewportDimension();
    const scaledPoint = this.scaleCameraViewToWorldPoint(point);

    const x = (dimension.x / 2) + this.gameObject.transform.position.x + scaledPoint.x;
    const y = (dimension.y / 2) + this.gameObject.transform.position.y + scaledPoint.y;

    return new Vector2(
      x,
      y,
    );
  }

  /** Get 2D offset of the point in the camera perspective view */
  public getVectorPerspective(point: Vector2): Vector2 {
    const camera = this.gameObject.transform.position;
    const angle = Vector2.getAngle(camera, point);
    const distance = Vector2.getDistance(camera, point);
    const relativePoint = Vector2.getPointAtAngle(angle, distance);
    const modX = relativePoint.x - (relativePoint.x * this.gameObject.transform.scale.x);
    const modY  = relativePoint.y - (relativePoint.y * this.gameObject.transform.scale.y);
    return new Vector2(
      modX,
      modY,
    );
  }

  /* Transform point from world to viewport depends on camera scale */
  public scaleWorldToCameraViewPoint(point: Vector2): Vector2 {
    const scale = this.gameObject.transform.scale;
    return new Vector2(
      point.x * scale.x,
      point.y * scale.y,
    );
  }

  /* Transform point from viewport to world depends on camera scale */
  public scaleCameraViewToWorldPoint(point: Vector2): Vector2 {
    const scale = this.gameObject.transform.scale;
    return new Vector2(
      point.x / scale.x,
      point.y / scale.y,
    );
  }

  public viewportPointToRay2D(point: Vector2): Ray2D {
    return new Ray2D(
      this.viewportToWorlPoint(point),
      Vector2.zero,
    );
  }
}
