import {PearAuthor} from './pear-author'
import {PearConfig} from './pear-config'
import {noPearDataFileError} from './pear-errors'
import {PearMessages} from './pear-messages'
import {PearUtils} from './pear-utils'

interface PearDataFile {
  current: PearAuthor[]
  known: PearAuthor[]
}

const blankSlate: PearDataFile = {current: [], known: []}
export const initialData = JSON.stringify(blankSlate)

export class PearData {
  static init = () => {
    if (PearUtils.fileExists(PearConfig.dataPath())) return PearMessages.foundDataFile

    PearUtils.writeFile(PearConfig.dataPath(), initialData)
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
    if (!PearUtils.fileExists(this.path)) throw noPearDataFileError
    const data = PearUtils.readFile(this.path)
    this._json = JSON.parse(data)
  }
}
