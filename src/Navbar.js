import React, { Component } from 'react'
import logo from './logo.svg'

class Navbar extends Component {
  render() {
    return (
      <header id="nav-bar">
        <h1 id="app-title">Taxicab services in NEW YORK</h1>
        <img id="logo" src={logo}></img>
      </header>
    )
  }
}

export default Navbar