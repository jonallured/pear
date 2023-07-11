import { Command } from "@oclif/core"
import { PearError } from "../shared/PearErrors"

export abstract class BaseCommand extends Command {
  protected handleError(error: PearError): void {
    this.error(error.message, { exit: error.exit })
  }
}
