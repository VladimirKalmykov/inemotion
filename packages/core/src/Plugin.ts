import { IApplication } from "./types.d";
import BaseModule from "./BaseModule";

/** Application plugin extends application functionality in the runtime */
export default abstract class Plugin extends BaseModule {
  public app: IApplication;
  public config: object;

  constructor(app: IApplication, config: any) {
    super();
    this.app = app;
    this.config = config;
  }

  public onStart(): void {
    // This may be implemented
  }

  public onUpdate(): void {
    // This may be implemented
  }

  public onFixedUpdate(): void {
    // This may be implemented
  }

  public onUI(): void {
    // This may be implemented
  }
}
