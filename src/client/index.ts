import { hydrate } from 'react-dom'
import configureStore from '~/common/store/configureStore'

import { BrowserApp } from './BrowserApp'

const { store, history } = configureStore(window.__initialState)
hydrate(BrowserApp({ store, history }), document.querySelector('#root'))
