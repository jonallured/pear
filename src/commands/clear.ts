import {Command} from '@oclif/command'

const fs = require('fs')

export default class Clear extends Command {
  static description = 'clear current .pear file'

  async run() {
    const path = './.pear'

    if (fs.existsSync(path)) {
      fs.unlinkSync(path)
    }

    this.log('Coauthors cleared! 🍐')
  }
}
