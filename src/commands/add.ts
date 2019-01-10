import {Command} from '@oclif/command'

import {Coauthors} from '../coauthors'
import {PearAuthors} from '../pear-authors'
import {PearConfig} from '../pear-config'
import {noUsernamesError, PearError} from '../pear-errors'

export default class Add extends Command {
  static description = 'add author to .pear file'

  static strict = false

  async run() {
    const usernames = this.parse(Add).argv

    try {
      const coauthors = await this.addAuthors(usernames)
      const message = this.computeMessage(coauthors || [])
      this.log(message)
    } catch (error) {
      this.handleError(error)
    }
  }

  private async addAuthors(usernames: string[]): Promise<string[]> {
    if (usernames.length < 1) throw noUsernamesError

    const pearAuthors = new PearAuthors(PearConfig.authorsPath, this.log)
    await pearAuthors.addMissing(usernames)

    const coauthors = new Coauthors(PearConfig.coauthorPath)

    const authors = pearAuthors.findAuthors(usernames)
    coauthors.add(authors)

    return coauthors.authors
  }

  private computeMessage(coauthors: string[]): string {
    const title = 'Coauthors set! 🍐 \n'
    return title + coauthors.join('\n')
  }

  private handleError(error: PearError) {
    this.error(error.message, {exit: error.exit})
  }
}
