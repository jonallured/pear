import { Command } from "@oclif/command"

import { PearData } from "../../pear-data"
import { PearError } from "../../pear-errors"
import { Pear } from "../../shared/Pear"

export default class AddCurrent extends Command {
  static description = "add current author"

  static strict = false

  async run(): Promise<void> {
    const usernames = this.parse(AddCurrent).argv

    try {
      const data = new PearData()
      await data.addCurrent(usernames)
      this.log(Pear.messages.addedCurrent)
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: PearError): void {
    this.error(error.message, { exit: error.exit })
  }
}
