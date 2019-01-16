import {PearConfig} from './pear-config'
import {PearMessages} from './pear-messages'

const fs = require('fs')

const blankSlate = {current: [], known: []}
export const initialData = JSON.stringify(blankSlate)

export class PearData {
  static init = () => {
    if (fs.existsSync(PearConfig.dataPath())) return PearMessages.foundDataFile

    fs.writeFileSync(PearConfig.dataPath(), initialData)
    return PearMessages.createdDataFile
  }

  private readonly path: string

  constructor(path: string = PearConfig.dataPath()) {
    this.path = path
  }

  get authors() {
    return []
  }
}
