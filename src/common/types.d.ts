import { StateType, ActionType } from 'typesafe-actions'
import { Store } from 'redux'

import * as actions from '~/common/shared/actions'
import makeReducer from '~/common/shared/reducers'

export type RootAction = ActionType<typeof actions>
export type RootState = StateType<ReturnType<typeof makeReducer>>
export type RootStore = Store<RootState, RootAction>

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction
    RootState: RootState
  }
}
