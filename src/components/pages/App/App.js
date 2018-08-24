// @flow

import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

import logo from './logo.svg'

const AppRoot = styled.div`
text-align: center;
background-color: #222;
color: white;
height: 100vh;
`

const Header = styled.header`
height: 150px;
padding: 20px;
`

const rotate360 = keyframes`
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
`

const Logo = styled.img`
animation: ${rotate360} infinite 20s linear;
height: 80px;
`

const Title = styled.h1`
font-size: 1.5em;
`

const Intro = styled.p`
font-size: large;
code { color: cyan; }
`

class App extends Component<Object> {

  render() {
    return (
      <AppRoot>
        <Header>
          <Logo src={logo} alt="logo" />
          <Title>Welcome to React</Title>
        </Header>
        <Intro>
          To get started, edit <code>src/components/pages/App/App.js</code> and save to reload.
        </Intro>
      </AppRoot>
    )
  }
}

export default App
