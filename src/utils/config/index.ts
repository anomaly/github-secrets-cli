import emoji from 'node-emoji'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs-extra'
import Command from '@oclif/command'

interface Config {
  org: string
  repo: string
  personalAccessToken: string
}

export async function configuration(ctx: Command) {
  const config = path.join(ctx.config.configDir, 'config.json')

  try {
    if (!(await fs.pathExists(config))) {
      await fs.outputJson(config, {
        org: '',
        repo: '',
        personalAccessToken: '',
      })
    }

    const {org, repo, personalAccessToken}: Config = await fs.readJson(config)

    if (!org || !repo || !personalAccessToken) {
      ctx.warn(
        `Configuration not found. Run the command ${chalk.bold(
          'ghs config:set'
        )} to generate a new configuration file.`
      )

      ctx.exit(0)
    }

    return {
      org,
      repo,
      personalAccessToken,
    }
  } catch (error) {
    ctx.error(error || 'A GHS CLI error has occurred.', {
      exit: 1,
    })
  }
}
