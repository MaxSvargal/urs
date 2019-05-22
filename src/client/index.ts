import { hydrate } from 'react-dom'
import App from '~/common/App'
import configureStore from '~/common/store/configureStore'

declare global {
  interface Window {
    __initialState: object
  }
}

const store = configureStore(window.__initialState)
hydrate(App(), document.querySelector('#root'))
