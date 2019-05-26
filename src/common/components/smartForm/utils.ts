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
  Predicate,
  Variadic,
} from 'ramda'

export let equalStrings = equals as Morphism<string, Morphism<boolean, boolean>>
export let rejectString = reject as (fn: Predicate<boolean>) => Morphism<List<string>, string[]>
export let rejectByStringsEqual = o(rejectString, equalStrings)
// TODO: converge does not work with ifElse. I don't know how to compose it =(
export let toggleStringContainsInList = (key: string) => ifElse(contains(key), rejectByStringsEqual(key), append(key))

export let reduceMin = reduce(min, Infinity)
export let reduceMax = reduce(max, -Infinity)
type GetMinMaxPair = (xs: number[]) => [number, number]
export let getMinMaxPair: GetMinMaxPair = converge<number, number, [number, number]>(pair, [reduceMin, reduceMax])

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
