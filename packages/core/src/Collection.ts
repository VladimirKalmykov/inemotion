export default class Collection<T> extends Array {
  constructor(items = []) {
    super(0);

    if (!Array.isArray(items)) {
      throw new Error("Invalid Collection data");
    }

    for (const item of items) {
      this.push(item);
    }
  }

  public push(...items: T[]): number {
    return super.push(...items);
  }
}
