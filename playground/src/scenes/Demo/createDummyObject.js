import { components } from '@inemotion/app';
import FirstPlay from './scripts/FirstPlay';

export default function createDummyObject(scene) {
  const gameObject = scene.addEmptyGameObject('Tester');
  gameObject.addComponent(components.Script, {
    script: FirstPlay
  });
  gameObject.addComponent(components.CircleCollider, {
    radius: 20
  });

  gameObject.addComponent(components.Draggable, {});

  return gameObject;
}
