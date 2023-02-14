import { Component, IGameObject } from "@inemotion/core";

const DEFAULT_RENDERER = () => {};

export default class CanvasRenderer extends Component {
  private renderer: (ctx: CanvasRenderingContext2D) => void;
  constructor(gameObject: IGameObject, config: {
    renderer: (ctx: CanvasRenderingContext2D) => void,
  }) {
    super(gameObject);
    this.renderer = config.renderer || DEFAULT_RENDERER;
  }

  public update() {
    this.renderer(this.gameObject.scene.app.renderer.context);
  }
}
