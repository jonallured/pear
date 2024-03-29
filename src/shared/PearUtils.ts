import { ux } from "@oclif/core"
import { execSync } from "child_process"
import { existsSync, readFileSync, writeFileSync } from "fs"
import { homedir } from "os"

const exec = (command: string): string => {
  const result = execSync(command, { encoding: "utf-8" })
  return result.trim()
}

const fileExists = (path: string): boolean => {
  return existsSync(path)
}

const getHomedir = (): string => {
  return homedir()
}

const prompt = (message: string): Promise<string> => {
  return ux.prompt(message)
}

const readFile = (path: string): string => {
  return readFileSync(path, { encoding: "utf-8" })
}

const writeFile = (path: string, data: string): void => {
  writeFileSync(path, data)
}

export const PearUtils = {
  exec,
  fileExists,
  getHomedir,
  prompt,
  readFile,
  writeFile,
}
