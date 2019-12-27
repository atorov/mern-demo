import React from 'react'
import { render } from 'react-dom'

import App from './components/App'

const appRootElement = document.querySelector('#app-root')
const buildDate = appRootElement.dataset.buildDate

console.log('::: ::: :::')
console.log('::: process.env.NODE_ENV (NODE_ENV):', process.env.NODE_ENV)
console.log('::: process.env.BABEL_ENV:', process.env.BABEL_ENV)
console.log('::: APP_NAME:', APP_NAME)
console.log('::: APP_VERSION:', APP_VERSION)
console.log('::: Build Date:', buildDate)
console.log('::: ::: :::')

render(<App />, document.querySelector('#app-root'))
