import { homedir } from "os"

export const PearConfig = {
  dataFile: ".pear-data",
  dataPath: (): string => [homedir(), PearConfig.dataFile].join("/"),
}
