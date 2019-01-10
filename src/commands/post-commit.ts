import {Command} from '@oclif/command'

const fs = require('fs')
const {execSync} = require('child_process')

export default class PostCommit extends Command {
  static description = 'git hook to amend commit with authors'

  async run() {
    const path = './.pear'
    if (!fs.existsSync(path)) return

    const logCommand = 'git log -1 --pretty=%B'
    const currentMessage = execSync(logCommand, {encoding: 'utf-8'})
    if (currentMessage.includes('Co-authored-by:')) return

    const data = fs.readFileSync(path, 'utf-8')
    const lines: string[] = data.split('\n').filter(Boolean)
    const trailers = lines.map(line => `Co-authored-by: ${line}`)

    const cleanedMessage = currentMessage.replace(/Co-authored-by[\s\S]*/g, '')
    const newMessage = cleanedMessage + trailers.join('\n')

    const amendCommand = `git commit --amend --allow-empty --message "${newMessage}"`
    execSync(amendCommand, {encoding: 'utf-8'})
    this.log('Commit message updated! 🍐')
  }
}
