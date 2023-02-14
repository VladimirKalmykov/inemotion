import Collider from "./Collider";
import Input from "../plugins/Input";
import { IGameObject, Component, Vector2, Ray2D } from "@inemotion/core";

export default class Draggable extends Component {
  private _inputPlugin: Input;
  private _collider: Collider;
  constructor(go: IGameObject) {
    super(go);
  }
  public onStart() {
    this._inputPlugin = this.gameObject.scene.app.findPlugin(Input) as Input;

    if (!this._inputPlugin) {
      throw new Error("To use Draggable component the plugin Input should be added to the application");
    }

    this._collider = this.gameObject.findComponent(Collider) as Collider;

    if (!this._collider) {
      throw new Error("To use Draggable component you need to add Collider component to the GameObject");
    }
  }
  public onUpdate() {
    if (this._inputPlugin.getMouseButtonDown(0)) {
      const mousePos: Vector2 = this._inputPlugin.getMousePosition();
      const ray: Ray2D = this.gameObject.scene.app.activeCamera.viewportPointToRay2D(mousePos);
      if (this._collider.raycast(ray)) {
        // Drag!
      }
    }
  }
}
