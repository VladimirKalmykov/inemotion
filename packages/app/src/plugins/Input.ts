import { Plugin, Vector2 } from "@inemotion/core";

export default class Input extends Plugin {
  private state = {
    mouse: {
      buttons: {},
      position: Vector2.zero,
    },
  };

  /** On application start */
  public onStart() {
    this.app.renderer.element.addEventListener("mousedown", this.mouseDownHandler);
    this.app.renderer.element.addEventListener("mouseup", this.mouseUpHandler);
    this.app.renderer.element.addEventListener("mousemove", this.mouseMoveHandler);
  }

  /** Before application will destroy */
  public onDestroy() {
    this.app.renderer.element.removeEventListener("mousedown", this.mouseDownHandler);
    this.app.renderer.element.removeEventListener("mouseup", this.mouseUpHandler);
  }

  /** Get mouse button down state */
  public getMouseButtonDown(button: number) {
    return this.state.mouse.buttons[button] && this.state.mouse.buttons[button].pressed;
  }

  /** Get latest mouse event for specifyc button */
  public geMouseButtonEvent(button: number): MouseEvent {
    return this.state.mouse.buttons[button] && this.state.mouse.buttons[button].nativeEvent;
  }

  /** Get mouse position */
  public getMousePosition() {
    return this.state.mouse.position;
  }

  /** Mouse down handler */
  private mouseDownHandler = (e: MouseEvent) => {
    this.state.mouse.buttons[e.button] = {
      pressed: true,
      nativeEvent: e,
    };
  }

  /** Mouse up handler */
  private mouseUpHandler = (e: MouseEvent) => {
    this.state.mouse.buttons[e.button] = {
      pressed: false,
      nativeEvent: e,
    };
  }

  /** Mouse move handler */
  private mouseMoveHandler = (e: MouseEvent) => {
    this.state.mouse.position = new Vector2(
      e.clientX,
      e.clientY,
    );
  }
}
