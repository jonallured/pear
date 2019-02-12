import {Command} from '@oclif/command'

import {PearData} from '../../pear-data'
import {PearError} from '../../pear-errors'

export default class Current extends Command {
  static description = 'list current authors'

  async run() {
    try {
      const data = new PearData()
      const current = JSON.stringify(data.current, null, 2)
      this.log(current)
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: PearError) {
    this.error(error.message, {exit: error.exit})
  }
}
