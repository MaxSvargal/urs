import { action, createAsyncAction } from 'typesafe-actions'

export const requestFetchSomeData = ({ id }: { id: string }) =>
  action('fetchSomeData', { id }, { async: true })

export const fetchSomeDataAsync = createAsyncAction(
  'fetchSomeDataRequest',
  'fetchSomeDataSuccess',
  'fetchSomeDataFailure',
  'fetchSomeDataCancel',
)<void, number[], Error, string>()
