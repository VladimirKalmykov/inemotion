import App, { plugins } from '@inemotion/app';

export default function createGame() {
  const game = new App();
  game.addPlugin(plugins.ShowGameObjectCenter);
  game.addPlugin(plugins.ShowColliders);
  game.addPlugin(plugins.Input);
  return game;
}
