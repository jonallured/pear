import { Command } from "@oclif/command"

import { PearData } from "../pear-data"
import {
  noCurrentAuthorsError,
  PearError,
  trailersFoundError,
} from "../pear-errors"
import { PearMessages } from "../pear-messages"
import { PearUtils } from "../pear-utils"

export default class Amend extends Command {
  static description = "amend last commit message with trailers"

  async run() {
    try {
      const currentMessage = this.getCurrentMessage()
      const newMessage = this.cleanMessage(currentMessage)
      this.amendCommit(newMessage)
      this.log(PearMessages.amendedCommit)
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: PearError) {
    this.error(error.message, { exit: error.exit })
  }

  private getCurrentMessage(): string {
    const logCommand = "git log -1 --pretty=%B"
    const message = PearUtils.exec(logCommand)
    if (message.includes("Co-authored-by:")) throw trailersFoundError
    return message
  }

  private cleanMessage(currentMessage: string): string {
    const data = new PearData()
    if (data.current.length === 0) throw noCurrentAuthorsError

    const trailers = data.trailer()
    const cleanedMessage = currentMessage.replace(/Co-authored-by[\s\S]*/g, "")
    return cleanedMessage + trailers
  }

  private amendCommit(newMessage: string) {
    const amendCommand = `git commit --amend --allow-empty --message "${newMessage}"`
    PearUtils.exec(amendCommand)
  }
}
