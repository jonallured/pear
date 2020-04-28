import { execSync } from "child_process"
import { existsSync, readFileSync, writeFileSync } from "fs"
import cli from "cli-ux"

export const PearUtils = {
  exec: (command: string): string => execSync(command, { encoding: "utf-8" }),
  fileExists: (path: string): boolean => existsSync(path),
  prompt: (message: string): Promise<string> => cli.prompt(message),
  readFile: (path: string): string => readFileSync(path, { encoding: "utf-8" }),
  writeFile: (path: string, data: string): void => writeFileSync(path, data),
}
