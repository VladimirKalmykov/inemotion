import Vector2 from "./Vector2";
import Vector3 from "./Vector3";
import BaseModule from "./BaseModule";
import Serializable from "./Serializable";
import { ITransform2D } from "./types.d";

export default class Transform2D extends Serializable implements ITransform2D {
  public static serializableFields = [
    "position",
  ];
  public parent: any;
  public position: Vector2;
  public scale: Vector2;
  public rotate: Vector3;

  constructor(parent: BaseModule) {
    super();
    this.parent = parent;
    this.position = Vector2.zero;
    this.scale = Vector2.one;
    this.rotate = Vector3.zero;
  }
}
