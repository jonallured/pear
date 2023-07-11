import { BaseCommand } from "../BaseCommand"
import { PearData } from "../../pear-data"
import { Pear } from "../../shared/Pear"
import { PearError } from "../../shared/PearErrors"

export default class AddKnown extends BaseCommand {
  static description = "add known author"

  static strict = false

  async run(): Promise<void> {
    const { argv } = await this.parse(AddKnown)
    const usernames = argv as string[]

    try {
      const data = new PearData()
      await data.addKnown(usernames)
      this.log(Pear.Messages.AddedKnown)
    } catch (error) {
      this.handleError(error as PearError)
    }
  }
}
