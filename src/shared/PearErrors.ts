export interface PearError {
  exit: number
  message: string
}

const NoAuthorsFile: PearError = {
  exit: 200,
  message: "you have to init",
}

const NoCurrentAuthors: PearError = {
  exit: 500,
  message: "no current authors",
}

const NoDataFile: PearError = {
  exit: 300,
  message: "you have to init",
}

const NoUsernames: PearError = {
  exit: 100,
  message: "you have to pass at least one username",
}

const TrailersFound: PearError = {
  exit: 400,
  message: "trailers already in message",
}

export const PearErrors = {
  NoAuthorsFile,
  NoCurrentAuthors,
  NoDataFile,
  NoUsernames,
  TrailersFound,
}
