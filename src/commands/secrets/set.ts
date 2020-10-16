import {Command, flags} from '@oclif/command'
import {CLIError} from '@oclif/errors'
import {request} from '@octokit/request'
import cli from 'cli-ux'
import fs from 'fs-extra'
import sodium from 'tweetsodium'
import {configuration} from '../../utils/config'

export default class SecretsSet extends Command {
  static description = 'Update/Create a secret'

  static flags = {
    help: flags.help({char: 'h'}),
    personalAccessToken: flags.string({
      char: 't',
      description: 'Your GitHub Personal Access Token.',
      required: false,
    }),
    org: flags.string({
      char: 'o',
      description: 'Organisation the repo belongs to.',
      required: false,
    }),
    repo: flags.string({
      char: 'r',
      description: 'Name of the repo.',
      required: false,
    }),
    file: flags.string({
      char: 'f',
      description: 'Location of a file to create a secret from',
      required: false,
    }),
    input: flags.string({
      char: 'i',
      description: 'String to create a secret from',
      required: false,
    }),
    secret: flags.string({
      char: 's',
      description: 'GitHub Secret to update/create',
      required: true,
    }),
    base64: flags.boolean({
      char: 'b',
      description: 'base64 the string before encoding',
      required: false,
      default: false,
    }),
  }

  async run() {
    const {flags} = this.parse(SecretsSet)

    try {
      const conf = await configuration(this)

      const requestWithAuth = request.defaults({
        headers: {
          authorization: `token ${
            flags.personalAccessToken ?? conf.personalAccessToken
          }`,
        },
      })

      const {data: token} = await requestWithAuth(
        'GET /repos/{owner}/{repo}/actions/secrets/public-key',
        {
          owner: flags.org ?? conf.org,
          repo: flags.repo ?? conf.repo,
        }
      )

      let messageString

      if (flags.file)
        messageString = fs.readFileSync(flags.file, {
          encoding: flags.base64 ? 'base64' : null,
        })
      if (flags.input) {
        messageString = flags.input
        if (flags.base64) {
          messageString = Buffer.from(messageString)
          messageString = messageString.toString('base64')
        }
      }

      if (!(flags.file || flags.input)) {
        messageString = await cli.prompt('String to save as secret')
        if (flags.base64) {
          messageString = Buffer.from(messageString)
          messageString = messageString.toString('base64')
        }
      }
      const messageBytes = Buffer.from(messageString)
      const keyBytes = Buffer.from(token.key, 'base64')

      const encryptedBytes = sodium.seal(messageBytes, keyBytes)

      const encrypted = Buffer.from(encryptedBytes).toString('base64')

      try {
        await requestWithAuth(
          'PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}',
          {
            owner: flags.org ?? conf.org,
            repo: flags.repo ?? conf.repo,
            secret_name: flags.secret,
            encrypted_value: encrypted,
            key_id: token.key_id,
          }
        )
        this.log('secret updated')
      } catch (error) {
        this.error(error)
        this.log('unable to update secret')
      }
    } catch (error) {
      this.error(new CLIError(error), {exit: 1})
    }
  }
}
