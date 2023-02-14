import {
  Component,
  BaseModule,
  AnyClass,
  Transform2D,
  Collection,
  IScene,
} from "@inemotion/core";

export default class GameObject extends BaseModule {
  public static serializableFields = [
    "name",
    "transform",
    "components",
  ];
  public static hookTypes = [
    "render",
    "fixed-update",
    "updated",
  ];
  public name: string;
  public updateFrameStamp: number = 0;
  public transform: Transform2D = new Transform2D(this);
  public scene: IScene;
  protected components: Collection<Component> = new Collection<Component>();
  constructor(scene: IScene) {
    super();
    if (!scene) {
      throw new Error("You must specify scene for the instance of GameObject");
    }

    this.scene = scene;
  }

  public findComponent(ComponentClass: AnyClass): Component {
    return this.components.find((component) => component instanceof ComponentClass);
  }

  public setPosition(x: number, y: number): void {
    this.transform.position.x = x;
    this.transform.position.y = y;
  }

  public addComponent(ComponentClass: AnyClass, config?: any): Component {
    const component = new ComponentClass(this, config);
    this.components.push(component);
    return component;
  }

  public getComponent(ComponentClass: AnyClass): Component {
    return this.components.find(component => component instanceof ComponentClass);
  }

  public removeComponent(componentToRemove: Component): void {
    const index = this.components.findIndex((component) => component === componentToRemove);
    if (index > -1) {
      componentToRemove.destroy();
      this.components.splice(index, 1);
    }
  }

  public onStart(): void {
    for (const component of this.components) {
      component.onStart();
    }
  }

  public onFixedUpdate(): void {
    for (const component of this.components) {
      component.onFixedUpdate();
    }

    this.updateFrameStamp++;
  }

  public onUpdate() {
    /* Change rendering context axis position to this object prosition */
    this.scene.app.renderer.translate2D(this.transform.position);

    for (const component of this.components) {
      component.onUpdate();
    }

    // Restore axis
    this.scene.app.renderer.cancelTranslate2D(this.transform.position);
  }

  public onUI() {
    for (const component of this.components) {
      component.onUI();
    }
  }
}
