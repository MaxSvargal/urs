import React from 'react'
import { StateProvider, State } from '../state/globalState'
import Header from './header'
import { Action } from '../actions'

const App = () => {
  const initialState = {
    theme: 'green',
    counter: 0
  };

  const themeReducer = (state: State['theme'], action: Action) => {
    switch (action.type) {
      case 'changeTheme':
        return (action as any).newTheme
      default:
        return state;
    }
  };

  const counterReducer = (state: State['counter'], action: Action) => {
    switch (action.type) {
      case 'increment':
        return state + 1
      default:
        return state;
    }
  };

  const rootReducer = ({ theme, counter }, action) => ({
    theme: themeReducer(theme, action),
    counter: counterReducer(counter, action)
  })

  return (
    <StateProvider initialState={initialState} reducer={rootReducer}>
      <Header />
    </StateProvider>
  );
}

export default App
