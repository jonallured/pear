import { initialData, PearData } from "../src/pear-data"
import { Pear } from "../src/shared/Pear"

import { erik, josh, orta } from "./fixtures/authors"

describe("PearData.init", () => {
  it("creates the file and returns the created message when data file not found", () => {
    Pear.Utils.fileExists = jest.fn(() => false)
    const mockFileWrite = jest.fn()
    Pear.Utils.writeFile = mockFileWrite
    const expectedPath = "path/to/missing/file"
    Pear.Config.dataPath = expectedPath

    const message = PearData.init()

    expect(message).toEqual(Pear.Messages.CreatedDataFile)
    expect(mockFileWrite).toHaveBeenCalledWith(expectedPath, initialData)
  })

  it("returns the found message when data file exists", () => {
    Pear.Utils.fileExists = jest.fn(() => true)
    const mockFileWrite = jest.fn()
    Pear.Utils.writeFile = mockFileWrite

    const message = PearData.init()

    expect(message).toEqual(Pear.Messages.FoundDataFile)
    expect(mockFileWrite).not.toHaveBeenCalled()
  })
})

describe("pearData.current", () => {
  it("returns an empty array when there are no current authors", () => {
    const path = "test/fixtures/two-known-authors"
    const pearData = new PearData(path)
    expect(pearData.current).toEqual([])
  })

  it("returns the array of PearAuthor objects when there are current authors", () => {
    const path = "test/fixtures/two-current-authors"
    const pearData = new PearData(path)

    expect(pearData.current).toEqual([erik, orta])
  })
})

describe("pearData.known", () => {
  it("returns an empty array when there are no known authors", () => {
    const path = "test/fixtures/blank-slate-pear-data"
    const pearData = new PearData(path)
    expect(pearData.known).toEqual([])
  })

  it("returns the array of PearAuthor objects when there are known authors", () => {
    const path = "test/fixtures/two-known-authors"
    const pearData = new PearData(path)

    expect(pearData.known).toEqual([erik, orta])
  })
})

describe("pearData.addCurrent", () => {
  describe("with a known author", () => {
    it("adds new current author", async () => {
      const mockPrompt = jest.fn()
      mockPrompt.mockReturnValueOnce(erik.name)
      mockPrompt.mockReturnValueOnce(erik.email)
      Pear.Utils.prompt = mockPrompt
      const mockFileWrite = jest.fn()
      Pear.Utils.writeFile = mockFileWrite

      const path = "test/fixtures/two-known-authors"
      const pearData = new PearData(path)

      await pearData.addCurrent([erik.username])
      const expectedData = JSON.stringify(
        { current: [erik], known: [erik, orta] },
        null,
        2
      )
      expect(mockFileWrite).toHaveBeenCalledWith(path, expectedData)
    })
  })

  describe("with an unknown author", () => {
    it("adds a new known and current author", async () => {
      const mockPrompt = jest.fn()
      mockPrompt.mockReturnValueOnce(josh.name)
      mockPrompt.mockReturnValueOnce(josh.email)
      Pear.Utils.prompt = mockPrompt
      const mockFileWrite = jest.fn()
      Pear.Utils.writeFile = mockFileWrite

      const path = "test/fixtures/two-known-authors"
      const pearData = new PearData(path)

      await pearData.addCurrent([josh.username])
      const expectedData = JSON.stringify(
        { current: [josh], known: [erik, orta, josh] },
        null,
        2
      )
      expect(mockFileWrite).toHaveBeenCalledWith(path, expectedData)
    })
  })
})

describe("pearData.addKnown", () => {
  describe("with a known author", () => {
    it("does not add a new known author", async () => {
      const mockFileWrite = jest.fn()
      Pear.Utils.writeFile = mockFileWrite

      const path = "test/fixtures/two-known-authors"
      const pearData = new PearData(path)

      await pearData.addKnown([erik.username])
      const expectedData = JSON.stringify(
        { current: [], known: [erik, orta] },
        null,
        2
      )
      expect(mockFileWrite).toHaveBeenCalledWith(path, expectedData)
    })
  })

  describe("with an unknown author", () => {
    it("adds new known authors", async () => {
      const mockPrompt = jest.fn()
      mockPrompt.mockReturnValueOnce(josh.name)
      mockPrompt.mockReturnValueOnce(josh.email)
      Pear.Utils.prompt = mockPrompt
      const mockFileWrite = jest.fn()
      Pear.Utils.writeFile = mockFileWrite

      const path = "test/fixtures/two-known-authors"
      const pearData = new PearData(path)

      await pearData.addKnown([josh.username])
      const expectedData = JSON.stringify(
        { current: [], known: [erik, orta, josh] },
        null,
        2
      )
      expect(mockFileWrite).toHaveBeenCalledWith(path, expectedData)
    })
  })
})

describe("pearData.clearCurrent", () => {
  it("sets the current authors to empty array", () => {
    const mockFileWrite = jest.fn()
    Pear.Utils.writeFile = mockFileWrite

    const path = "test/fixtures/two-current-authors"
    const pearData = new PearData(path)
    pearData.clearCurrent()

    const expectedData = JSON.stringify(
      { current: [], known: [erik, orta] },
      null,
      2
    )
    expect(mockFileWrite).toHaveBeenCalledWith(path, expectedData)
    expect(pearData.current).toEqual([])
  })
})
