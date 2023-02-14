import {
  IType,
  BaseModule,
  Collection,
  Plugin,
  IRenderer,
  IScene,
  IApplication,
  ITime,
  ICamera,
} from "@inemotion/core";
import HTMLCanvas2DRenderer from "./HTMLCanvas2DRenderer";
import Scene from "./Scene";
import Physics from "./modules/Physics";

export default class Application extends BaseModule implements IApplication {
  public static serialazableFields = [
    "renderer",
    "plugins",
    "scenes",
    "startSceneIndex",
  ];
  public static hookTypes = [
    "set-active-scene",
    "change-active-scene",
  ];
  /** Reference to the application HTML DOM element */
  public element: HTMLElement;
  /** Collection of plugins */
  public plugins: Collection<Plugin>;
  /** Collection of scenes */
  public scenes: Collection<Scene>;
  /** Current renderer */
  public renderer: IRenderer;
  /** Index of scene, that will be used as game entry */
  public startSceneId: number;
  /** Time represents rendering time stats */
  public time: ITime;
  /** Reference to the active scene */
  private _activeCamera: ICamera;
  public get activeCamera(): ICamera {
    if (!this._activeCamera) {
      if (this._activeScene) {
        this._activeCamera = this._activeScene.getMainCamera();
      }
    }
    return this._activeCamera;
  }
  public set activeCamera(value: ICamera) {
    this._activeCamera = value;
  }
  private physics: Physics;
  private _activeScene: IScene;

  public constructor({
    renderer = {},
    plugins: userPlugins = [],
    scenes = [],
    startSceneId = 0,
    physics = {},
  } = {}) {
    super();

    this.plugins = new Collection<Plugin>(userPlugins);

    this.scenes = new Collection<Scene>(scenes.map(() => new Scene()));

    this.physics = new Physics(physics);

    /** Define physics update handler */
    this.physics.onUpdate = () => {
      this.activeScene.onFixedUpdate();

      for (const plugin of this.plugins) {
        plugin.onFixedUpdate();
      }
    };

    /* Represents time stats */
    this.time = {
      get deltaTime(): number {
        return this.renderer.deltaTime;
      },
      get fixedDeltaTime(): number {
        return this.physics.deltaTime;
      },
    };

    /* Unsure the scenes contains at least one scene */
    if (this.scenes.length === 0) {
      this.scenes.push(new Scene());
    }

    /* Default renderer */
    this.renderer = new HTMLCanvas2DRenderer(renderer);

    /** Define renderer update handler */
    this.renderer.onUpdate = () => {
      this.activeCamera.applyTransform();
      this.activeScene.onUpdate();

      for (const plugin of this.plugins) {
        plugin.onUpdate();
      }
    };

    this.renderer.onUI = () => {
       this.activeScene.onUI();

       for (const plugin of this.plugins) {
         plugin.onUI();
       }
    };

    /* Ensure that start scene index or name is real */
    let startScene: Scene = typeof startSceneId === "string"
      ? this.getSceneByName(startSceneId)
      : this.getSceneByIndex(startSceneId);

    if (!startScene) {
      startScene = this.scenes[0];
    }

    /* Set active scene by the default */
    this.activeScene = startScene;
  }

  get activeScene() {
    return this._activeScene;
  }

  set activeScene(nextActiveScene: IScene) {
    /* Reset active camera */
    this.activeCamera = null;
    // Handle nextActiveScene as number
    if (!this.scenes.includes(nextActiveScene)) {
      throw new Error("Active scene should be in application scenes");
    }
    const scene = nextActiveScene;

    if (!this._activeScene) {
      this.triggerHooks("set-active-scene", [scene]);
    } else {
      this.triggerHooks("change-active-scene", [scene]);
    }

    this._activeScene = scene;

    // scene
    scene.app = this;

    // Set activeCamers
    this.activeCamera = scene.getMainCamera();
  }

  /** Add plugin to an application */
  public addPlugin(PluginClass: IType<Plugin>, config: any) {
    const plugin = new PluginClass(this, config);
    this.plugins.push(plugin);
    return plugin;
  }

  /** Remove plugin from an application */
  public removePlugin(pluginToRemove: Plugin) {
    const index = this.plugins.findIndex((plugin) => plugin === pluginToRemove);
    if (index > -1) {
      pluginToRemove.destroy();
      this.plugins.splice(index, 1);
    }
  }

