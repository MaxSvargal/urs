import React from 'react'
import { requestFetchSomeData } from './actions'
import usePrefetch from './hooks/usePrefetch'

export default () => {
  usePrefetch([ requestFetchSomeData('id') ], [])

  return <div />
}
