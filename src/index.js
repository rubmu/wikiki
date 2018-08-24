// @flow

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import rootReducer from 'reducers/rootReducer'
import App from 'components/pages/App/App'

import './index.css'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  // $FlowFixMe
  document.getElementById('root')
)

registerServiceWorker()
