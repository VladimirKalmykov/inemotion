import Serializable from "./Serializable";
import Vector2 from "./Vector2";

export default class Ray extends Serializable {
  public static serializableFields = ["origin", "direction"];
  /** The point in the world */
  public origin: Vector2;
  /** Direction Direction indicates the direction of the vector relative to the zero axys */
  public direction: Vector2;

  constructor(origin: Vector2, direction: Vector2 = Vector2.zero) {
    super();
    this.origin = origin;
    this.direction = direction.normalize();
  }

  /** Return point of the ray at specified distance */
  public getPoint(distance: number) {
    const relativePoint: Vector2 = Vector2.interpolatePoints(Vector2.zero, this.direction, distance);
    return Vector2.add(
      this.origin,
      relativePoint,
    );
  }
}
