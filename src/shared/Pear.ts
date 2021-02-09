import { PearConfig } from "./PearConfig"
import { PearErrors } from "./PearErrors"
import { PearMessages } from "./PearMessages"
import { PearUtils } from "./PearUtils"

export const Pear = {
  Config: PearConfig.instance,
  Errors: PearErrors,
  Messages: PearMessages,
  Utils: PearUtils,
}
