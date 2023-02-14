import { BaseModule } from "@inemotion/core";

export default class Physics extends BaseModule {
  public static serializableFields = [
    "fixedUpdateTime",
  ];

  private _fixedUpdateTime: number = 30;
  /** Fixed update timestamp */
  public get fixedUpdateTime() {
    return this._fixedUpdateTime;
  }
  public set fixedUpdateTime(value: number) {
    this._fixedUpdateTime = value;
    this.onFixedUpdateTimeDidChange();
  }

  /* Timestamp between updates */
  private _deltaTime: number = 0;
  /* Readonly timestamp between updates */
  public get deltaTime() {
    return this._deltaTime;
  }

  /** */
  private _updateTimerId: any = null;
  private _lastUpdateTimestamp: number;
  constructor({
    fixedUpdateTime = 20,
  }) {
    super();
    this.fixedUpdateTime = fixedUpdateTime;
  }

  /** Start physics */
  public start() {
    if (typeof this.onUpdate !== "function") {
      throw new Error("onUpdate should be spcified");
    }
    this.runUpdate();
  }

  /** Start update */
  private runUpdate() {
    this._updateTimerId = setInterval(this._onUpdate, this.fixedUpdateTime);
  }

  /** Internal update handler */
  private _onUpdate = () => {
    this._deltaTime = new Date().getTime() - this._lastUpdateTimestamp;
    this.onUpdate();
  }

  /** Will be called each update */
  public onUpdate() {
    throw new Error("onUpdate handler should be monkeypatched by the application");
  }

  /** Handle user did change fixedUpdateTime */
  private onFixedUpdateTimeDidChange() {
    if (this._updateTimerId) {
      clearInterval(this._updateTimerId);
      this.runUpdate();
    }
  }
}
