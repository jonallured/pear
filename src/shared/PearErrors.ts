export interface PearError {
  exit: number
  message: string
}

const noUsernamesError: PearError = {
  exit: 100,
  message: "you have to pass at least one username",
}

const noPearAuthorsFileError: PearError = {
  exit: 200,
  message: "you have to init",
}

const noPearDataFileError: PearError = {
  exit: 300,
  message: "you have to init",
}

const trailersFoundError: PearError = {
  exit: 400,
  message: "trailers already in message",
}

const noCurrentAuthorsError: PearError = {
  exit: 500,
  message: "no current authors",
}

export const PearErrors = {
  noCurrentAuthorsError,
  noPearAuthorsFileError,
  noPearDataFileError,
  noUsernamesError,
  trailersFoundError,
}
