import { BaseCommand } from "./BaseCommand"
import { PearData } from "../pear-data"
import { Pear } from "../shared/Pear"
import { PearError } from "../shared/PearErrors"

export default class Amend extends BaseCommand {
  static description = "amend last commit message with trailers"

  async run(): Promise<void> {
    try {
      const currentMessage = this.getCurrentMessage()
      const newMessage = this.cleanMessage(currentMessage)
      this.amendCommit(newMessage)
      this.log(Pear.Messages.AmendedCommit)
    } catch (error) {
      this.handleError(error as PearError)
    }
  }

  private getCurrentMessage(): string {
    const logCommand = "git log -1 --pretty=%B"
    const message = Pear.Utils.exec(logCommand)
    if (message.includes("Co-authored-by:")) throw Pear.Errors.TrailersFound
    return message
  }

  private cleanMessage(currentMessage: string): string {
    const data = new PearData()
    if (data.current.length === 0) throw Pear.Errors.NoCurrentAuthors

    const trailers = data.trailer()
    const cleanedMessage = currentMessage.replace(/Co-authored-by[\s\S]*/g, "")
    return cleanedMessage + "\n\n" + trailers
  }

  private amendCommit(newMessage: string): void {
    const amendCommand = `git commit --amend --allow-empty --message "${newMessage}"`
    Pear.Utils.exec(amendCommand)
  }
}
