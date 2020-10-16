import {Command, flags} from '@oclif/command'
import {CLIError} from '@oclif/errors'
import cli from 'cli-ux'
import fs from 'fs-extra'
import emoji from 'node-emoji'
import path from 'path'

export default class ConfigSet extends Command {
  static description = 'Update your configuration'

  static flags = {
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
    personalAccessToken: flags.string({
      char: 't',
      description: 'Your GitHub Personal Access Token.',
      required: false,
    }),
  }

  async run() {
    const {flags} = this.parse(ConfigSet)
    const config = path.join(this.config.configDir, 'config.json')

    try {
      if (!flags.org || !flags.repo || !flags.personalAccessToken) {
        flags.org = await cli.prompt(
          'Which organisation does the repo belong to?'
        )
        flags.repo = await cli.prompt('What is the name of the repo?')
        flags.personalAccessToken = await cli.prompt(
          'What is your GitHub Personal Access Token?',
          {type: 'hide'}
        )
      }

      await fs.ensureDir(this.config.configDir)
      await fs.writeJson(config, {
        org: flags.org,
        repo: flags.repo,
        personalAccessToken: flags.personalAccessToken,
      })

      this.log(
        'Your GHS CLI configuration has been generated!',
        emoji.get('rocket')
      )
      // this.exit(0)
    } catch (error) {
      this.error(new CLIError(error) || 'A GHS CLI error has occurred.', {
        exit: 1,
      })
    }
  }
}
