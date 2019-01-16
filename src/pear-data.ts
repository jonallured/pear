import {PearConfig} from './pear-config'
import {PearMessages} from './pear-messages'

const fs = require('fs')
const os = require('os')

const blankSlate = {current: [], known: []}
export const initialData = JSON.stringify(blankSlate)

export class PearData {
  static init = () => {
    const path = [os.homedir(), PearConfig.dataFile].join('/')
    if (fs.existsSync(path)) return PearMessages.foundDataFile

    fs.writeFileSync(path, initialData)
    return PearMessages.createdDataFile
  }

  private readonly path: string

  constructor(path: string) {
    this.path = path
  }

  get authors() {
    return []
  }
}
