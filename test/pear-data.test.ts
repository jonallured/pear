import {PearConfig} from '../src/pear-config'
import {initialData, PearData} from '../src/pear-data'
import {PearMessages} from '../src/pear-messages'

const fs = require('fs')

it('creates the file and returns the created message when data file not found', () => {
  fs.existsSync = jest.fn()
  fs.existsSync.mockReturnValue(false)
  fs.writeFileSync = jest.fn()

  const expectedPath = 'path/to/missing/file'
  PearConfig.dataPath = jest.fn(() => expectedPath)

  const message = PearData.init()

  expect(message).toEqual(PearMessages.createdDataFile)

  expect(fs.writeFileSync).toHaveBeenCalledWith(expectedPath, initialData)
})

it('returns the found message when data file exists', () => {
  fs.existsSync = jest.fn()
  fs.existsSync.mockReturnValue(true)
  fs.writeFileSync = jest.fn()

  const message = PearData.init()

  expect(message).toEqual(PearMessages.foundDataFile)
  expect(fs.writeFileSync).not.toHaveBeenCalled()
})
