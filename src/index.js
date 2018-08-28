// @flow

import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import 'typeface-roboto';

import store from 'core/store'
import App from 'components/pages/App/App'

import './index.css'
import registerServiceWorker from './registerServiceWorker'

render(
  <Provider store={store}>
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Fragment>
  </Provider>,
  // $FlowFixMe
  document.getElementById('root')
)

registerServiceWorker()
