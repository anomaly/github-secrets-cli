import {Command, flags} from '@oclif/command'
import {request} from '@octokit/request'
import * as sodium from 'tweetsodium'
import * as fs from 'fs'

export default class UpdateSecrets extends Command {
  static description = 'updates a secret for a repo'

  static examples = [
    `$ github-secrets update-secret -o anomaly -r anzen-server -t TOKEN_HERE -e .env.prod
...
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
    org: flags.string({
      char: 'o',
      description: 'organisation',
      required: true,
    }),
    repo: flags.string({char: 'r', description: 'repo', required: true}),
    envfile: flags.string({
      char: 'e',
      description: '.env file',
      required: true,
    }),
    secret: flags.string({
      char: 's',
      description: 'secret to update',
      required: true,
    }),
  }

  async run() {
    const {flags} = this.parse(UpdateSecrets)

    const requestWithAuth = request.defaults({
      headers: {
        authorization: `token ${flags.token}`,
      },
    })

    const {data: token} = await requestWithAuth(
      'GET /repos/{owner}/{repo}/actions/secrets/public-key',
      {
        owner: flags.org,
        repo: flags.repo,
      }
    )

    const messageBytes = fs.readFileSync(flags.envfile)
    const keyBytes = Buffer.from(token.key, 'base64')

    const encryptedBytes = sodium.seal(messageBytes, keyBytes)

    const encrypted = Buffer.from(encryptedBytes).toString('base64')

    try {
      await requestWithAuth(
        'PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}',
        {
          owner: flags.org,
          repo: flags.repo,
          secret_name: flags.secret,
          encrypted_value: encrypted,
          key_id: token.key_id,
        }
      )
      this.log('secret updated')
    } catch (error) {
      this.log('unable to update secret')
    }
  }
}
