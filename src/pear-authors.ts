const fs = require('fs')
import cli from 'cli-ux'

import {Author} from './author'
import {noPearAuthorsFileError} from './pear-errors'

const loadJson = (path: string) => {
  if (!fs.existsSync(path)) throw noPearAuthorsFileError
  const data = fs.readFileSync(path, {encoding: 'utf-8'})
  return JSON.parse(data)
}

const writeJson = (path: string, authors: Author[]) => {
  if (!fs.existsSync(path)) throw noPearAuthorsFileError
  const authorInfo = JSON.stringify({authors})
  fs.writeFileSync(path, authorInfo)
}

export class PearAuthors {
  private readonly path: string
  private readonly log: (msg: any) => void
  private json: any

  constructor(path: string, log: (msg: any) => void) {
    this.path = path
    this.log = log
    this.json = loadJson(path)
  }

  get authors(): Author[] {
    return this.json.authors
  }

  get knownUsernames(): string[] {
    return this.authors.map(author => author.username)
  }

  async addMissing(usernames: string[]) {
    const missing = usernames.filter(username => !this.knownUsernames.includes(username))
    const newAuthors = await this.getNewAuthors(missing)
    writeJson(this.path, this.authors.concat(newAuthors))
    this.json = loadJson(this.path)
  }

  findAuthors(usernames: string[]): Author[] {
    return this.authors.filter(author => usernames.includes(author.username))
  }

  private async getNewAuthors(missing: string[]): Promise<Author[]> {
    const results: Promise<Author>[] = await missing.map(arg => this.getNewAuthor(arg))
    return Promise.all(results)
  }

  private async getNewAuthor(username: string): Promise<Author> {
    this.log(`${username} not found`)
    const name = await cli.prompt(`name for ${username}`)
    const email = await cli.prompt(`email for ${username}`)
    const newAuthor: Author = {email, name, username}
    return newAuthor
  }
}
