
![favorite](https://img.shields.io/badge/ROUIS'%20favorite-%E2%AD%90-yellow?style=flat)
![version](https://img.shields.io/badge/version-1.0.1-blue?style=flat)

# Logger

## Table of contents
* [Introduction](#introduction)
* [Documentation](#documentation)
  * [Install](#install)
  * [Usage](#usage)
* [Coming soon](#coming-soon)
## Introduction
`logger` is a colorful logger for organizing your messages, and easily returning to them !

![Imgur](https://i.imgur.com/sNYYaJR.png)
## Documentation

### Install
1) Download from NPM :
```bash
npm i @yassinrouis/logger
```
2) Loading and initialization:
```js
const Logger = require("@yassin-rouis/logger");

let log = new Logger(); // Simple constructor

// or
let log = new Logger({
  level: Logger.DEBUG, // Change the logging level
  clear: true          // Clear the console when an instance is created
})
```
### Usage

There are 6 levels of loggings :
- Developpement :
  - `verbose` (10)
  - `debug` (20)
  - `log` (30)
- Display :
  - `info` (40)
  - `success` (35)
- Problems and errors :
  - `warn` (50)
  - `error` (60)
  - `fatal` (70)

Each level can be used as follows :
```js
// log.<level>("Your", "message", "on", "multiple \n lines")
// example :

log.log("We are", 7, "in the room !")
log.error("Can't find the eggs !")
```
### Methods
`<Logger>` is any instance of `Logger`.
#### Logging methods
* `<Logger>.verbose(...<objects or string>)`
* `<Logger>.debug(...<objects or string>)`
* `<Logger>.log(...<objects or string>)`
* `<Logger>.info(...<objects or string>)`
* `<Logger>.success(...<objects or string>)`
* `<Logger>.warn(...<objects or string>)`
* `<Logger>.error(...<objects or string>)`
* `<Logger>.fatal(...<objects or string>)`
* `<Logger>.clear()`
  
  Clear node's console (print \\x1Bc)
#### Settings
* `<Logger>.setLevel(<level | int>)`

  Set logging level. Can be a level like ... :
  
  `Logger.VERBOSE, Logger.DEBUG, Logger.LOG, etc ...`
* `<Logger>.getLevel() : int`

## Coming soon
- [x] Colorful Logger
- [x] Logging level
- [x] Objects logging
- [x] NPM package
- [ ] Print to file
- [ ] Print to write stream