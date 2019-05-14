import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'

import App from '../common/App'
import ServerPage from './ServerPage'

import { RootStore } from '../common/types'

interface IServerAppProps {
  bundle: string
  context: object
  store: RootStore
  url: string
}

export default ({ bundle, url, store, context }: IServerAppProps) =>
  <ServerPage
    bundle={bundle}
    state={store.getState()}
    body={
      <Provider store={store}>
        <StaticRouter location={url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    }
  />
