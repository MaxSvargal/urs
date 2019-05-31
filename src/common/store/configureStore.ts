import { routerMiddleware } from 'connected-react-router'
import debug from 'debug'
import { createBrowserHistory, createMemoryHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import createSagaMiddleware, { Saga } from 'redux-saga'

import makeReducer from '../shared/reducers'

import { RootStore } from '../types'

const { BROWSER } = process.env
const log = debug('server::redux-saga')

export let cachedStore: RootStore

export default (initialState: object, url = '/') => {
  const history = BROWSER ? createBrowserHistory() : createMemoryHistory({ initialEntries: [url] })

  const sagaMiddleware = createSagaMiddleware({ onError: log })
  const middlewares = [routerMiddleware(history), sagaMiddleware]
  const enhancers = applyMiddleware(...middlewares)
  const rootReducer = makeReducer(history)

  const store = createStore(rootReducer, initialState, composeWithDevTools(enhancers)) as RootStore

  let runSaga = (saga: Saga) => sagaMiddleware.run(saga)

  if (module.hot) {
    module.hot.accept('./', () => {
      store.replaceReducer(createReducer(store))
    })
  }
  cachedStore = store

  return { store, runSaga, history }
}
