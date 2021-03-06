// @flow

import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import memoize from 'memoize-one'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Paper from '@material-ui/core/Paper'

import { files } from 'actions/gapiActions'
import { size } from 'core/styleUtils'
import SignInSignOut from 'components/molecules/SignInSignOut/SignInSignOut'


// flow globals
declare var gapi: Object

const AppRoot = styled.div`
font-family: ${({ theme }) => theme.typography.fontFamily};
font-size: ${({ theme }) => size(theme.typography.fontSize)};
min-height: 100vh;
`

const Content = styled.div`
padding: 68px 1rem 0 1rem;
`

const MenuButton = styled(IconButton)`
margin-left: -12;
margin-right: 20;
`

const Text = styled(Typography)`
flex-grow: 1;
`

const TextBox = styled(Paper)`
padding: 20px;
`

class App extends PureComponent<Object, Object> {

  componentDidUpdate(prevProps) {
    if (!prevProps.signedIn && this.props.signedIn) {
      this.props.fetchFiles()
    }
  }

  getFileList = memoize(files =>
    files
      .sort((a, b) => a.name < b.name ? -1 : (a.name === b.name ? 0 : 1))
      .map(file => <Text key={file.id}> {file.name} ({file.mimeType}) </Text>)
  )

  render() {
    const { signedIn, user } = this.props || {};
    const { name } = user || {};
    const files = (signedIn && this.props.files) || [];
    return (
      <AppRoot>
        <AppBar>
          <Toolbar>
            <MenuButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </MenuButton>
            <Text color="inherit" variant="title" >
              {signedIn ? `Welcome ${name}` : 'Login'}
            </Text>
            <SignInSignOut />
          </Toolbar>
        </AppBar>
        <Content>
          {this.getFileList(files)}
          { !signedIn && <TextBox>Please login with Google</TextBox>}
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
