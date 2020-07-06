github-secrets
==============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/github-secrets.svg)](https://npmjs.org/package/github-secrets)
[![Downloads/week](https://img.shields.io/npm/dw/github-secrets.svg)](https://npmjs.org/package/github-secrets)
[![License](https://img.shields.io/npm/l/github-secrets.svg)](https://github.com/brendon1555/github-secrets/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g github-secrets-cli
$ github-secrets COMMAND
running command...
$ github-secrets (-v|--version|version)
github-secrets-cli/0.0.0 darwin-x64 node-v12.10.0
$ github-secrets --help [COMMAND]
USAGE
  $ github-secrets COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`github-secrets help [COMMAND]`](#github-secrets-help-command)
* [`github-secrets secrets`](#github-secrets-secrets)
* [`github-secrets update-secret`](#github-secrets-update-secret)

## `github-secrets help [COMMAND]`

display help for github-secrets

```
USAGE
  $ github-secrets help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

## `github-secrets secrets`

list secrets for a repo

```
USAGE
  $ github-secrets secrets

OPTIONS
  -h, --help         show CLI help
  -o, --org=org      (required) organisation
  -r, --repo=repo    (required) repo
  -t, --token=token  (required) personal access token

EXAMPLE
  $ github-secrets secrets -o anomaly -r anzen-server -t TOKEN_HERE
  {
       total_count: 1,
       secrets: [
           {
               name: 'DEPLOY_KEY',
               created_at: '2020-07-03T06:11:19Z',
               updated_at: '2020-07-03T06:11:19Z'
           },
       ]
  }
```

_See code: [src/commands/secrets.ts](https://github.com/anomaly/github-secrets/blob/v0.0.0/src/commands/secrets.ts)_

## `github-secrets update-secret`

updates a secret for a repo

```
USAGE
  $ github-secrets update-secret

OPTIONS
  -e, --envfile=envfile  (required) .env file
  -h, --help             show CLI help
  -o, --org=org          (required) organisation
  -r, --repo=repo        (required) repo
  -s, --secret=secret    (required) secret to update
  -t, --token=token      (required) personal access token

EXAMPLE
  $ github-secrets update-secret -o anomaly -r anzen-server -t TOKEN_HERE -e .env.prod
  ...
```

_See code: [src/commands/update-secret.ts](https://github.com/anomaly/github-secrets/blob/v0.0.0/src/commands/update-secret.ts)_
<!-- commandsstop -->
