pear
====

Credit where credit is due.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/pear.svg)](https://npmjs.org/package/pear)
[![CircleCI](https://circleci.com/gh/jonallured/pear/tree/master.svg?style=shield)](https://circleci.com/gh/jonallured/pear/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/pear.svg)](https://npmjs.org/package/pear)
[![License](https://img.shields.io/npm/l/pear.svg)](https://github.com/jonallured/pear/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g pear
$ pear COMMAND
running command...
$ pear (-v|--version|version)
pear/0.0.0 darwin-x64 node-v8.1.4
$ pear --help [COMMAND]
USAGE
  $ pear COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pear hello [FILE]`](#pear-hello-file)
* [`pear help [COMMAND]`](#pear-help-command)

## `pear hello [FILE]`

describe the command here

```
USAGE
  $ pear hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ pear hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/jonallured/pear/blob/v0.0.0/src/commands/hello.ts)_

## `pear help [COMMAND]`

display help for pear

```
USAGE
  $ pear help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_
<!-- commandsstop -->
