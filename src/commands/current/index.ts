import { Command } from "@oclif/command"

import { PearData } from "../../pear-data"
import { PearError } from "../../shared/PearErrors"

export default class Current extends Command {
  static description = "list current authors"

  async run(): Promise<void> {
    try {
      const data = new PearData()
      const current = JSON.stringify(data.current, null, 2)
      this.log(current)
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: PearError): void {
    this.error(error.message, { exit: error.exit })
  }
}
