import React, { Component } from 'react'
import logo from './logo.svg'
import Menu from './Menu' 

class Navbar extends Component {
  toggleCollapse =() => {
    let menu = document.getElementsByClassName('menu')[0];
    let carPosition = document.getElementById('logo');
    if(menu.style.display === 'none') {
      carPosition.style.left = 157+'px';
      menu.style.display = 'block'
    } else {
      carPosition.style.left = 0;
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