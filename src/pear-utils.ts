const fs = require('fs')

export const PearUtils = {
  fileExists: (path: string): boolean => fs.existsSync(path),
  readFile: (path: string): string => fs.readFileSync(path, {encoding: 'utf-8'}),
  writeFile: (path: string, data: string) => fs.writeFileSync(path, data)
}
