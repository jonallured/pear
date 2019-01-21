import {PearConfig} from '../src/pear-config'
import {initialData, PearData} from '../src/pear-data'
import {PearMessages} from '../src/pear-messages'
import {PearUtils} from '../src/pear-utils'

import {erik, josh, orta} from './fixtures/test-authors'

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

    expect(pearData.current).toEqual([erik, orta])
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

    expect(pearData.known).toEqual([erik, orta])
  })
})

describe('pearData.addKnown', () => {
  // xit('skips already known authors')
  it('adds new known authors', async () => {
    const mockPrompt = jest.fn()
    mockPrompt.mockReturnValueOnce(josh.name)
    mockPrompt.mockReturnValueOnce(josh.email)
    PearUtils.prompt = mockPrompt
    const mockFileWrite = jest.fn()
    PearUtils.writeFile = mockFileWrite

    const path = 'test/fixtures/two-known-authors'
    const pearData = new PearData(path)

    await pearData.addKnown([josh.username])
    const expectedData = JSON.stringify({current: [], known: [erik, orta, josh]})
    expect(mockFileWrite).toHaveBeenCalledWith(path, expectedData)
  })
})
