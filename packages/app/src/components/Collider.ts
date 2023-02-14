import {
  Component,
  Transform2D,
  Vector2,
  IGameObject,
} from "@inemotion/core";

export default class Collider extends Component {
  public transform: Transform2D;
  constructor(gameObject: IGameObject) {
    super(gameObject);

    this.transform = new Transform2D(this);
  }

  /** Get rect of the collider's edges  */
  public getBoundingRect(): Vector2[] {
    return [
      Vector2.zero,
      Vector2.zero,
    ];
  }

  /** Is ray hits this collider */
  public raycast(): void {}
}
