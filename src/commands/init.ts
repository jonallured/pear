import { BaseCommand } from "./BaseCommand"
import { PearData } from "../pear-data"

export default class Init extends BaseCommand {
  static description = "create the ~/.pear-data file"

  async run(): Promise<void> {
    const message = PearData.init()
    this.log(message)
  }
}
