import GameObject from "../GameObject";
import Camera from "../components/Camera";

export default class GameObjectCamera extends GameObject {
  constructor(scene: any) {
    super(scene);
    this.name = "MainCamera";
    this.addComponent(Camera);
  }
}
