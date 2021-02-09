import { PearUtils } from "./PearUtils"

export class PearConfig {
  static instance: PearConfig

  static init = (): PearConfig => {
    if (PearConfig.instance) return PearConfig.instance

    return new PearConfig()
  }

  dataFile: string
  dataPath: string

  constructor() {
    const dataFile = ".pear-data"
    this.dataFile = dataFile

    const dataPath = [PearUtils.getHomedir(), dataFile].join("/")
    this.dataPath = dataPath

    PearConfig.instance = this
  }
}

PearConfig.init()
