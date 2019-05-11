import 'isomorphic-fetch'

const fetch = async <T>(path: RequestInfo): Promise<[ T, Error ]> => {
  try {
    let response = await fetch(path) as unknown as Response // TODO: WAT!?
    let json: T = await response.json()
    return [ json, null ]
  } catch (err) {
    return [ null, err ]
  }
}

type Data = { res: string }

export const loadData = async ({ filter }) => {
  let [ { res }, err ] = await fetch<Data>(`/api/data/${filter}`)
}