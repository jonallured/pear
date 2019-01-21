import {PearAuthor} from './pear-author'
import {PearConfig} from './pear-config'
import {noPearDataFileError, noUsernamesError} from './pear-errors'
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

  addCurrent = async (usernames: string[]) => {
    if (usernames.length < 1) throw noUsernamesError
    const knownUsernames: string[] = this.known.map(author => author.username)
    const newUsernames: string[] = usernames.filter(username => !knownUsernames.includes(username))

    if (newUsernames.length > 0) await this.addKnown(newUsernames)
    const newCurrentAuthors = this.known.filter(author => usernames.includes(author.username))

    const current = this.current.concat(newCurrentAuthors)
    const json = {current, known: this.known}
    this.writeJson(json)
  }

  addKnown = async (usernames: string[]) => {
    if (usernames.length < 1) throw noUsernamesError
    const knownUsernames: string[] = this.known.map(author => author.username)
    const newUsernames: string[] = usernames.filter(username => !knownUsernames.includes(username))
    const newKnownAuthors: PearAuthor[] = await this.getNewAuthors(newUsernames)
    const known = this.known.concat(newKnownAuthors)
    const json = {current: this.current, known}
    this.writeJson(json)
  }

  clearCurrent = () => {
    const json = {current: [], known: this.known}
    this.writeJson(json)
  }

  private loadJson = () => {
    if (!PearUtils.fileExists(this.path)) throw noPearDataFileError
    const data = PearUtils.readFile(this.path)
    this._json = JSON.parse(data)
  }

  private writeJson = (json: PearDataFile) => {
    if (!PearUtils.fileExists(this.path)) throw noPearDataFileError
    const data = JSON.stringify(json)
    PearUtils.writeFile(this.path, data)
    // maybe this should go through `loadJson` instead?
    this._json = json
  }

  private getNewAuthors = async (usernames: string[]): Promise<PearAuthor[]> => {
    const results: Promise<PearAuthor>[] = await usernames.map(arg => this.getAuthorInfo(arg))
    return Promise.all(results)
  }

  private getAuthorInfo = async (username: string): Promise<PearAuthor> => {
    const name = await PearUtils.prompt(`${username} not found\nname for ${username}`)
    const email = await PearUtils.prompt(`email for ${username}`)
    return new PearAuthor(email, name, username)
  }
}
