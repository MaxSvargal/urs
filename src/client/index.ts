import { hydrate } from 'react-dom'
import App from '../common/App'

hydrate(App(), document.querySelector('#root'))

// // import { Provider, Consumer } from '../common/context/globalContext'
// import React from 'react'
// import { render } from 'react-dom'
// import App from '../common/components/app'
// // import * as font from '../assets/fonts/AvenirLTStd-Roman.woff2'

// // console.log('font', btoa(unescape(encodeURIComponent(font))))
// render(<App/>, document.querySelector('#root'))

// let ff = `@font-face {font-family: 'icons';src: url(data:font/woff2;charset=utf-8;base64,${btoa(unescape(encodeURIComponent(font)))}) format('woff');font-weight: normal;font-style: normal;}`

// let styleTag = document.createElement('style')
// styleTag.innerHTML = ff
// document.head.appendChild(styleTag)

// create react context
// render async functions!

// useEffect(() => fetchSomething())
// Make a components-hocs with "fetch something"
