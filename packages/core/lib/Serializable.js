"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _getInstanceClassStaticProperty = _interopRequireDefault(require("./helpers/getInstanceClassStaticProperty"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Serializable {
  deserialize(data) {
    Object.assign(this, data);
  }
  serialize() {
    const serializedData = {};
    const serializableData = (0, _getInstanceClassStaticProperty.default)(this, "serializableFields") || [];
    for (const fieldName of serializableData) {
      serializedData[fieldName] = typeof this[fieldName].serialize === "function" ? this[fieldName].serialize() : this[fieldName];
    }
    return serializedData;
  }
}
exports.default = Serializable;
//# sourceMappingURL=Serializable.js.map