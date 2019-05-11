import { combineReducers } from 'redux'
import { createReducer, ActionType, StateType } from 'typesafe-actions'

import * as actions from '../actions'

export type TRootAction = ActionType<typeof actions>

export const dataReducer = createReducer<string[], TRootAction>([])
  .handleAction(actions.fetchSomeDataAsync.success, (state, action) =>
  [ ...state, ...action.payload.map(n => n.toString()) ])

const rootReducer = combineReducers({
  data: dataReducer,
})

export type TState = StateType<typeof rootReducer>

export default rootReducer
