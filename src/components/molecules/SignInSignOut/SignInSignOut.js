// @flow

import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { initGapi, signOut } from 'actions/gapiActions'

// flow globals
declare var gapi: Object

const SignIn = styled.div`
${(props) => props.hidden ? 'display: none' : ''};
float: right;
.abcRioButtonContentWrapper {
  background-color: #222;
  color: white;
}
`
const SignOut = styled.div`
${(props) => props.visible ? '' : 'display: none'};
float: right;
font-size: 0.8em;
border: 1px solid #111;
padding: 10px;
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
        <SignOut onClick={this.props.signOut} visible={signedIn}>Sign out</SignOut>
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
