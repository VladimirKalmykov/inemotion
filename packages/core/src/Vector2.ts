import Serializable from "./Serializable";

export default class Vector2 extends Serializable {
  /** Add two Vector2 */
  public static add(vector1: Vector2, vector2: Vector2): Vector2 {
    return new Vector2(
      vector1.x + vector2.x,
      vector1.y + vector2.y,
    );
  }
  /** Get the coordinates betwen two points with t factor */
  public static interpolatePoints(point1: Vector2, point2: Vector2, t: number) {
    const nx = point1.x + (point2.x - point1.x) * t;
    const ny = point1.y + (point2.y - point1.y) * t;
    return new Vector2(nx, ny);
  }
  /** Get the point vector at a certain angle and distance */
  public static getPointAtAngle(angle: number, distance: number) {
    const angle2 = 180 - 90 - angle;
    const x =
      (distance * Math.sin((angle * Math.PI) / 180)) /
      Math.sin((90 * Math.PI) / 180);
    const y =
      (distance * Math.sin((angle2 * Math.PI) / 180)) /
      Math.sin((90 * Math.PI) / 180);

    return new Vector2(y, x);
  }
  /** Get angle between two points */
  public static getAngle(point1: Vector2, point2: Vector2) {
    return (Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180) / Math.PI;
  }
  /** Get angle between two lines */
  public static getAngleBetweenLines(point1: Vector2, point2: Vector2, point3: Vector2, point4: Vector2) {
    const dAx = point2.x - point1.x;
    const dAy = point2.y - point1.y;
    const dBx = point4.x - point3.x;
    const dBy = point4.y - point3.y;
    const angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
    return  angle * (180 / Math.PI);
  }
  /** Get absolue angle between two lines */
  public static getAbsoluteAngleBetweenLines(point1: Vector2, point2: Vector2, point3: Vector2, point4: Vector2) {
    const dAx = point2.x - point1.x;
    const dAy = point2.y - point1.y;
    const dBx = point4.x - point3.x;
    const dBy = point4.y - point3.y;
    let angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
    if (angle < 0) {
      angle = angle * -1;
    }
    return  angle * (180 / Math.PI);
  }
  /** Get distance between two points */
  public static getDistance(point1: Vector2, point2: Vector2) {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2),
    );
  }
  /** Point of intersection of two lines */
  public static getLinesIntersectionPoint(
    A1: Vector2,
    A2: Vector2,
    B1: Vector2,
    B2: Vector2,
  ): Vector2 {
    /* Get angle between line A and vector (C) from A1 to B1 */
    const aAC = Vector2.getAngleBetweenLines(A1, A2, A1, B1);
    /* Get angle between vector (C) from A1 to B1 and line B */
    const aCB = Vector2.getAngleBetweenLines(B1, A1, B1, B2);
    /* Get C length */
    const lC = Vector2.getDistance(A1, B1);
    /* Get the angle of the intersection point */
    const aAB = 180 - aAC - aCB;
    /* Get ray A and ray B by the solution of the triangle with the known side and two corners */
    const A =
    (lC * Math.sin((aCB * Math.PI) / 180)) /
      Math.sin((aAB * Math.PI) / 180);
    const B = (A * Math.sin((aAC * Math.PI) / 180)) /
      Math.sin((aCB * Math.PI) / 180);
    /* Get length of A and B */
    const lA = Vector2.getDistance(A1, A2);
    const lB = Vector2.getDistance(B1, B2);

    const frec = A / lA;
    const frec2 = B / lB;

    return frec <= 1 && frec >= 0 && frec2 <= 1 && frec2 >= 0
      ? Vector2.interpolatePoints(A1, A2, frec)
      : null;
  }
  /** Point of intersection of two lines */
  public static getRaysIntersectionPoint(
    A1: Vector2,
    A2: Vector2,
    B1: Vector2,
    B2: Vector2,
  ): Vector2 {
    /* Get angle between line A and vector (C) from A1 to B1 */
    const aAC = Vector2.getAngleBetweenLines(A1, A2, A1, B1);
    /* Get angle between vector (C) from A1 to B1 and line B */
    const aCB = Vector2.getAngleBetweenLines(B1, A1, B1, B2);
    /* Get the angle of the intersection point */
    const aAB = 180 - aAC - aCB;
    /* Get C length */
    const lC = Vector2.getDistance(A1, B1);
    /* Get ray A and ray B by the solution of the triangle with the known side and two corners */
    const A =
    (lC * Math.sin((aCB * Math.PI) / 180)) /
      Math.sin((aAB * Math.PI) / 180);
    const lA = Vector2.getDistance(A1, A2);

    return Vector2.interpolatePoints(A1, A2, A / lA);
  }
  public static get zero(): Vector2 {
    return new Vector2(0, 0);
  }
  public static get one(): Vector2 {
    return new Vector2(1, 1);
  }
  public static fromSerialized(data: number[]) {
    return new Vector2(data[0] || 0, data[1] || 0);
  }
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }

  /** Makes this vector have a magnitude of 1 */
  public normalize() {
    const multiply = 1 / Math.max(this.x, this.y);
    return new Vector2(
      this.x * multiply,
      this.y * multiply,
    );
  }

  public serialize() {
    return [this.x, this.y];
  }

  public deserialize(data: number[]) {
    this.x = data[0];
    this.y = data[1];
  }
}
