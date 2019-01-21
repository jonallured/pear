# pear

Credit where credit is due.

[![CircleCI](https://circleci.com/gh/jonallured/pear/tree/master.svg?style=shield)](https://circleci.com/gh/jonallured/pear/tree/master)

<!-- toc -->
* [pear](#pear)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @jonallured/pear
$ pear COMMAND
running command...
$ pear (-v|--version|version)
@jonallured/pear/0.0.1 darwin-x64 node-v11.6.0
$ pear --help [COMMAND]
USAGE
  $ pear COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pear amend [FILE]`](#pear-amend-file)
* [`pear current`](#pear-current)
* [`pear current:add`](#pear-currentadd)
* [`pear current:clear`](#pear-currentclear)
* [`pear current:trailer`](#pear-currenttrailer)
* [`pear help [COMMAND]`](#pear-help-command)
* [`pear init`](#pear-init)
* [`pear known`](#pear-known)
* [`pear known:add`](#pear-knownadd)
* [`pear post-commit`](#pear-post-commit)

## `pear amend [FILE]`

describe the command here

```
USAGE
  $ pear amend [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/amend.ts](https://github.com/jonallured/pear/blob/v0.0.1/src/commands/amend.ts)_

## `pear current`

list current authors

```
USAGE
  $ pear current
```

_See code: [src/commands/current/index.ts](https://github.com/jonallured/pear/blob/v0.0.1/src/commands/current/index.ts)_

## `pear current:add`

add current author

```
USAGE
  $ pear current:add
```

_See code: [src/commands/current/add.ts](https://github.com/jonallured/pear/blob/v0.0.1/src/commands/current/add.ts)_

## `pear current:clear`

clear current authors

```
USAGE
  $ pear current:clear
```

_See code: [src/commands/current/clear.ts](https://github.com/jonallured/pear/blob/v0.0.1/src/commands/current/clear.ts)_

## `pear current:trailer`

list current authors in trailer format

```
USAGE
  $ pear current:trailer
```

_See code: [src/commands/current/trailer.ts](https://github.com/jonallured/pear/blob/v0.0.1/src/commands/current/trailer.ts)_

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

## `pear init`

create the ~/.pear-data file

```
USAGE
  $ pear init
```

_See code: [src/commands/init.ts](https://github.com/jonallured/pear/blob/v0.0.1/src/commands/init.ts)_

## `pear known`

list known authors

```
USAGE
  $ pear known
```

_See code: [src/commands/known/index.ts](https://github.com/jonallured/pear/blob/v0.0.1/src/commands/known/index.ts)_

## `pear known:add`

add known author

```
USAGE
  $ pear known:add
```

_See code: [src/commands/known/add.ts](https://github.com/jonallured/pear/blob/v0.0.1/src/commands/known/add.ts)_

## `pear post-commit`

git hook to amend commit with authors

```
USAGE
  $ pear post-commit
```

_See code: [src/commands/post-commit.ts](https://github.com/jonallured/pear/blob/v0.0.1/src/commands/post-commit.ts)_
<!-- commandsstop -->
