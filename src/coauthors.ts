const fs = require('fs')

import {Author} from './author'

const ensurePearFile = (path: string) => {
  if (!fs.existsSync(path)) fs.writeFileSync(path, '')
}

const loadData = (path: string) => {
  ensurePearFile(path)
  return fs.readFileSync(path, {encoding: 'utf-8'})
}

const writeData = (path: string, authors: string[]) => {
  ensurePearFile(path)
  const data = authors.join('\n')
  fs.writeFileSync(path, data)
}

export class Coauthors {
  private readonly path: string
  private data: string

  constructor(path: string) {
    this.path = path
    this.data = loadData(path)
  }

  get authors(): string[] {
    return this.data.split('\n')
  }

  add(newAuthors: Author[]) {
    const authors = newAuthors.map(author => `${author.name} <${author.email}>`)
    writeData(this.path, authors)
    this.data = loadData(this.path)
  }
}
