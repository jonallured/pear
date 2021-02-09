import { PearAuthor, RawAuthor } from "./pear-author"
import { Pear } from "./shared/Pear"

interface PearDataFile {
  current: PearAuthor[]
  known: PearAuthor[]
}

const blankSlate: PearDataFile = { current: [], known: [] }
export const initialData = JSON.stringify(blankSlate, null, 2)

export class PearData {
  static init = (): string => {
    if (Pear.utils.fileExists(Pear.config.dataPath))
      return Pear.Messages.FoundDataFile

    Pear.utils.writeFile(Pear.config.dataPath, initialData)
    return Pear.Messages.CreatedDataFile
  }

  private static convertToPearAuthor(raw: RawAuthor): PearAuthor {
    return new PearAuthor(raw.email, raw.name, raw.username)
  }

  private readonly path: string
  private _json?: PearDataFile

  constructor(path: string = Pear.config.dataPath) {
    this.path = path
  }

  get json(): PearDataFile {
    if (this._json === undefined) this.loadJson()

    return this._json! // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }

  get current(): PearAuthor[] {
    return this.json.current || []
  }

  get known(): PearAuthor[] {
    return this.json.known || []
  }

  addCurrent = async (usernames: string[]): Promise<void> => {
    if (usernames.length < 1) throw Pear.Errors.NoUsernames
    const knownUsernames: string[] = this.known.map((author) => author.username)
    const newUsernames: string[] = usernames.filter(
      (username) => !knownUsernames.includes(username)
    )

    if (newUsernames.length > 0) await this.addKnown(newUsernames)
    const newCurrentAuthors = this.known.filter((author) =>
      usernames.includes(author.username)
    )

    const current = this.current.concat(newCurrentAuthors)
    const json = { current, known: this.known }
    this.writeJson(json)
  }

  addKnown = async (usernames: string[]): Promise<void> => {
    if (usernames.length < 1) throw Pear.Errors.NoUsernames
    const knownUsernames: string[] = this.known.map((author) => author.username)
    const newUsernames: string[] = usernames.filter(
      (username) => !knownUsernames.includes(username)
    )
    const newKnownAuthors: PearAuthor[] = await this.getNewAuthors(newUsernames)
    const known = this.known.concat(newKnownAuthors)
    const json = { current: this.current, known }
    this.writeJson(json)
  }

  clearCurrent = (): void => {
    const json = { current: [], known: this.known }
    this.writeJson(json)
  }

  trailer = (): string => {
    const trailers = this.current.map((author) => author.trailer)
    return trailers.join("\n")
  }

  private loadJson(): void {
    if (!Pear.utils.fileExists(this.path)) throw Pear.Errors.NoDataFile
    const data = Pear.utils.readFile(this.path)
    const parsed = JSON.parse(data)
    const current = parsed.current.map((raw: RawAuthor) =>
      PearData.convertToPearAuthor(raw)
    )
    const known = parsed.known.map((raw: RawAuthor) =>
      PearData.convertToPearAuthor(raw)
    )

    this._json = { current, known }
  }

  private writeJson(json: PearDataFile): void {
    if (!Pear.utils.fileExists(this.path)) throw Pear.Errors.NoDataFile
    const data = JSON.stringify(json, null, 2)
    Pear.utils.writeFile(this.path, data)

    this._json = json
  }

  private async getNewAuthors(usernames: string[]): Promise<PearAuthor[]> {
    const results: Promise<PearAuthor>[] = await usernames.map((arg) =>
      this.getAuthorInfo(arg)
    )
    return Promise.all(results)
  }

  private async getAuthorInfo(username: string): Promise<PearAuthor> {
    const name = await Pear.utils.prompt(
      `${username} not found\nname for ${username}`
    )
    const email = await Pear.utils.prompt(`email for ${username}`)
    return new PearAuthor(email, name, username)
  }
}
