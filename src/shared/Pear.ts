import { PearConfig } from "./PearConfig"
import { PearErrors } from "./PearErrors"
import { PearMessages } from "./PearMessages"
import { PearUtils } from "./PearUtils"

export const Pear = {
  config: PearConfig.instance,
  Errors: PearErrors,
  messages: PearMessages,
  utils: PearUtils,
}
