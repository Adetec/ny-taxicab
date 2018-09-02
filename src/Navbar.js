import React, { Component } from 'react'
import logo from './logo.svg'

class Navbar extends Component {
  toggleCollapse =() => {
    let menu = document.getElementsByClassName('menu')[0];
    let carPosition = document.getElementById('logo');
    if(menu.style.width !== 0+'px') {
      carPosition.style.left = 0;
      menu.style.width = 0+'px'
    } else {
      carPosition.style.left = 100+'px';
      menu.style.width = 200+'px'
    }
  }
  render() {
    return (
      <header id="nav-bar">
        <h1 id="app-title">Taxicab services in NEW YORK</h1>
        <img onClick={() => this.toggleCollapse()} id="logo" src={logo} alt="Taxicab logo"></img>
      </header>
    )
  }
}

export default Navbar