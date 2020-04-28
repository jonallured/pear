import { Command } from "@oclif/command"

import { PearData } from "../../pear-data"
import { PearError } from "../../pear-errors"
import { PearMessages } from "../../pear-messages"

export default class AddCurrent extends Command {
  static description = "add current author"

  static strict = false

  async run(): Promise<void> {
    const usernames = this.parse(AddCurrent).argv

    try {
      const data = new PearData()
      await data.addCurrent(usernames)
      this.log(PearMessages.addedCurrent)
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: PearError): void {
    this.error(error.message, { exit: error.exit })
  }
}
