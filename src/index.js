// @flow

import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import 'typeface-roboto';

import store from 'core/store'
import App from 'components/pages/App/App'

import './index.css'
import registerServiceWorker from './registerServiceWorker'

const theme = createMuiTheme();
console.log('$$$ theme', theme);

render(
  <Provider store={store}>
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        { /* inject styled-components theme */ }
        <ThemeProvider theme={theme}>
          { /* inject @material-ui theme */ }
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Fragment>
  </Provider>,
  // $FlowFixMe
  document.getElementById('root')
)

registerServiceWorker()
