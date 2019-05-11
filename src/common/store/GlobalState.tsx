import React, { createContext, useContext, useReducer } from 'react'
import { Reducer } from 'typesafe-actions'
import * as actions from '../actions'
import { TRootAction, TState } from '../reducers'

const state = { data: ['1', '2'] }

const StateContext = createContext<TState>({})

interface IStateProviderProps {
  children: React.ReactElement
  initialState: TState
  reducer: Reducer<TState, TRootAction>
}

export const awaitPromises = [] as Array<Promise<unknown>>

const applyMiddleware = (dispatch: React.Dispatch<TRootAction>) => (action: TRootAction) => {
  dispatch(action)
  if (action.meta.async === true) {
    console.log('async!')
    awaitPromises.push(new Promise(resolve =>
      setTimeout(() => {
        console.log('dispatch!')
        dispatch(actions.fetchSomeDataAsync.success([1,2,3,4]))
        resolve()
      }, 1000)
    ))
  }
  console.log('dispatched', action)
  // TODO: async logic, add Promises to store
}

export const StateProvider = ({ reducer, initialState, children }: IStateProviderProps) => {
  let [ state, dispatch ] = useReducer(reducer, initialState)
  let enhancedDispatch = applyMiddleware(dispatch)

  return (
    <StateContext.Provider value={[ state, enhancedDispatch ]}>
      {children}
    </StateContext.Provider>
  )
}

export const useGlobalState = () => useContext(StateContext) as unknown as [ TState, React.Dispatch<TRootAction> ]
