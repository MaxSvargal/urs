import { useReducer } from 'react'
import useRouter from 'use-react-router'

import { Steps } from './config'

export interface ISmartFormAction {
  key: string
  type: Steps | 'clear'
  value?: string
}

type IFormState = { [key in Steps]: ISmartFormAction }

let initialState: IFormState = ({} as unknown) as IFormState
let reducer = (state: IFormState, action: ISmartFormAction) => ({ ...state, [action.type]: action })

export let useSteps = () => {
  let {
    history,
    match: { path },
  } = useRouter()
  let [state, dispatch] = useReducer(reducer, initialState)
  let getStepPath = (step: Steps) => path.replace(':step', step)
  let next = (step: Steps) => () => {
    history.push(getStepPath(step))
  }
  let clearStep = (key: Steps) => () => {
    dispatch({ type: 'clear', key })
  }

  return { state, dispatch, getStepPath, next, clearStep }
}
