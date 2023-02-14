import BaseModule from "./BaseModule";
import { IGameObject, IComponent } from "./types.d";

export default abstract class Component extends BaseModule implements IComponent {
  public gameObject: IGameObject;

  constructor(gameObject: IGameObject) {
    super();
    this.gameObject = gameObject;
  }

  public onStart(): void {
    // Can be implemented in the inheritance class
  }

  public onUpdate(): void {
    // Can be implemented in the inheritance class
  }

  public onFixedUpdate(): void {
    // Can be implemented in the inheritance class
  }

  public onUI(): void {
    // Can be implemented in the inheritance class
  }
}
