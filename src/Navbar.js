import React, { Component } from 'react'
// Import logo image
import logo from './logo.svg'

class Navbar extends Component {
  // To show or hide menu
  toggleCollapse =() => {
    let menu = document.getElementsByClassName('menu')[0];// Get the menu element
    let carPosition = document.getElementById('logo');// Get logo
    // If the menu is displayed
    if(menu.style.width !== 0+'px') {
      //Set Log animation and hide the menu
      carPosition.style.left = 0;
      menu.style.width = 0+'px'
    } else {
      carPosition.style.left = 100+'px';
      menu.style.width = 200+'px'
    }
  }
  render() {
    return (
      <header tabIndex="0" id="header">
        <nav>
          <h1 id="app-title" aria-label="Application Title">Taxicab services in NEW YORK</h1>
          <img onClick={() => this.toggleCollapse()} id="logo" src={logo} alt="Taxicab logo"></img>
        </nav>
      </header>
    )
  }
}

export default Navbar