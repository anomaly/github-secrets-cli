github-secrets-cli
==================

A CLI based GitHub Secrets Manager.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@anomalyhq/github-secrets-cli.svg)](https://npmjs.org/package/@anomalyhq/github-secrets-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@anomalyhq/github-secrets-cli.svg)](https://npmjs.org/package/@anomalyhq/github-secrets-cli)
[![License](https://img.shields.io/npm/l/@anomalyhq/github-secrets-cli.svg)](https://github.com/anomaly/github-secrets-cli/blob/master/package.json)

ghs provides a command line interface to manage GitHub Secrets for your projects.

_Note:_ You will need a GitHub Personal Access Token with the `repo` scope. Detailed [instructions available in their docs](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)  
You can [Click Here](https://github.com/settings/tokens/new?scopes=repo&description=GitHub%20Secrets%20CLI) to quickly set up a key with the required permissions.

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
* [License](#license)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @anomalyhq/github-secrets-cli
$ ghs COMMAND
running command...
$ ghs (-v|--version|version)
@anomalyhq/github-secrets-cli/1.0.3 darwin-x64 node-v12.10.0
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
* [`ghs secrets:remove`](#ghs-secretsremove)
* [`ghs secrets:set`](#ghs-secretsset)

## `ghs config:get`

Outputs your configuration.

```
USAGE
  $ ghs config:get
```

_See code: [src/commands/config/get.ts](https://github.com/anomaly/github-secrets-cli/blob/v1.0.3/src/commands/config/get.ts)_

## `ghs config:set`

Update your configuration

```
USAGE
  $ ghs config:set

OPTIONS
  -o, --org=org                                  Organisation the repo belongs to.
  -r, --repo=repo                                Name of the repo.
  -t, --personalAccessToken=personalAccessToken  Your GitHub Personal Access Token.
```

_See code: [src/commands/config/set.ts](https://github.com/anomaly/github-secrets-cli/blob/v1.0.3/src/commands/config/set.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `ghs secrets:get`

Fetch a list of set secrets (cannot read secret values)

```
USAGE
  $ ghs secrets:get

OPTIONS
  -h, --help                                     show CLI help
  -o, --org=org                                  Organisation the repo belongs to.
  -r, --repo=repo                                Name of the repo.
  -t, --personalAccessToken=personalAccessToken  Your GitHub Personal Access Token.
```

_See code: [src/commands/secrets/get.ts](https://github.com/anomaly/github-secrets-cli/blob/v1.0.3/src/commands/secrets/get.ts)_

## `ghs secrets:remove`

Remove a secret

```
USAGE
  $ ghs secrets:remove

OPTIONS
  -h, --help                                     show CLI help
  -o, --org=org                                  Organisation the repo belongs to.
  -r, --repo=repo                                Name of the repo.
  -s, --secret=secret                            (required) GitHub Secret to remove.
  -t, --personalAccessToken=personalAccessToken  Your GitHub Personal Access Token.
  -y, --autoYes                                  Skips user confirmation.
```

_See code: [src/commands/secrets/remove.ts](https://github.com/anomaly/github-secrets-cli/blob/v1.0.3/src/commands/secrets/remove.ts)_

## `ghs secrets:set`

Update/Create a secret

```
USAGE
  $ ghs secrets:set

OPTIONS
  -b, --base64                                   base64 the string before encoding.
  -f, --file=file                                Location of a file to create a secret from.
  -h, --help                                     show CLI help
  -i, --input=input                              String to create a secret from.
  -o, --org=org                                  Organisation the repo belongs to.
  -r, --repo=repo                                Name of the repo.
  -s, --secret=secret                            (required) GitHub Secret to update/create.
  -t, --personalAccessToken=personalAccessToken  Your GitHub Personal Access Token.
```

_See code: [src/commands/secrets/set.ts](https://github.com/anomaly/github-secrets-cli/blob/v1.0.3/src/commands/secrets/set.ts)_
<!-- commandsstop -->


# License
Distributed under the Apache 2.0 License. See `LICENSE` for further information.
