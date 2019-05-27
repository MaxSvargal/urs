import {
  append,
  compose,
  contains,
  converge,
  equals,
  filter,
  flatten,
  flip,
  ifElse,
  map,
  max,
  min,
  o,
  pair,
  prop,
  props,
  reduce,
  reject,
  List,
  Morphism,
  KeyValuePair,
  NestedMorphism,
} from 'ramda'

/* toggleStringContainsInList */
export let rejectByStringsEqual = o<string, Morphism<string, boolean>, Morphism<string[], string[]>>(reject, equals)
// TODO: converge does not work with ifElse. I don't know how to compose it =(
// -> converge(ifElse, [ contains, rejectByStringsEqual, append ])
export let toggleStringContainsInList = (key: string) => ifElse(contains(key), rejectByStringsEqual(key), append(key))

/* getMinMaxValuesFromStateOfActions */
export let reduceMin = reduce(min, Infinity)
export let reduceMax = reduce(max, -Infinity)
// type GetMinMaxPair = (xs: number[]) => [number, number]
export let getMinMaxPair = converge<NestedMorphism<number[], number[], KeyValuePair<number, number>>>(pair, [reduceMin, reduceMax])

export let propKey = prop('key')
export let filterByKeyPropIncludesInList = (list: List<string>) => filter<IAction>(o(flip(contains)(list), propKey))

export let mapPropsFromTo = map(props(['from', 'to']))

export let getMinMaxValuesFromActions = compose<IAction[], number[][], number[], [number, number]>(
  getMinMaxPair,
  flatten,
  mapPropsFromTo,
)

interface IAction {
  from: number
  key: string
  to: number
}

export let getMinMaxValuesFromStateOfActions = (list: string[]) =>
  compose<IAction[], IAction[], [number, number]>(
    getMinMaxValuesFromActions,
    filterByKeyPropIncludesInList(list),
  )
