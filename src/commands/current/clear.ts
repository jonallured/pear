import { BaseCommand } from "../BaseCommand"
import { PearData } from "../../pear-data"
import { Pear } from "../../shared/Pear"
import { PearError } from "../../shared/PearErrors"

export default class ClearCurrent extends BaseCommand {
  static description = "clear current authors"

  async run(): Promise<void> {
    try {
      const data = new PearData()
      await data.clearCurrent()
      this.log(Pear.Messages.ClearedCurrent)
    } catch (error) {
      this.handleError(error as PearError)
    }
  }
}
