const os = require("os")

export const PearConfig = {
  dataFile: ".pear-data",
  dataPath: () => [os.homedir(), PearConfig.dataFile].join("/"),
}
