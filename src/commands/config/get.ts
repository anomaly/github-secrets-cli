import {Command} from '@oclif/command'
import {configuration} from '../../utils/config'

export default class ConfigGet extends Command {
  static description = 'Outputs your configuration.'

  async run() {
    try {
      this.log(JSON.stringify(await configuration(this)))
    } catch (error) {
      this.error(error || 'A GHS CLI error has occurred.', {
        exit: 1,
      })
    }
  }
}
