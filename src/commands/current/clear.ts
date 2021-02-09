import { Command } from "@oclif/command"

import { PearData } from "../../pear-data"
import { Pear } from "../../shared/Pear"
import { PearError } from "../../shared/PearErrors"

export default class ClearCurrent extends Command {
  static description = "clear current authors"

  async run(): Promise<void> {
    try {
      const data = new PearData()
      await data.clearCurrent()
      this.log(Pear.messages.clearedCurrent)
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: PearError): void {
    this.error(error.message, { exit: error.exit })
  }
}
