import { Command } from '@oclif/command'
import { CLIError } from '@oclif/errors'
import { configuration } from '../../utils/config'

export default class ConfigGet extends Command {
  static description = 'Outputs your configuration.'

  async run() {
    try {
      this.log(JSON.stringify(await configuration(this)))
    } catch (error) {
      this.error(new CLIError(error) || 'A GHS CLI error has occurred.', {
        exit: 1,
      })
    }
  }
}
