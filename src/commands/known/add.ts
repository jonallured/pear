import { BaseCommand } from "../BaseCommand"
import { PearData } from "../../pear-data"
import { Pear } from "../../shared/Pear"

export default class AddKnown extends BaseCommand {
  static description = "add known author"

  static strict = false

  async run(): Promise<void> {
    const usernames = this.parse(AddKnown).argv

    try {
      const data = new PearData()
      await data.addKnown(usernames)
      this.log(Pear.messages.addedKnown)
    } catch (error) {
      this.handleError(error)
    }
  }
}