  /** Find plugin by its class */
  public findPlugin(PluginClass: any): Plugin {
    return this.plugins.find((plugin) => plugin instanceof PluginClass);
  }

  /** Get scene by index */
  public getSceneByIndex(index: number) {
    return this.scenes[index];
  }

  /** Get scene by name */
  public getSceneByName(name: string) {
    return this.scenes.find((scene: Scene) => scene.name === name);
  }

  /** Start game rendering and physics */
  public start() {
    /* Start active scene */
    this.activeScene.onStart();

    /* Start each plugin */
    for (const plugin of this.plugins) {
      plugin.onStart();
    }
    /* Start fixed updates */
    this.physics.start();
    this.renderer.start();
  }

 //
 //  findObjectsAtPosition(x, y) {
 //    let results = [];
 //    const axis = this.getCanvasAxis();
 //    for (let i = 0; i < this.gameObjects.length; i++) {
 //      const collider = this.gameObjects[i].getComponent(components.Collider);
 //      if (collider) {
 //        const objectStartX = axis.x + this.gameObjects[i].transform.position.x;
 //        const objectStartY = axis.y + this.gameObjects[i].transform.position.y;
 //        const colliderRect = collider.getRelativePositionRect();
 //        if (
 //          (colliderRect[0] + axis.x) < x
 //          && (colliderRect[1] + axis.y) < y
 //          && (colliderRect[2] + axis.x) > x
 //          && ((colliderRect[3] + axis.y)) > y
 //        ) {
 //          results.push(this.gameObjects[i]);
 //        }
 //      }
 //    }
 //
 //    return results;
 //  }
 //
 //  /**
 //   * Handle Canvas start rendering
 //   **/
 //  canvasReadyHandler = (ctx, {
 //    canvas
 //  }) => {
 //    canvas.addEventListener("mousedown", this.handleMouseDown);
 //    this.canvas = canvas;
 //  }
 //
 //  /* Handle canvas render update */
 //  canvasUpdateHandler = (ctx, renderer) => {
 //    // Reset axis
 //    ctx.translate(this.config.canvas.axis.x, this.config.canvas.axis.y);
 //    this.runHook("before-update", [ctx])
 //    for (let i = 0; i < this.gameObjects.length; i++) {
 //      this.gameObjects[i].render(ctx, this);
 //    }
 //    this.runHook("after-update", [ctx])
 //
 //    this.fixedDeltaTime += renderer.deltaTime;
 //    if (this.fixedDeltaTime >= (1000 / this.config.physic.ups)) {
 //      for (let i = 0; i < this.gameObjects.length; i++) {
 //        this.gameObjects[i].fixedUpdate();
 //      }
 //      this.runHook("fixed-update", [this.fixedDeltaTime])
 //      this.fixedDeltaTime = 0;
 //    }
 //  }
 //
 //  /**
 //   * Handle Canvas destroy
 //   **/
 //  canvasDestroyHandler = ({
 //    canvas
 //  }) => {
 //    canvas.removeEventListener("mousedown", this.handleMouseDown);
 //  }
 //
 //  /**
 //   * Input
 //   **/
 // handleMouseDown = e => {
 //   const clickedAt = this.findObjectsAtPosition(e.clientX, e.clientY);
 //   this.previousMousePageX = e.clientX;
 //   this.previousMousePageY = e.clientY;
 //   if (clickedAt.length > 0) {
 //     this.touchedObject = clickedAt[0];
 //   }
 //   window.addEventListener("mouseup", this.handleMouseUp);
 //   this.canvas.addEventListener("mousemove", this.handleMouseMove);
 // }
 // handleMouseMove = e => {
 //   const deltaX = e.clientX - this.previousMousePageX;
 //   const deltaY = e.clientY - this.previousMousePageY;
 //   this.previousMousePageX = e.clientX;
 //   this.previousMousePageY = e.clientY;
 //
 //   if (this.touchedObject) {
 //     this.touchedObject.transform.position.x += deltaX;
 //     this.touchedObject.transform.position.y += deltaY;
 //     this.touchedObject.runHook("updated");
 //   }
 // }
 // handleMouseUp = () => {
 //   window.removeEventListener("mouseup", this.handleMouseUp);
 //   this.canvas.removeEventListener("mousemove", this.handleMouseMove);
 //   if (this.touchedObject) {
 //     this.touchedObject = null;
 //   }
 // }
}
