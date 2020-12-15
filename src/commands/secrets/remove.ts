import {Command, flags} from '@oclif/command'
import {CLIError} from '@oclif/errors'
import {request} from '@octokit/request'
import {configuration} from '../../utils/config'
import cli from 'cli-ux'

export default class SecretsRemove extends Command {
  static description = 'Remove a secret'

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
    secret: flags.string({
      char: 's',
      description: 'GitHub Secret to remove.',
      required: true,
    }),
    autoYes: flags.boolean({
      char: 'y',
      description: 'Skips user confirmation.',
      required: false,
    }),
  }

  async run() {
    const {flags} = this.parse(SecretsRemove)

    try {
      const conf = await configuration(this)
      let continueRemove = flags.autoYes
      if (!flags.autoYes)
        continueRemove = await cli.confirm(
          `Are you sure yoy wish to remove secret '${flags.secret}' from ${
            flags.org ?? conf.org
          }/${flags.repo ?? conf.repo}? (y/n)`
        )

      if (continueRemove) {
        const requestWithAuth = request.defaults({
          headers: {
            authorization: `token ${
              flags.personalAccessToken ?? conf.personalAccessToken
            }`,
          },
        })
        await requestWithAuth(
          'DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}',
          {
            owner: flags.org ?? conf.org,
            repo: flags.repo ?? conf.repo,
            secret_name: flags.secret,
          }
        )

        this.log(
          `Secret '${flags.secret}' has been removed from ${
            flags.org ?? conf.org
          }/${flags.repo ?? conf.repo}`
        )
      } else {
        this.log(`${flags.secret} was not removed`)
      }
    } catch (error) {
      this.error(new CLIError(error))
      this.exit(1)
    }
  }
}
