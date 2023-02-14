/**
 * Allow to memorize some revertable actions
 */
import { IDisposable } from "./types.d";

export default class Disposables extends Array {
  private groups: {
    [name: string]: Disposables;
  };
  constructor(index: number = 0) {
    super(index);

    this.groups = {};
  }
  public add(disposable: IDisposable) {

    this.push(disposable);

    return () => {
      const index = this.findIndex((item) => item === disposable);

      if (index > -1) {
        this.splice(index, 1);
      }
    };
  }

  /** Dispose specified name or all disposable objects */
  public dispose() {
    /* Dispose groups */
    const groupValues = Object.values(this.groups);
    for (const group of groupValues) {
      group.dispose();
    }

    /* Dispose own disposable */
    for (const disposable of this) {
      if (typeof disposable === "function") {
        disposable();
      } else if (typeof disposable === "object" && typeof disposable.dispose === "function") {
        disposable.dispose(this);
      } else {
        throw new TypeError("Invald disposable object");
      }
    }
  }

  public group(name: string) {
    if (!this.groups[name]) {
      this.groups[name] = new Disposables();
      this.groups[name].add(() => {
        Reflect.deleteProperty(this.groups, name);
      });
    }

    return this.groups[name];
  }
}
