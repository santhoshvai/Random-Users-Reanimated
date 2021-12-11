import { Info, User } from '../model/user'

interface JSONResponse {
  results?: User[]
  info?: Info
  error?: string
}

export const fetchUsers = async (
  page: number,
  abortSignal: AbortController['signal'],
  numResults = 20,
): Promise<User[]> => {
  const response = await fetch(
    `https://randomuser.me/api/?page=${page}&results=${numResults}`,
    {
      signal: abortSignal,
    },
  )
  if (response.ok) {
    const json: JSONResponse = await response.json()
    if (json.error) {
      throw Error(json.error)
    } else {
      return json.results ?? []
    }
  } else {
    throw new Error(response.statusText)
  }
}
