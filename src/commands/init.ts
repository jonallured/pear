import { Command } from "@oclif/command"

import { PearData } from "../pear-data"

export default class Init extends Command {
  static description = "create the ~/.pear-data file"

  async run() {
    const message = PearData.init()
    this.log(message)
  }
}
