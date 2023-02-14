import Collider from "./Collider";
import { IGameObject, Vector2, RaycastHit, Ray2D } from "@inemotion/core";

export default class CircleCollider extends Collider {
  public radius: number;
  constructor(gameObject: IGameObject, {
    radius,
  }) {
    super(gameObject);

    this.radius = radius;
  }

  /* Get rect of edges of arc */
  public getBoundingRect(): Vector2[] {
    return [
      new Vector2(-this.radius, -this.radius),
      new Vector2(this.radius, this.radius),
    ];
  }

  /** Detect ray hits this collider */
  public raycast(ray: Ray2D, distance: number): RaycastHit {
    
  }
}
