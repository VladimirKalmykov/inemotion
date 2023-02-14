export interface IType<T> extends Function {
    new (...args: any[]): T;
}
export type FunctionType = (...args: any[]) => void;
export type PlainFunctionType = () => void;
export type AnyClass = new(...args: any[]) => any;
export interface IKeyValueList {
  [key: string]: any;
}
export interface IVector2 extends ISerializable {
  x: number;
  y: number;
  normalize(): IVector2;
}
export interface IVector3 extends ISerializable {
  x: number;
  y: number;
  z: number;
}
export interface IRaycastHint {
  ray: IRay2D;
  distance: number;
  collider: ICollider;
}
export interface ICollider extends IComponent {
  transform: ITransform2D;
  raycast(): void;
  raycast(ray: IRay2D): IRaycastHint;
}
export interface ITransform2D {
  position: IVector2;
  scale: IVector2;
  rotate: IVector3;
}
export interface IRay2D extends ISerializable {
  origin: IVector2;
  direction: IVector2;
  getPoint(distantion: number): IVector2;
}
export interface IVariousConfig {
  [key: string]: any;
}
export type RectSetType = [number, number, number, number];
export interface IDisposableObject {
  dispose: FunctionType;
}
export type IDisposable = PlainFunctionType | IDisposableObject;
export type THook = FunctionType;

export interface IPlugin {
  onUpdate(): void;
  onFixedUpdate(): void;
  onUI(): void;
}

export interface ICanvas2DApi {
  strokeStyle: string;
  beginPath: () => void;
  moveTo: (x: number, y: number) => void;
  lineTo: (x: number, y: number) => void;
  stroke: () => void;
}

export interface ISerializable {
  deserialize(data: object): void;
  serialize(): any;
}

export interface IBaseModule extends ISerializable {
  removeHook(hookType: string, hookToRemove: THook): void;
  addHook(hookType: string, hook: THook): IDisposable;
  triggerHooks(hookType: string, args?: any[]): void;
  registerHookTypes(hookTypes: string[]): void;
  destroy(): void;
}

export interface IGameObject extends IBaseModule {
  name: string;
  transform: ITransform2D;
  scene: IScene;
  updateFrameStamp: number;
  onStart(): void;
  onUpdate(): void;
  onFixedUpdate(): void;
  onUI(): void;
  findComponent(componentClass: IType<IComponent>): IComponent;
}

export interface ICollection<T> extends Array<T> {
  push(...items: T[]): number;
}

export interface IScene extends IBaseModule {
  gameObjects: ICollection<IGameObject>;
  name: string;
  app: IApplication;
  getMainCamera(): ICamera;
  onStart(): void;
  onUpdate(): void;
  onUI(): void;
  onFixedUpdate(): void;
}

export interface IComponent extends IBaseModule {
  gameObject: IGameObject;
  onStart(): void;
  onUpdate(): void;
  onFixedUpdate(): void;
  onUI(): void;
}

export interface ICamera extends IComponent {
  gameObject: IGameObject;
  worldToViewportPoint(point: IVector2): IVector2;
  applyTransform(): void;
  getVectorPerspective(position: IVector2): IVector2;
  viewportPointToRay2D(point: IVector2): IRay2D;
}

export interface IApplication extends IBaseModule {
  renderer: IRenderer;
  activeScene: IScene;
  activeCamera: ICamera;
  findPlugin(PluginClass: any): IPlugin;
}

export interface IApplicationConfig {
  physics?: {
    fixedUpdateTime?: number,
  };
}

export interface IApplicationState {
  canvas: object;
  time: {
    fixedDeltaTime: number,
  };
}

export interface IRenderer extends IBaseModule {
  element: HTMLElement;
  context: CanvasRenderingContext2D;
  onUpdate: (deltaTime: number) => void;
  onUI: (deltaTime: number) => void;
  translate2D(position: IVector2): any;
  cancelTranslate2D(position: IVector2): any;
  transform2D(transform: ITransform2D): any;
  cancelTransform2D(transform: ITransform2D): any;
  getViewportDimension(): IVector2;
  start: () => void;
}

export interface IHTMLCanvas2DRendererConfig {
  maxFps?: number;
  autoSize?: boolean;
}

export interface IFields {
  [key: string]: any;
}

export interface ITime {
  deltaTime: number;
  fixedDeltaTime: number;
}
