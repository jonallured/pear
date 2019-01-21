import {PearAuthor} from './pear-author'
import {PearConfig} from './pear-config'
import {noPearDataFileError} from './pear-errors'
import {PearMessages} from './pear-messages'

const fs = require('fs')

interface PearDataFile {
  current: PearAuthor[]
  known: PearAuthor[]
}

const blankSlate: PearDataFile = {current: [], known: []}
export const initialData = JSON.stringify(blankSlate)

export class PearData {
  static init = () => {
    if (fs.existsSync(PearConfig.dataPath())) return PearMessages.foundDataFile

    fs.writeFileSync(PearConfig.dataPath(), initialData)
    return PearMessages.createdDataFile
  }

  private readonly path: string
  private _json?: PearDataFile

  constructor(path: string = PearConfig.dataPath()) {
    this.path = path
  }

  get json() {
    if (this._json === undefined) this.loadJson()

    return this._json
  }

  get current(): PearAuthor[] {
    return this.json!.current || []
  }

  get known(): PearAuthor[] {
    return this.json!.known || []
  }

  private loadJson = () => {
    if (!fs.existsSync(this.path)) throw noPearDataFileError
    const data = fs.readFileSync(this.path, {encoding: 'utf-8'})
    this._json = JSON.parse(data)
  }
}
