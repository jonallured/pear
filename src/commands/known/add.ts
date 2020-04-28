import { Command } from "@oclif/command"

import { PearData } from "../../pear-data"
import { PearError } from "../../pear-errors"
import { PearMessages } from "../../pear-messages"

export default class AddKnown extends Command {
  static description = "add known author"

  static strict = false

  async run(): Promise<void> {
    const usernames = this.parse(AddKnown).argv

    try {
      const data = new PearData()
      await data.addKnown(usernames)
      this.log(PearMessages.addedKnown)
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: PearError): void {
    this.error(error.message, { exit: error.exit })
  }
}
