import { useEffect } from 'react'
import { cachedStore } from '../store/configureStore'
import { RootAction } from '../types'

const { BROWSER } = process.env

let dispatchActionsArray = (actions: RootAction[]) => {
  actions.forEach(a => { cachedStore.dispatch(a) })
}

/* tslint:disable:only-arrow-functions */
export function usePrefetch(actions: RootAction[], deps?: readonly unknown[]) {
  if (!BROWSER) dispatchActionsArray(actions)
  useEffect(() => { dispatchActionsArray(actions) }, deps)
}
