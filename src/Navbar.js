import React, { Component } from 'react'
import logo from './logo.svg'
import Menu from './Menu' 

class Navbar extends Component {
  toggleCollapse =() => {
    let menu = document.getElementsByClassName('menu')[0];
    if(menu.style.display === 'none') {
      menu.style.display = 'block'
    } else {
      menu.style.display = 'none'
    }
  }
  render() {
    return (
      <header id="nav-bar">
        <h1 id="app-title">Taxicab services in NEW YORK</h1>
        <img onClick={() => this.toggleCollapse()} id="logo" src={logo}></img>
      </header>
    )
  }
}

export default Navbar