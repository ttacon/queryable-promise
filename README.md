# queryable-promise

A utility library for inspecting promises during development.

## Installation

```sh
npm i queryable-promise
```

## Usage

```js
const queryable = require('queryable-promise');

const val = queryable(superFunPromiseFunction(val));
await val;

console.log(val.isResolved()); // `true`
console.log(val.val()); // whatever the resolved value is.
```