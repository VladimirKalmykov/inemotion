export default function getInstanceClassStaticProperty(instance: object, propName: string): any {
  return Object.getPrototypeOf(instance).constructor[propName];
}
