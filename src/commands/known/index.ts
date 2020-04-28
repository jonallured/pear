import { Command } from "@oclif/command"

import { PearData } from "../../pear-data"
import { PearError } from "../../pear-errors"

export default class Known extends Command {
  static description = "list known authors"

  async run(): Promise<void> {
    try {
      const data = new PearData()
      const known = JSON.stringify(data.known, null, 2)
      this.log(known)
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: PearError): void {
    this.error(error.message, { exit: error.exit })
  }
}
