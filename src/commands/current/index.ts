import { BaseCommand } from "../BaseCommand"
import { PearData } from "../../pear-data"

export default class Current extends BaseCommand {
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
}
