export interface RawAuthor {
  email: string
  name: string
  username: string
}

export class PearAuthor {
  email: string
  name: string
  username: string

  constructor(email: string, name: string, username: string) {
    this.email = email
    this.name = name
    this.username = username
  }

  get trailer(): string {
    return `Co-authored-by: ${this.name} <${this.email}>`
  }
}
