import {PearConfig} from './pear-config'

const fs = require('fs')
const os = require('os')

export const foundMessage = 'Found existing data file! 🍐'
export const createdMessage = 'Created data file! 🍐'

const blankSlate = {current: [], known: []}
export const initialData = JSON.stringify(blankSlate)

export class PearData {
  static init = () => {
    const path = [os.homedir(), PearConfig.dataFile].join('/')
    if (fs.existsSync(path)) return foundMessage

    fs.writeFileSync(path, initialData)
    return createdMessage
  }

  private readonly path: string

  constructor(path: string) {
    this.path = path
  }

  get authors() {
    return []
  }
}
