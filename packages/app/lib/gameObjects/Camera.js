"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _GameObject = _interopRequireDefault(require("../GameObject"));
var _Camera = _interopRequireDefault(require("../components/Camera"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GameObjectCamera extends _GameObject.default {
  constructor(scene) {
    super(scene);
    this.name = "MainCamera";
    this.addComponent(_Camera.default);
  }
}
exports.default = GameObjectCamera;
//# sourceMappingURL=Camera.js.map