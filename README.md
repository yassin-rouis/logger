
![favorite](https://img.shields.io/badge/ROUIS'%20favorite-%E2%AD%90-yellow?style=flat)
![version](https://img.shields.io/badge/version-0.1.1-blue?style=flat)

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
# Coming soon
```
2) Loading and initialization:
```js
const Logger = require("@yassin-rouis/logger");

// These are the default values
Logger.hasIcons = true   // Show UTF-8 icons before time
Logger.colored  = true   // Use colors
```
### Usage

There are 6 levels of loggings :
- Developpement :
  - `verbose`
  - `debug`
  - `log`
- Display :
  - `info`
  - `success`
- Problems and errors :
  - `warn`
  - `error`
  - `fatal`

Each level can be used as follow :
```js
// Logger.<level>("Your", "message", "on", "multiple \n lines")
// example :

Logger.log("We are", 7, "in the room !")
Logger.error("Can't find the eggs !")
```
## Coming soon
- [x] Colorful Logger
- [ ] Logging level
- [ ] NPM package
- [ ] Print to file
- [ ] Print to write stream