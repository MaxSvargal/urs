import React, { createContext, useContext, useReducer } from 'react'
import { Action } from '../actions'

export type State = {
  theme: string,
  counter: number
}

const initialState = {
  theme: 'green'
}

const StateContext = createContext(initialState)

interface StateProviderProps {
  reducer: React.Reducer<State, Action>
  initialState: State
  children: React.ReactElement
}

export const StateProvider = ({ reducer, initialState, children }: StateProviderProps) =>
  <StateContext.Provider value={useReducer(reducer, initialState) as any}>
    {children}
  </StateContext.Provider>

export const useState = () => useContext(StateContext) as unknown as [ State, React.Dispatch<Action> ]