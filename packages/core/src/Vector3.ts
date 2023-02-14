import Serializable from "./Serializable";

export default class Vector3 extends Serializable {
  public static get zero(): Vector3 {
    return new Vector3(0, 0, 0);
  }
  public static get one(): Vector3 {
    return new Vector3(1, 1, 1);
  }
  public static fromSerialized(data: number[]) {
    return new Vector3(data[0] || 0, data[1] || 0, data[2] || 0);
  }
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number, y: number, z: number) {
    super();
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public serialize() {
    return [this.x, this.y, this.z];
  }

  public deserialize(data: number[]) {
    this.x = data[0];
    this.y = data[1];
    this.z = data[2];
  }
}
