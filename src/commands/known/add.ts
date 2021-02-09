import { Command } from "@oclif/command"

import { PearData } from "../../pear-data"
import { Pear } from "../../shared/Pear"
import { PearError } from "../../shared/PearErrors"

export default class AddKnown extends Command {
  static description = "add known author"

  static strict = false

  async run(): Promise<void> {
    const usernames = this.parse(AddKnown).argv

    try {
      const data = new PearData()
      await data.addKnown(usernames)
      this.log(Pear.messages.addedKnown)
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: PearError): void {
    this.error(error.message, { exit: error.exit })
  }
}
