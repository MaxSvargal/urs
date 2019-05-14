import { createAction, createAsyncAction } from 'typesafe-actions'

export { routerActions } from 'connected-react-router'

export const requestFetchSomeData = createAction('fetchSomeData', action => (id: string) => action({ id }))

export const fetchSomeDataAsync = createAsyncAction(
  'fetchSomeDataRequest',
  'fetchSomeDataSuccess',
  'fetchSomeDataFailure',
  'fetchSomeDataCancel',
)<void, number[], Error, string>()
