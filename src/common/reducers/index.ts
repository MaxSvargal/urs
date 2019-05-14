import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'

import * as actions from '../actions'

export default (history: History) => {
  const dataReducer = createReducer([ 'WAT' ])
    .handleAction(actions.fetchSomeDataAsync.success, (state, action) =>
      [ ...state, ...action.payload.map(n => n.toString()) ])

    .handleAction(actions.requestFetchSomeData, (state, action) =>
      [ action.payload.id ])

  return combineReducers({
    data: dataReducer,
    router: connectRouter(history),
  })
}
