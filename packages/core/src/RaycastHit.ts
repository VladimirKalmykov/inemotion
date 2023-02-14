import Ray2D from "./Ray2D";
import { ICollider } from "./types.d";

export default class RaycastHit {
  public ray: Ray2D;
  public distance: number;
  public collider: ICollider;
  constructor(ray: Ray2D, distance: number, collider: ICollider) {
    this.ray = ray;
    this.distance = distance;
    this.collider = collider;
  }
}
