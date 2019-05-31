import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'

import * as actions from '~/common/shared/actions'
import { Loop, RootAction } from '~/common/types'

export default (history: History) => {
  type TData = string[]
  const dataReducer = createReducer<Loop<TData>>([ 'WAT' ])

    .handleAction(actions.fetchSomeDataAsync.success, (state: TData, action) =>
      [ ...state, ...action.payload.map(n => n.toString()) ])

    // .handleAction(actions.requestFetchSomeData, (state: TData, _) =>
    //   loop(state, Cmd.run(() => Promise.resolve([ 'foo' ]), {
    //     args: [ '123' ],
    //     failActionCreator: actions.fetchSomeDataAsync.failure,
    //     successActionCreator: actions.fetchSomeDataAsync.success,
    //   })))

  return combineReducers({
    data: dataReducer,
    router: connectRouter(history),
  })
}
