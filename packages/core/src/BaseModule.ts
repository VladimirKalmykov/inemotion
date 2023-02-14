import { FunctionType, THook, IDisposable, IBaseModule } from "./types.d";
import Disposables from "./Disposables";
import Serializable from "./Serializable";

export default abstract class BaseModule extends Serializable implements IBaseModule {
  protected disposables: Disposables;
  private hooks: {
    [hookType: string]: THook[];
  };

  constructor() {
    super();
    this.disposables = new Disposables();
    this.hooks = {};

    /* Define hook types */
    const hookTypes = Object.getPrototypeOf(this).constructor.hookTypes || [];
    if (hookTypes.length > 0) {
      this.registerHookTypes(hookTypes);
    }
  }

  public registerHookTypes(hookTypes: string[]) {
    for (const hookName of hookTypes) {
      if (this.hooks[hookName]) {
        throw new Error(`Hook "${hookName}" already exists`);
      }
      this.hooks[hookName] = [];
    }
  }

  public addHook(hookType: string, hook: THook): IDisposable {
    if (!this.hooks[hookType]) {
      throw new TypeError(`Unknown hook type "${hookType}"`);
    }

    this.hooks[hookType].push(hook);

    return () => this.removeHook(hookType, hook);
  }

  public removeHook(hookType: string, hookToRemove: THook) {
    if (!this.hooks[hookType]) {
      throw new TypeError(`Unknown hook type "${hookType}"`);
    }

    const index = this.hooks[hookType].findIndex((hook: FunctionType) => hook === hookToRemove);
    if (index > -1) {
      this.hooks[hookType].splice(index, 1);
    }
  }

  public triggerHooks(hookType: string, args: any[] = []) {
    if (!this.hooks[hookType]) {
      throw new TypeError(`Unknown hook type "${hookType}"`);
    }

    for (const hook of this.hooks[hookType]) {
      Reflect.apply(hook, this, args);
    }
  }

  public destroy() {
    this.disposables.dispose();

    if (typeof this.onDestroy === "function") {
      this.onDestroy();
    }
  }

  protected dispose(): void {
    this.dispose();
  }

  protected onDestroy(): void {}
}
