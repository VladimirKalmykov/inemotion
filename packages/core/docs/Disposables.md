class Disposables
==

Allows you to memorize some object, which can be disposed. Disposable object can be a function or an object with public method `dispose()`.

```js
this.disposables = new Disposable();
```

Here's an example of unbinding a few listeners at once.

```js
// Add event listener #1
window.addEventListener('resize', resizeHandler);

// Memorize listener #1 unbind callback
this.disposable.add(() => {
  console.log('Unbind window resize');
  window.removeEventListener('resize', handler)
});

// Add event listener #2
window.addEventListener('scroll', scrollHandler);

// Memorize listener #2 unbind callback
this.disposable.add(() => {
  console.log('Unbind window scroll');
  window.removeEventListener('scroll', scrollHandler)
});

// Invoke each of unbinding callback function by one call
this.disposable.dispose();
// log: Unbind window resize
// log: Unbind window scroll
```

Disposable object
--

You can make you object disposable by adding public method `dispose`.

```js
class MyDisposableObject {
  constructor() {
    window.addEventListener('resize', this.resizeHandler);
  }
  dispose() {
    // Delete some artifacts
    window.removeEventListener('resize', this.resizeHandler);
  }
}
```

```js
this.disposable.add(new MyDisposableObject());
```

Disposable groups
--

You can add named group for reasons of combining certain disposable objects.

Disposing of the group won't dispose of main disposable collection.

```js
this.disposable.add(() => { console.log('Dispose #1'); });
this.disposable.group('listeners').add(() => { console.log('Dispose #2'); });
this.disposable.group('listeners').add(() => { console.log('Dispose #3'); });
this.disposable.group('listeners').dispose();
// log: Dispose #2
// log: Dispose #3
this.disposable.dispose();
// log: Dispose #1
```

Disposing of the main disposable collection will dispose of all groups of it.

```js
this.disposable.add(() => { console.log('Dispose #1'); });
this.disposable.group('listeners').add(() => { console.log('Dispose #2'); });
this.disposable.group('listeners').add(() => { console.log('Dispose #3'); });
this.disposable.dispose();
// log: Dispose #1
// log: Dispose #2
// log: Dispose #3
```
