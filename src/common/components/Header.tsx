import React from 'react'
import { requestFetchSomeData } from '~/common/actions'
import { usePrefetch } from '~/common/hooks/usePrefetch'

export default () => {
  usePrefetch([ requestFetchSomeData('id') ], [])

  return <header>HI!</header>
}
