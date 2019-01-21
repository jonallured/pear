const fs = require('fs')
import cli from 'cli-ux'

export const PearUtils = {
  fileExists: (path: string): boolean => fs.existsSync(path),
  prompt: (omg: string): Promise<string> => cli.prompt(omg),
  readFile: (path: string): string => fs.readFileSync(path, {encoding: 'utf-8'}),
  writeFile: (path: string, data: string) => fs.writeFileSync(path, data)
}
