# uselib

JavaScript needs a standard library. We try to provide one that is functional and small.

## Rationale

Wouldn't it be nice if JavaScript has a standard library that is well thoughtout and complete?
You shouldn't need to write your own `leftPad()` function everytime you need it, but you shouldn't need to search for an npm package for each fundamental task you are trying to perform either.

I feel many utilities out there are too specialized, and do not fulfill the role of a standard library.
`uselib` strives to be:
* functional in nature, modeled after Elixir and Clojure
* small in size
* compliant with ES6 modules
* comprehensive

Functional languages like Haskell and Elixir have given much thought to what a good standard library should be like. We strive to port the paradigm to JavaScript.

## Usage

Foolproof way:
```js
const { Enum, List } = require('uselib/require');

// the full power of standard library available to the rest of the code
```

ES6 way, which is much more efficient, but requires webpack tweaking:
```js
import { Enum, List } from 'uselib';

// the full power of standard library available to the rest of the code
```


## Program Size

`uselib` can make your transpiled code smaller:
* We try to be very small in size to begin with
* Using ES6 module allows tree shaking
* Proper webpack/rollup configuration allows `uselib` code to be included only once, even if it is used by many upstream dependencies


## Modules
* Str
* List / Arr
* Obj
* Enum
* Stream

## Under Construction