import React from 'react';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { components, gameObjects } from '@inemotion/app';
import FirstPlay from './scripts/FirstPlay'
import createGame from './createGame';
import createDummyObject from './createDummyObject';
import styles from './styles.module.css';

const arcFigure = radius => (ctx) =>{
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
  ctx.fill();
}

function ToolTip({
  caption,
  children
}) {
  return <div className={styles.ToolTip}>
    <div>{caption}</div>
    <div>{children}</div>
  </div>
}

class VectorController extends React.Component {
  static defaultProps = {
    caption: 'Vector Controller',
    min: 0,
    max: 1,
    fields: ['x', 'y', 'z'],
    step: 0.1
  }
  changeHandler = (name, val) => {
    if (this.state[name] !== val) {
      if (typeof this.props.hook === "function") {
        this.props.hook(name, val);
      }
      this.props.target[name] = val;
      this.setState({
        [name]: val
      })
    }
  }
  constructor(props) {
    super(props);

    this.state = {};

    const {
      target
    } = props;

    this.marks = {
      [this.props.min]: this.props.min,
      [this.props.max]: this.props.max,
    };

    this.targer = target;
  }
  capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  renderField = (name) => {
    return (
      <ToolTip key={name} caption={`${this.capitalize(name)} (${this.props.target[name]})`}>
        <Slider
          min={this.props.min}
          max={this.props.max}
          defaultValue={this.props.target[name]}
          marks={this.marks}
          step={this.props.step}
          onChange={val => this.changeHandler(name, val)}
        />
      </ToolTip>
    )
  }
  renderFields() {
    return this.props.fields.map(this.renderField);
  }
  render() {
    return <ToolTip caption={this.props.caption}>
      {this.renderFields()}
    </ToolTip>
  }
}

function buildSneak(game, length, {
  distance,
  initialRadius,
  radiusFactor
}) {
  let prev;
  for (let i = 1; i <= length; i++) {
    const radius = initialRadius + (radiusFactor * i);
    const part = game.activeScene.addEmptyGameObject(`Sneak #${i}`)
      .setPosition(distance * i, distance * i)
    part.addComponent(components.CanvasRenderer, arcFigure(radius));
    part.addComponent(components.ArcCollider, {
      radius
    });

    if (prev) {
      // Add distance joint
      prev.addComponent(components.DistanceJoint, {
        targetObject: part
      });
      part.addComponent(components.DistanceJoint, {
        targetObject: prev
      });
    }
    prev = part;
  }
}

export default class Entry extends React.Component {
  state = {
    cameraScale: 1,
  }
  refNode = (node) => {
    if (node) {
      this.node = node;
      this.initialGame();
      this.forceUpdate();
    }
  }
  handleChangeCameraScale = (scale) => {
    console.log('scale', scale);
    if (scale === this.state.cameraScale) {
      return;
    }
    this.setState({
      cameraScale: scale,
    });
    this.cameraObject.transform.scale.x = scale;
    this.cameraObject.transform.scale.y = scale;
  }
  initialGame() {
    this.game = createGame();
    const scene = this.game.activeScene;
    this.cameraObject = scene.addGameObject(gameObjects.Camera);
    const dummy1 = createDummyObject(scene);
    const dummy2 = createDummyObject(scene);
    dummy1.transform.position.x = 100;
    dummy2.transform.position.x = -100;

    this.node.appendChild(this.game.renderer.element);
    this.game.start();
  }
  stickToY = (name, value) => {
    this.cameraObject.transform.scale.y = value;
  }
  render() {
    return <div className={styles.App}>
      <div
        className={styles.Screen}
        ref={this.refNode}
      />
      <div className={styles.ToolBar}>
        {this.cameraObject && <div className={styles.Sliders}>
          <VectorController
            fields={['x', 'y']}
            caption="Camera position"
            min={-400}
            max={400}
            target={this.cameraObject.transform.position}
          />
          <VectorController
            fields={['x']}
            hook={this.stickToY}
            caption="Camera scale"
            min={0.1}
            max={5}
            target={this.cameraObject.transform.scale}
          />

        </div>}
      </div>
    </div>
  }
}
