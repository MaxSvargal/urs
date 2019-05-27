import { useState } from 'react'
// import fetch from 'isomorphic-fetch'

export let asyncCache = []

export let useQuery = (url: string) => {
  // TODO: Store promise in global context for server side rendering?
  let [res, setRes] = useState(null)
  let [err, setErr] = useState(null)

  let doAsync = async () => {
    try {
      let fetchP = fetch(url)
      asyncCache.push(fetchP)
      let resource = await fetchP
      let jsonP = resource.json()
      asyncCache.push(jsonP)
      let json = await jsonP
      setRes(json)
    } catch (err) {
      setErr(err)
    }
  }

  // useEffect(() => {
  //   doAsync().catch()
  // }, [])
  // for server side
  doAsync().catch()

  return [res, err]
}
