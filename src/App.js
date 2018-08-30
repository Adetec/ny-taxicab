import React, { Component } from 'react';
import './App.css';
import Menu from './Menu';
import Navbar from './Navbar';
import Map from './Map';

class App extends Component {

  state = {
    places : []
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <main className="grid">
          <Menu />
          <Map />
        </main>
      </div>
    );
  }
}

export default App;
