import { IType, Component, IGameObject } from "@inemotion/core";

export default class Script extends Component {
  public static serialazibleFields: string[] = [
    "script",
  ];
  public script: IType<Component>;
  private instance: Component;
  constructor(gameObject: IGameObject, {
    script,
  }) {
    super(gameObject);
    this.script = script;
    this.instance = new script(gameObject);
  }

  public onUpdate() {
    this.instance.onUpdate();
  }

  public onFixedUpdate() {
    this.instance.onFixedUpdate();
  }
}
