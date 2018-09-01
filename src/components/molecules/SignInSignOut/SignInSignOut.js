// @flow

import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import ExitToApp from '@material-ui/icons/ExitToApp'

import { initGapi, signOut } from 'actions/gapiActions'

// flow globals
declare var gapi: Object

const SignIn = styled.div`
${(props) => props.hidden ? 'display: none' : ''};
float: right;
.abcRioButtonContentWrapper {
  background-color: ${({ theme }) => theme.palette.primary.main};

  .abcRioButtonContents {
    color: ${({ theme }) => theme.palette.getContrastText(theme.palette.primary.main)};
    font-family: ${({ theme }) => theme.typography.button.fontFamily};
    font-size: 0.8125rem !important;
    font-weight: ${({ theme }) => theme.typography.button.fontWeight};
    text-transform: ${({ theme }) => theme.typography.button.textTransform};
  }
}
`
const SignOut = styled(Button)`
${(props) => props.visible ? '' : 'display: none !important'}
`

const SignOutIcon = styled(ExitToApp)`
margin-right: ${({ theme }) => theme.spacing.unit}px
`

class SignInSignOut extends PureComponent<Object, Object> {

  componentDidMount() {
    this.props.initGapi()
  }

  render() {
    const { signedIn } = this.props || {}
    return (
      <Fragment>
        <SignIn hidden={signedIn}>
          <span className="g-signin2" />
        </SignIn>
        <SignOut variant="contained" color="primary" size="small" onClick={this.props.signOut} visible={signedIn ? 'visible' : ''}>
          <SignOutIcon /> Sign out
        </SignOut>
      </Fragment>
    )
  }
}

export default connect(
  (state) => ({
    signedIn: state.gapi.status.signedIn,
  }),
  { initGapi, signOut }
)(SignInSignOut);
