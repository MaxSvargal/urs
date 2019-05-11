import React from 'react'
import { useState } from '../state/globalState'
import { changeTheme, increment } from '../actions'

const Header = () => {
  let [ state, dispatch ] = useState()
  return (
    <button onClick={() => {
      dispatch(changeTheme({ newTheme: state.theme === 'green' ? 'blue' : 'green' }))
      // dispatch({ type: 'increment', counter: 0 })
    }}
    style={{fontFamily: 'icons', fontSize: '2rem'}}>
      { state.theme } { state.counter }
    </button>
  )
}

export default Header
