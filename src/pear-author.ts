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
    return `${this.name} <${this.email}>`
  }
}
