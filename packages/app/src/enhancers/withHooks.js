export default config => function withHooksEnhancer(obj) {
  obj.hooks = {};
  if (Array.isArray(config)) {
    config.forEach(hookName => obj.hooks[hookName] = []);
  }
  obj.addHook = function addHook(hookType, hook) {
    if (!this.hooks[hookType]) {
      throw new TypeError(`Unknown hook type "${hookType}"`);
    }

    this.hooks[hookType].push(hook);
  }

  obj.removeHook = function removeHook(hookType, hookToRemove) {
    debugger;
    if (!this.hooks[hookType]) {
      throw new TypeError(`Unknown hook type "${hookType}"`);
    }

    const index = this.hooks[hookType].findIndex(hook => hook === hookToRemove);
    if (index > -1) {
      this.hooks[hookType].splice(index, 1);
    }
  }

  obj.runHook = function runHook(hookType, args) {
    if (!this.hooks[hookType]) {
      throw new TypeError(`Unknown hook type "${hookType}"`);
    }

    for (let i = 0; i < this.hooks[hookType].length; i++) {
      Reflect.apply(this.hooks[hookType][i], obj, args || []);
    }
  }
}
