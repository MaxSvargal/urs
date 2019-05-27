import { call, take } from 'redux-saga/effects'
import { RootAction } from '~/common/types'

export default function* rootSaga() {
  yield call(() => Promise.resolve('foo'))

  yield take<RootAction>('ANY')

  return 'hello!'
}
