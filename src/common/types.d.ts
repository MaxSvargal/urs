import { StateType, ActionType } from 'typesafe-actions'
import { Store } from 'redux'

import * as actions from './actions'
import makeReducer from '../common/reducers'

export type RootAction = ActionType<typeof actions>
export type RootState = StateType<ReturnType<typeof makeReducer>>
export type RootStore = Store<RootState, RootAction>

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction
    RootState: RootState
  }
}
