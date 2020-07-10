github-secrets-cli
==================

Github secrets manager

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/github-secrets-cli.svg)](https://npmjs.org/package/github-secrets-cli)
[![Downloads/week](https://img.shields.io/npm/dw/github-secrets-cli.svg)](https://npmjs.org/package/github-secrets-cli)
[![License](https://img.shields.io/npm/l/github-secrets-cli.svg)](https://github.com/anomaly/github-secrets-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g github-secrets-cli
$ ghs COMMAND
running command...
$ ghs (-v|--version|version)
github-secrets-cli/0.0.0 darwin-x64 node-v12.10.0
$ ghs --help [COMMAND]
USAGE
  $ ghs COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ghs config:get`](#ghs-configget)
* [`ghs config:set`](#ghs-configset)
* [`ghs help [COMMAND]`](#ghs-help-command)
* [`ghs secrets:get`](#ghs-secretsget)
* [`ghs secrets:set`](#ghs-secretsset)

## `ghs config:get`

Outputs your configuration.

```
USAGE
  $ ghs config:get
```

_See code: [src/commands/config/get.ts](https://github.com/anomaly/github-secrets-cli/blob/v0.0.0/src/commands/config/get.ts)_

## `ghs config:set`

describe the command here

```
USAGE
  $ ghs config:set

OPTIONS
  -o, --org=org                                  Organisation the repo belongs to.
  -r, --repo=repo                                Name of the repo.
  -t, --personalAccessToken=personalAccessToken  Your GitHub Personal Access Token.
```

_See code: [src/commands/config/set.ts](https://github.com/anomaly/github-secrets-cli/blob/v0.0.0/src/commands/config/set.ts)_

## `ghs help [COMMAND]`

display help for ghs

```
USAGE
  $ ghs help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

## `ghs secrets:get`

describe the command here

```
USAGE
  $ ghs secrets:get

OPTIONS
  -h, --help                                     show CLI help
  -o, --org=org                                  Organisation the repo belongs to.
  -r, --repo=repo                                Name of the repo.
  -t, --personalAccessToken=personalAccessToken  Your GitHub Personal Access Token.
```

_See code: [src/commands/secrets/get.ts](https://github.com/anomaly/github-secrets-cli/blob/v0.0.0/src/commands/secrets/get.ts)_

## `ghs secrets:set`

describe the command here

```
USAGE
  $ ghs secrets:set

OPTIONS
  -b, --base64                                   base64 the string before encoding
  -f, --file=file                                Location of a file to create a secret from
  -h, --help                                     show CLI help
  -i, --input=input                              String to create a secret from
  -o, --org=org                                  Organisation the repo belongs to.
  -r, --repo=repo                                Name of the repo.
  -s, --secret=secret                            (required) GitHub Secret to update/create
  -t, --personalAccessToken=personalAccessToken  Your GitHub Personal Access Token.
```

_See code: [src/commands/secrets/set.ts](https://github.com/anomaly/github-secrets-cli/blob/v0.0.0/src/commands/secrets/set.ts)_
<!-- commandsstop -->
