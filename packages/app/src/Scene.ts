import {
  BaseModule,
  Collection,
  IApplication,
  IType,
  IScene,
} from "@inemotion/core";
import GameObject from "./GameObject";
import Camera from "./components/Camera";

export default class Scene extends BaseModule implements IScene {
  public static serializableFields = ["gameObjects"];
  public gameObjects: Collection<GameObject>;
  public name: string;
  public app: IApplication;
  public constructor() {
    super();
    this.gameObjects = new Collection<GameObject>();
  }

  public onUpdate() {
    for (const gameObject of this.gameObjects) {
      gameObject.onUpdate();
    }
  }

  public onUI() {
    for (const gameObject of this.gameObjects) {
      gameObject.onUI();
    }
  }

  public onFixedUpdate() {
    for (const gameObject of this.gameObjects) {
      gameObject.onFixedUpdate();
    }
  }

  /** Create new GameObject */
  public addEmptyGameObject(name: string): GameObject {
    const go = new GameObject(this);
    if (name) {
      go.name = name;
    }

    return this.addGameObject(go);
  }

  /** Add GameObject to the scene */
  public addGameObject(gameObject: GameObject | IType<GameObject>): GameObject {
    const go = typeof gameObject === "function"
      ? new gameObject(this)
      : gameObject;
    go.scene = this;
    this.gameObjects.push(go);

    return go;
  }

  /** Get scene main or single camera */
  public getMainCamera(): Camera {
    const foundedCameras = [];
    console.log('gameObjects', this.gameObjects);
    for (const go of this.gameObjects) {
      const camera = go.getComponent(Camera);

      if (camera) {
        if (go.name === "MainCamera") {
          return camera;
        }
        foundedCameras.push(camera);
      }
    }

    if (foundedCameras.length > 0) {
      return foundedCameras[0];
    }

    return null;
  }

  /** Triggered on game start */
  public onStart() {
    for (const gameObject of this.gameObjects) {
      gameObject.onStart();
    }
  }
}
