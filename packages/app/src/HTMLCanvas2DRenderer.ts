import { BaseModule, IHTMLCanvas2DRendererConfig, Vector2, Transform2D } from "@inemotion/core";

const defaultOnUpdate = () => {};

/** Sealed HTML Canvas 2D Renderer */
export default class HTMLCanvas2DRenderer extends BaseModule {
  protected static serializableFields: string[] = ["autoSize", "maxFps"];

  /** Automatically fit to the container */
  private _autoSize: boolean = false;
  public get autoSize(): boolean {
    return this._autoSize;
  }
  public set autoSize(value: boolean) {
    this._autoSize = value;
    this.applyAutoSize();
  }
  /** Limit max frame per second */
  private _maxFps: number = 60;
  public get maxFps(): number {
    return this._maxFps;
  }
  public set maxFps(value: number) {
    this._maxFps = value;
    this.applyMaxFps();
  }
  /** fn called each time canvas update */
  public onUpdate: (deltaTime: number) => void = defaultOnUpdate;
  public onUI: (deltaTime: number) => void = defaultOnUpdate;
  public element: HTMLCanvasElement;
  /** Ms since last frame */
  public deltaTime: number = 0;
  /** Canvas rendering context */
  public context: CanvasRenderingContext2D;
  /** Canvas width and height */
  private _dimension: Vector2;
  /** Readonly canvas width and height */
  public get dimension(): Vector2 {
    return this._dimension;
  }
  /** Ms per frame. This value will automatically calculated from settings.fps */
  private maxFrameSize: number = 0;
  /** Last frame time stamp */
  private lastFrameTimeStamp: number = 0;
  /* How much time is in excess relative to the default frame size */
  private prevFrameOverlap: number = 0;
  /** Reference to canvas rendering context */
  private animationFrameRequestId: number;

  public constructor({
    autoSize = true,
    maxFps = 90,
  }: IHTMLCanvas2DRendererConfig) {
    super();

    /* Define canvas html element */
    this.element = document.createElement("canvas");
    /* Refers to canvas rendering context */
    this.context = this.element.getContext("2d");

    /* Specify initial state */
    this.deltaTime = 0;

    /* Clean up at the end */
    this.disposables.add(() => {
      this.element = null;
      this.context = null;
      cancelAnimationFrame(this.animationFrameRequestId);
    });

    this.autoSize = autoSize;
    this.maxFps = maxFps;

    this.fitCanvasDimensionToElement();

    /* Listen for window events */
    window.addEventListener("resize", this.fitCanvasDimensionToElement);
    this.disposables.add(() => {
      window.removeEventListener("resize", this.fitCanvasDimensionToElement);
    });
  }

  private fitCanvasDimensionToElement = () => {
    this.element.width  = this.element.offsetWidth;
    this.element.height = this.element.offsetHeight;
    this._dimension = new Vector2(
      this.element.offsetWidth,
      this.element.offsetHeight,
    );
  }

  /** Start rendering */
  public start() {
    this.renderFrame();
  }

  public getViewportDimension() {
    return this.dimension;
  }

  /** Multiplies the current 2Dtransformation */
  public translate2D(position: Vector2) {
    this.context.translate(
      position.x,
      position.y,
    );
  }

  /** Multiplies the current 2Dtransformation */
  public cancelTranslate2D(position: Vector2) {
    this.context.translate(
      position.x * -1,
      position.y * -1,
    );
  }

  /** Multiplies the current 2Dtransformation */
  public transform2D(transform: Transform2D) {
    this.context.transform(
      transform.scale.x,
      0,
      0,
      transform.scale.y,
      transform.position.x,
      transform.position.y,
    );

    this.context.rotate(transform.rotate.z);
  }

  /** Flipped multiplies the current 2Dtransformation */
  public cancelTransform2D(transform: Transform2D) {
    this.context.transform(
      transform.scale.x * -1,
      0,
      0,
      transform.scale.y * -1,
      transform.position.x * -1,
      transform.position.y * -1,
    );

    this.context.rotate(transform.rotate.z);
  }

  /** Reset transformation for the scene rending */
  private resetTransformationForCamera() {
    this.context.setTransform(
      1,
      0,
      0,
      1,
      this.element.offsetWidth / 2,
      this.element.offsetHeight / 2,
    );
    this.context.rotate(0);
  }

  /** Reset transformation for an UI rendering */
  private resetTranformationForUI() {
    this.context.setTransform(
      1,
      0,
      0,
      1,
      0,
      0,
    );
    this.context.rotate(0);
  }

  /** Apply autoSize setting */
  private applyAutoSize = () => {
    if (this.autoSize) {
      this.element.style.width = "100%";
      this.element.style.height = "100%";

      // Refresh canvas dimension and axis center
      setTimeout(this.fitCanvasDimensionToElement);
    }
  }

  /** Apply autoSize setting */
  private applyMaxFps = () => {
    this.maxFrameSize = 1000 / this.maxFps;
  }

  /** Will be called each animation frame */
  private renderFrame = () => {
    /* Cancel rendering if renderer destroyed */
    if (!this.context) {
      return;
    }

    this.deltaTime = (Number(new Date()) - this.lastFrameTimeStamp) + this.prevFrameOverlap;

    if (this.deltaTime >= this.maxFrameSize) {
      this.prevFrameOverlap = this.deltaTime - this.maxFrameSize;

      if (this.prevFrameOverlap > this.maxFrameSize) {
        // Multiple overlap
        this.prevFrameOverlap = 0;
      }

      // Clear all before update
      this.clear();

      // Set canvas context axis for scene rendering
      this.resetTransformationForCamera();
      this.onUpdate(this.deltaTime);

      // Set canvas context axis for UI rendering
      this.resetTranformationForUI();
      this.onUI(this.deltaTime);
      this.renderFps();

      this.lastFrameTimeStamp = Number(new Date());
      this.deltaTime = 0;
    }
    this.animationFrameRequestId = requestAnimationFrame(this.renderFrame);
  }

  private clear() {
    this.context.clearRect(0, 0, this.element.width, this.element.height);
  }

  private renderFps() {
    // Memoize fill style
    const backupStyle = this.context.fillStyle;
    const fpsText = `FPS: ${Math.round(1000 / (this.deltaTime || 1))}`;
    this.context.font = "14px Tahoma";
    this.context.fillStyle = "white";
    this.context.fillText(fpsText, 9, 11);
    this.context.fillStyle = "black";
    this.context.fillText(fpsText, 10, 10);
    // Repair fill style
    this.context.fillStyle = backupStyle;
  }
}
