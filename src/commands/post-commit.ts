import {Command} from '@oclif/command'

const fs = require('fs')
const {execSync} = require('child_process')

export default class PostCommit extends Command {
  static description = 'describe the command here'

  async run() {
    // there are a few more things I need to do here, things like ensuring
    // we're in a git repo.
    //
    // what if we're in a git repo but there aren't any commits yet??

    const path = './.pear'

    if (fs.existsSync(path)) {
      const data = fs.readFileSync(path, 'utf-8')
      const lines: string[] = data.split('\n').filter(Boolean)
      const trailers = lines.map(line => `Co-authored-by: ${line}`)

      const logCommand = 'git log -1 --pretty=%B'
      const currentMessage = execSync(logCommand, {encoding: 'utf-8'})

      // i need a test that will push me to improve this regex so that it only
      // matches lines that start with the trailer
      const cleanedMessage = currentMessage.replace(/Co-authored-by[\s\S]*/g, '')
      const newMessage = cleanedMessage + trailers.join('\n')

      const amendCommand = `git commit --amend --allow-empty --message "${newMessage}"`
      execSync(amendCommand)
    } else {
      this.log('no pear file')
    }
  }
}
