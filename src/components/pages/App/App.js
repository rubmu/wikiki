// @flow

/* globals gapi */ // eslint-disable-line no-unused-vars

import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import SignInSignOut from 'components/molecules/SignInSignOut/SignInSignOut'

// flow globals
declare var gapi: Object

const AppRoot = styled.div`
text-align: center;
background-color: #222;
color: white;
height: 100vh;
`

const Header = styled.header`
height: 150px;
padding: 8px;
`

const Title = styled.h1`
font-size: 0.9em;
line-height: 2.6em;
display: inline;
`

const Content = styled.p`
font-size: large;
code { color: cyan; }
`

class App extends PureComponent<Object, Object> {

  render() {
    const { signedIn, user } = this.props || {};
    const { name } = user || {};
    return (
      <AppRoot>
        <Header>
          <SignInSignOut onLogin={this.onLogin} onLogout={this.onLogout} onUserChange={this.onUserChange} />
          <Title>{signedIn ? `Welcome ${name}!` : 'Please log in.'}</Title>
        </Header>
        <Content>
          TODO
        </Content>
      </AppRoot>
    )
  }
}

export default connect(
  (state) => ({
    signedIn: state.gapi.status.signedIn,
    user: state.gapi.user,
  }),
  null
)(App)
