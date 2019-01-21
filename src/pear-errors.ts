export interface PearError {
  exit: number
  message: string
}

export const noUsernamesError: PearError = {
  exit: 100,
  message: 'you have to pass at least one username'
}

export const noPearAuthorsFileError: PearError = {
  exit: 200,
  message: 'you have to init'
}

export const noPearDataFileError: PearError = {
  exit: 300,
  message: 'you have to init'
}

export const trailersFoundError: PearError = {
  exit: 400,
  message: 'trailers already in message'
}
