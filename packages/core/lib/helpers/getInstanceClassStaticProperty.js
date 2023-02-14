"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getInstanceClassStaticProperty;
function getInstanceClassStaticProperty(instance, propName) {
  return Object.getPrototypeOf(instance).constructor[propName];
}
//# sourceMappingURL=getInstanceClassStaticProperty.js.map