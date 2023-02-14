class BaseModule
==

Provides an extension of the base Javascript class with the minimal lifecycle methods, events, serialization and observable fields.

Properties
--

### disposables

protected **disposables**: `IDisposable[]`

Instance of the [Disposables](./Disposable) class. Use this collection to keep functions and special `TDisposable` objects, that will be disposed along with the object.

Abstract methods
--

### initialize

protected **initialize**`(...args: any[]): void`

The method will be called immediately after BaseModule constructor, but before the observer will start. The method accepts all original constructor arguments and may be used instead of the constructor.

```js
protected initialize(x, y) {
  this.x = x;
  this.y = y;
}
```

In the case of deal with observable properties `initialize` may be used to ensure that all arguments did map to instance object properties before they actually will start observed.

The next example does expose the problem with observing uninitialized object properties.

```js
constructor(x, y) {
  super();

  this.x = x; // Will invoke observer('x', x) when this.y is still undefined;
  this.y = y;

  this.getXYSum = () => {
    this.sum = this.x + this.y;
  }
}

observer() {
  return this.getXYSum;
}

/*** The first value of this.sum will be NaN, because
 * the `observer` will be invoked for x when this.y
 * is still been undefined. ***/
```

### observer

protected **observer`(fieldName: string, fieldValue: any)`**: `TFunction | undefined`

The instance method accepts the name and the new value of a changing field.

```js
observer(fieldName, fieldValue) {
  console.log(`Field ${fieldName} will change`);
  console.log('Current value:', this[fieldName]);
  console.log('Next value:', fieldValue);
}
```

Keep in the mind that only fields described in static property [observableFields](#observableFields) will occur in this method.

The method `observer` will be called before the field is actually changed. If you'd like to handle changes after field value did apply, you may return a function as the result of the `observer` method.

```js
observer(fieldName, fieldValue) {
  console.log(`Field ${fieldName} will change`);
  return () => {
    console.log(`Field ${fieldName} did change`);
    this[fieldName] === fieldValue; // true
  }
}
```

Public methods
--

### addHook

public **addHook**`(hookType: string, hook: THook): IDisposable`

Add new hook of specified type.

```js
function handler() {
  // Before update
}
const removeHook = instance.addHook('before_update', handler);
```

Returns remove hook callback;

```js
// No need hook anymore
removeHook();
```

### removeHook

public **removeHook**`(hookType: string, hook: THook)`

Remove hook by its type and the function, which have been specified when hook was added.

```js
instance.removeHook(`before_update`, handler);
```

Protected methods
--

### registerHookTypes

protected **rigesterHookTypes**`(hookTypes: string[])`

Register allowed hook types for this module.

```js
this.registeHookTypes(['before_update', 'after_update']);
```

Only registered hook types will be available for add and trigger.

### triggerHooks

protected **triggerHooks**`(hookType: string, args: any[])`

Call all hooks of a type with specified arguments.

Static properties
--

### hookTypes

**hookTypes**: string[]

An array of hook types, that allowed to use with this instance;

```js
protected hookTypes = ['before_update', 'after_update'];
```

### serializableFields

**serializableFields**: `string[]` A collection of field names to be stringified with JSON when called _toString_ method.

```js
class Point extends AppModule {
  static serializableFields = ['x', 'y'];
  constructor(x, y, z) {
    super();
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

new Size(10, 15, 20).toString(); // {x: 10, y: 15}
```

### observableFields

**observableFields**: `string[]` A collection of field names whose changes can be intercepted.

```js
class LineFigure extends AppModule {
  static observableFields = [`x1`, 'y1', 'x2', 'y2'];
  constructor(x1, y1, x2, y2) {
    super();
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.calcDistance();
  }

  observer() {
    return () => this.calcDistance();
  }

  calcDistance() {
    const {x1, y1, x2, y2} = this;
    this.distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }
}

const line = new LineFigure(10, 15, 30, 35);
console.log(line.distance); // 28.284271247461902
line.x1 = 15;
console.log(line.distance); // 25
```
