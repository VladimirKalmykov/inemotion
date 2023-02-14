"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class Collection extends Array {
  constructor(items = []) {
    super(0);
    if (!Array.isArray(items)) {
      throw new Error("Invalid Collection data");
    }
    for (const item of items) {
      this.push(item);
    }
  }
  push(...items) {
    return super.push(...items);
  }
}
exports.default = Collection;
//# sourceMappingURL=Collection.js.map