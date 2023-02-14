"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Serializable: true,
  Component: true,
  Plugin: true,
  Collection: true,
  Transform2D: true,
  BaseModule: true,
  Vector2: true,
  Vector3: true,
  Ray2D: true,
  RaycastHit: true
};
Object.defineProperty(exports, "BaseModule", {
  enumerable: true,
  get: function () {
    return _BaseModule.default;
  }
});
Object.defineProperty(exports, "Collection", {
  enumerable: true,
  get: function () {
    return _Collection.default;
  }
});
Object.defineProperty(exports, "Component", {
  enumerable: true,
  get: function () {
    return _Component.default;
  }
});
Object.defineProperty(exports, "Plugin", {
  enumerable: true,
  get: function () {
    return _Plugin.default;
  }
});
Object.defineProperty(exports, "Ray2D", {
  enumerable: true,
  get: function () {
    return _Ray2D.default;
  }
});
Object.defineProperty(exports, "RaycastHit", {
  enumerable: true,
  get: function () {
    return _RaycastHit.default;
  }
});
Object.defineProperty(exports, "Serializable", {
  enumerable: true,
  get: function () {
    return _Serializable.default;
  }
});
Object.defineProperty(exports, "Transform2D", {
  enumerable: true,
  get: function () {
    return _Transform2D.default;
  }
});
Object.defineProperty(exports, "Vector2", {
  enumerable: true,
  get: function () {
    return _Vector.default;
  }
});
Object.defineProperty(exports, "Vector3", {
  enumerable: true,
  get: function () {
    return _Vector2.default;
  }
});
var _Serializable = _interopRequireDefault(require("./Serializable"));
var _Component = _interopRequireDefault(require("./Component"));
var _Plugin = _interopRequireDefault(require("./Plugin"));
var _Collection = _interopRequireDefault(require("./Collection"));
var _Transform2D = _interopRequireDefault(require("./Transform2D"));
var _BaseModule = _interopRequireDefault(require("./BaseModule"));
var _Vector = _interopRequireDefault(require("./Vector2"));
var _Vector2 = _interopRequireDefault(require("./Vector3"));
var _Ray2D = _interopRequireDefault(require("./Ray2D"));
var _RaycastHit = _interopRequireDefault(require("./RaycastHit"));
var _types = require("./types.d");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map