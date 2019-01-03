import {Command} from '@oclif/command'

const fs = require('fs')

export default class Init extends Command {
  static description = 'create the ~/.pear-authors file'

  async run() {
    // this command should:
    // * install a git hook on post commit
    // * create a ~/.pear-authors.json file

    // check to see if the file exists
    const path = '/Users/jon/.pear-authors.json'

    if (!fs.existsSync(path)) {
      const data = {authors: []}
      const json = JSON.stringify(data)
      fs.writeFileSync(path, json)
    }
    // create an empty one if not

    this.log('🍐 Pear is setup and ready to help!')
  }
}
