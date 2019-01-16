import {PearConfig} from '../src/pear-config'
import {initialData, PearData} from '../src/pear-data'
import {PearMessages} from '../src/pear-messages'

const fs = require('fs')

describe('PearData.init', () => {
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
})

describe('pearData.known', () => {
  it('returns an empty array when there are no known authors', () => {
    const path = 'test/fixtures/blank-slate-pear-data'
    const pearData = new PearData(path)
    expect(pearData.known).toEqual([])
  })

  it('returns the array of PearAuthor objects when there are known authors', () => {
    const path = 'test/fixtures/two-known-authors'
    const pearData = new PearData(path)
    const orta = {username: 'orta', name: 'Orta Therox', email: 'orta@example.com'}
    const erik = {username: 'erikkrietsch', name: 'Erik Krietsch', email: 'erik@example.com'}

    expect(pearData.known).toEqual([orta, erik])
  })
})
