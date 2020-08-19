import {Command, flags} from '@oclif/command'
import {request} from '@octokit/request'
import {configuration} from '../../utils/config'

export default class SecretsGet extends Command {
  static description = 'Fetch a list os set secrets (cannot read secret values)'

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
    repo: flags.string({char: 'r', description: 'Name of the repo.', required: false}),
  }

  async run() {
    const {flags} = this.parse(SecretsGet)

    try {
      const conf = await configuration(this)

      const requestWithAuth = request.defaults({
        headers: {
          authorization: `token ${
            flags.personalAccessToken ?? conf.personalAccessToken
          }`,
        },
      })
      const result = await requestWithAuth(
        'GET /repos/{owner}/{repo}/actions/secrets',
        {
          owner: flags.org ?? conf.org,
          repo: flags.repo ?? conf.repo,
        }
      )

      this.log(result.data)
    } catch (error) {
      this.error(error)
      this.exit(1)
    }
  }
}
