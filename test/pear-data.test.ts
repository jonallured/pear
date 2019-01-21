import {PearConfig} from '../src/pear-config'
import {initialData, PearData} from '../src/pear-data'
import {PearMessages} from '../src/pear-messages'
import {PearUtils} from '../src/pear-utils'

describe('PearData.init', () => {
  it('creates the file and returns the created message when data file not found', () => {
    PearUtils.fileExists = jest.fn(() => false)
    const mockFileWrite = jest.fn()
    PearUtils.writeFile = mockFileWrite
    const expectedPath = 'path/to/missing/file'
    PearConfig.dataPath = jest.fn(() => expectedPath)

    const message = PearData.init()

    expect(message).toEqual(PearMessages.createdDataFile)
    expect(mockFileWrite).toHaveBeenCalledWith(expectedPath, initialData)
  })

  it('returns the found message when data file exists', () => {
    PearUtils.fileExists = jest.fn(() => true)
    const mockFileWrite = jest.fn()
    PearUtils.writeFile = mockFileWrite

    const message = PearData.init()

    expect(message).toEqual(PearMessages.foundDataFile)
    expect(mockFileWrite).not.toHaveBeenCalled()
  })
})

describe('pearData.current', () => {
  it('returns an empty array when there are no current authors', () => {
    const path = 'test/fixtures/blank-slate-pear-data'
    const pearData = new PearData(path)
    expect(pearData.current).toEqual([])
  })

  it('returns the array of PearAuthor objects when there are known authors', () => {
    const path = 'test/fixtures/two-current-authors'
    const pearData = new PearData(path)
    const orta = {username: 'orta', name: 'Orta Therox', email: 'orta@example.com'}
    const erik = {username: 'erikkrietsch', name: 'Erik Krietsch', email: 'erik@example.com'}

    expect(pearData.current).toEqual([orta, erik])
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
