// @flow

import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import SignInSignOut from 'components/molecules/SignInSignOut/SignInSignOut'
import { files } from 'actions/gapiActions'

// flow globals
declare var gapi: Object

const AppRoot = styled.div`
text-align: center;
background-color: #222;
color: white;
min-height: 100vh;
`

const Header = styled.header`
height: 150px;
padding: 8px;
`

const Title = styled.h1`
font-size: 0.9rem;
line-height: 2.6rem;
display: inline;
`

const Content = styled.div`
font-size: small;
text-align: left;
padding: 0 1rem;
`

class App extends PureComponent<Object, Object> {

  componentDidUpdate(prevProps) {
    if (!prevProps.signedIn && this.props.signedIn) {
      this.props.fetchFiles()
    }
  }

  render() {
    const { signedIn, user } = this.props || {};
    const { name } = user || {};
    return (
      <AppRoot>
        <Header>
          <SignInSignOut />
          <Title>{signedIn ? `Welcome ${name}!` : 'Please log in.'}</Title>
        </Header>
        <Content>
          {(this.props.files || []).map(file => <div key={file.id}> {file.name} ({file.mimeType}) </div>)}
        </Content>
      </AppRoot>
    )
  }
}

export default connect(
  (state) => ({
    signedIn: state.gapi.status.signedIn,
    user: state.gapi.user,
    files: state.gapi.files,
  }),
  { fetchFiles: files }
)(App)
