import { BaseCommand } from "../BaseCommand"
import { PearData } from "../../pear-data"
import { Pear } from "../../shared/Pear"
import { PearError } from "../../shared/PearErrors"

export default class AddCurrent extends BaseCommand {
  static description = "add current author"

  static strict = false

  async run(): Promise<void> {
    const { argv } = await this.parse(AddCurrent)
    const usernames = argv as string[]

    try {
      const data = new PearData()
      await data.addCurrent(usernames)
      const current = JSON.stringify(data.current, null, 2)
      this.log(current)
      this.log(Pear.Messages.AddedCurrent)
    } catch (error) {
      this.handleError(error as PearError)
    }
  }
}
