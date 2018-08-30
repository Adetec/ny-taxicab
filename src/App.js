import React, { Component } from 'react';
import './App.css';
import Menu from './Menu';
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Menu />
      </div>
    );
  }
}

export default App;
