import React, { useEffect } from 'react'
import styled from '@emotion/styled'

import { StateProvider, useGlobalState } from '../common/store/GlobalState'
import { fetchSomeDataAsync, requestFetchSomeData } from '../common/actions'
import rootReducer from '../common/reducers'
import { awaitPromises } from '../common/store/GlobalState'

let H1 = styled.h1({
  color: 'red'
})

let SomeComponent = ({ who, className }: { who: string, className?: string }) => {
  const [ state, dispatch ] = useGlobalState()
  useEffect(() => {
    dispatch(requestFetchSomeData({ id: 'foo' }))
  }, [])

  return (
    <>
      <H1 className={className}>Hello, {who}</H1>
      <div>
        { state.data.map(v => <span key={v}>{v}</span>)}
      </div>
    </>
  )
}

const StyledComponent = styled(SomeComponent)({
  color: 'green',
})

let App = () => (
  <StateProvider initialState={{ data: [] }} reducer={rootReducer}>
    <StyledComponent who="developer!!"/>
  </StateProvider>
)

const loadData = async () => new Promise(resolve => {
  setTimeout(() => {
    resolve([1,2,3,4])
  }, 1000)
})

const preload = (fn: () => Promise<unknown>) => (Component: () => JSX.Element) => {
  awaitPromises.push(fn())

  return Component
}

export default preload(loadData)(App)
