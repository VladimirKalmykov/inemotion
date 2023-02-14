import getInstanceClassStaticProperty from "./helpers/getInstanceClassStaticProperty";
import { ISerializable } from "./types.d";

export default abstract class Serializable implements ISerializable {
  public deserialize(data: object): void {
    Object.assign(
      this,
      data,
    );
  }
  public serialize(): any {
    const serializedData = {};
    const serializableData = getInstanceClassStaticProperty(this, "serializableFields") || [];

    for (const fieldName of serializableData) {
      serializedData[fieldName] = typeof this[fieldName].serialize === "function"
        ? this[fieldName].serialize()
        : this[fieldName];
    }

    return serializedData;
  }
}
