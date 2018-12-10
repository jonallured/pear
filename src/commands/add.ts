import {Command} from '@oclif/command'
import cli from 'cli-ux'

// import {AuthorList} from 'src/AuthorList'

const fs = require('fs')

interface Author {
  username: string
  info: string
}

export default class Add extends Command {
  static description = 'this is the command that creates or updates a .pear file'

  static strict = false

  async getNewAuthor(arg: string): Promise<Author> {
    this.log(`${arg} not found`)
    const name = await cli.prompt(`name for ${arg}`)
    const email = await cli.prompt(`email for ${arg}`)
    const info = `${name} <${email}>`
    const newAuthor: Author = {username: arg, info}
    return newAuthor
  }

  async getNewAuthors(argv: string[], usernames: string[]): Promise<Author[]> {
    const newArgs: string[] = argv.filter(arg => !usernames.includes(arg))
    const results: Promise<Author>[] = await newArgs.map(arg => this.getNewAuthor(arg))

    return Promise.all(results)
  }

  async run() {
    const {argv} = this.parse(Add)
    const list: Author[] = await this.loadAndUpdate(argv)

    const path = './.pear'

    if (!fs.existsSync(path)) {
      // remove the file?
    }

    const authors = list.filter(author => argv.includes(author.username))
    const authorInfo = authors.map(author => author.info).join('\n')

    fs.writeFileSync(path, authorInfo)
  }

  async loadAndUpdate(argv: string[]): Promise<Author[]> {
    const path = '/Users/jon/.pear-authors.json'

    if (!fs.existsSync(path)) {
      this.log('you gotta init pal!')
      return []
    }

    const data = fs.readFileSync(path, {encoding: 'utf-8'})
    const json = JSON.parse(data)
    const authors: Author[] = json.authors

    const usernames: string[] = authors.map(a => a.username)

    const newAuthors = await this.getNewAuthors(argv, usernames)

    newAuthors.forEach(newAuthor => authors.push(newAuthor))

    const newData = JSON.stringify({authors})
    fs.writeFileSync(path, newData)

    return authors
  }
}
