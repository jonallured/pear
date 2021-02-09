import { BaseCommand } from "./BaseCommand"
import { PearData } from "../pear-data"
import { Pear } from "../shared/Pear"

export default class Amend extends BaseCommand {
  static description = "amend last commit message with trailers"

  async run(): Promise<void> {
    try {
      const currentMessage = this.getCurrentMessage()
      const newMessage = this.cleanMessage(currentMessage)
      this.amendCommit(newMessage)
      this.log(Pear.messages.amendedCommit)
    } catch (error) {
      this.handleError(error)
    }
  }

  private getCurrentMessage(): string {
    const logCommand = "git log -1 --pretty=%B"
    const message = Pear.utils.exec(logCommand)
    if (message.includes("Co-authored-by:"))
      throw Pear.errors.trailersFoundError
    return message
  }

  private cleanMessage(currentMessage: string): string {
    const data = new PearData()
    if (data.current.length === 0) throw Pear.errors.noCurrentAuthorsError

    const trailers = data.trailer()
    const cleanedMessage = currentMessage.replace(/Co-authored-by[\s\S]*/g, "")
    return cleanedMessage + trailers
  }

  private amendCommit(newMessage: string): void {
    const amendCommand = `git commit --amend --allow-empty --message "${newMessage}"`
    Pear.utils.exec(amendCommand)
  }
}
