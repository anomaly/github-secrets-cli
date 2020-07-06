import {Command, flags} from '@oclif/command'
import {request} from '@octokit/request'

export default class Secrets extends Command {
  static description = 'list secrets for a repo'

  static examples = [
    `$ github-secrets secrets -o anomaly -r anzen-server -t TOKEN_HERE
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
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    token: flags.string({
      char: 't',
      description: 'personal access token',
      required: true,
      env: 'GITHUB_PERSONAL_ACCESS_TOKEN',
    }),
    org: flags.string({char: 'o', description: 'organisation', required: true}),
    repo: flags.string({char: 'r', description: 'repo', required: true}),
  }

  async run() {
    const {flags} = this.parse(Secrets)

    const requestWithAuth = request.defaults({
      headers: {
        authorization: `token ${flags.token}`,
      },
    })
    const result = await requestWithAuth(
      'GET /repos/{owner}/{repo}/actions/secrets',
      {
        owner: flags.org,
        repo: flags.repo,
      }
    )

    this.log(result.data)
  }
}
