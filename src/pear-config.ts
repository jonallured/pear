import { Pear } from "./shared/Pear"

export const PearConfig = {
  dataFile: ".pear-data",
  dataPath: (): string =>
    [Pear.utils.getHomedir(), PearConfig.dataFile].join("/"),
}
