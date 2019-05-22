import { StateType, ActionType } from 'typesafe-actions'
import { Store } from 'redux'
import { Loop as ConstructLoopType } from 'redux-loop';

import * as actions from './actions'
import makeReducer from '../common/reducers'

export type RootAction = ActionType<typeof actions>
export type RootState = StateType<ReturnType<typeof makeReducer>>
export type RootStore = Store<RootState, RootAction>
export type Loop<S> = S | ConstructLoopType<S, RootAction>

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction
    RootState: RootState
  }
}
