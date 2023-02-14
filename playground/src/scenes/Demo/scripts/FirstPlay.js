import { Component } from "@inemotion/core";

export default class FirstPlay extends Component {
  onUpdate() {
    const ctx = this.gameObject.scene.app.renderer.context;
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}
