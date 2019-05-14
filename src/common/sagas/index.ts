import { call } from 'redux-saga/effects'

export default function* rootSaga() {
  yield call(() => Promise.resolve('foo'))

  return 'hello!'
}
