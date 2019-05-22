import { hydrate } from 'react-dom'
import App from '~/common/App'
import configureStore from '~/common/store/configureStore'

const store = configureStore(window.__initialState)
hydrate(App(), document.querySelector('#root'))
