import { BaseCommand } from "../BaseCommand"
import { PearData } from "../../pear-data"

export default class Current extends BaseCommand {
  static description = "list current authors in trailer format"

  async run(): Promise<void> {
    try {
      const data = new PearData()
      this.log(data.trailer())
    } catch (error) {
      this.handleError(error)
    }
  }
}
