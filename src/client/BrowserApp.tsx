import { ConnectedRouter } from 'connected-react-router'
import { FC } from 'react'
import { Provider } from 'react-redux'

import { History } from 'history'
import { App } from '~/common/App'
import { RootStore } from '~/common/types'

export interface IOwnProps {
  history: History
  store: RootStore
}

export const BrowserApp: FC<IOwnProps> = ({ store, history }) =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
