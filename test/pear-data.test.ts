import {PearConfig} from '../src/pear-config'
import {createdMessage, foundMessage, initialData, PearData} from '../src/pear-data'

const fs = require('fs')
const os = require('os')

it('creates the file and returns the created message when data file not found', () => {
  fs.existsSync = jest.fn()
  fs.existsSync.mockReturnValue(false)
  fs.writeFileSync = jest.fn()

  os.homedir = jest.fn()
  os.homedir.mockReturnValue('path/to/missing')

  const message = PearData.init()

  expect(message).toEqual(createdMessage)

  const expectedPath = `path/to/missing/${PearConfig.dataFile}`
  expect(fs.writeFileSync).toHaveBeenCalledWith(expectedPath, initialData)
})

it('returns the found message when data file exists', () => {
  fs.existsSync = jest.fn()
  fs.existsSync.mockReturnValue(true)
  fs.writeFileSync = jest.fn()

  const message = PearData.init()

  expect(message).toEqual(foundMessage)
  expect(fs.writeFileSync).not.toHaveBeenCalled()
})
