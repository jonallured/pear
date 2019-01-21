const {execSync} = require('child_process')
const fs = require('fs')
import cli from 'cli-ux'

export const PearUtils = {
  exec: (command: string): any => execSync(command, {encoding: 'utf-8'}),
  fileExists: (path: string): boolean => fs.existsSync(path),
  prompt: (omg: string): Promise<string> => cli.prompt(omg),
  readFile: (path: string): string => fs.readFileSync(path, {encoding: 'utf-8'}),
  writeFile: (path: string, data: string) => fs.writeFileSync(path, data)
}
