import { useEffect, useState } from 'react'
import { cachedStore } from '../store/configureStore'
import { RootAction } from '../types'

const { BROWSER } = process.env

let dispatchActionsArray = (actions: RootAction[]) => {
  actions.forEach(a => { cachedStore.dispatch(a) })
}

/* tslint only-arrow-functions: 0 */
export function usePrefetch(actions: RootAction[], deps?: readonly unknown[]) {
  if (!BROWSER) dispatchActionsArray(actions)
  useEffect(() => { dispatchActionsArray(actions) }, deps)
}
