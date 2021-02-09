import { BaseCommand } from "../BaseCommand"
import { PearData } from "../../pear-data"

export default class Known extends BaseCommand {
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
}
