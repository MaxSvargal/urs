import { useReducer } from 'react'

import { contains } from 'ramda'
import { IAction, IConfig } from '../components/MultipleFormStep'
import { ISmartFormAction, Steps } from '../config'
import { getMinMaxValuesFromStateOfActions, toggleStringContainsInList } from '../utils'

type IStateSelected = string[]

type Reducer = (state: IStateSelected, action: IAction) => IStateSelected
let reducer: Reducer = (state, action) => toggleStringContainsInList(action.key)(state)

let getPriceRangeStr = ([from, to]: [number, number]) => `$${from} - $${to}`

let getResult = (type: Steps, config: IConfig, state: IStateSelected): ISmartFormAction => ({
  key: '', // TODO: support of multiple keys?
  type,
  value: getPriceRangeStr(getMinMaxValuesFromStateOfActions(state)(config.actions)),
})

export let useMultipleStepsReducer = () => {
  let [selected, dispatch] = useReducer(reducer, [])
  let toggle = (a: IAction) => () => {
    dispatch(a)
  }
  let isActive = (a: IAction) => contains(a.key, selected)

  return [selected, toggle, isActive, getResult] as const
}
