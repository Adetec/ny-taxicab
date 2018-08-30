import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Menu from './Menu';
import Navbar from './Navbar';
import Map from './Map';

class App extends Component {

  state = {
    places : []
  }
  componentDidMount() {
    this.retrieveVenues();
  }

  retrieveVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    let parameters = {
      query : 'taxicab',
      client_id : 'KGRM5HI3USNJX2LWHTWJ1J5PPJEF3F5LJP31GCLUATCK41AP',
      client_secret : 'KKZWIDKWEICCGARKXIEZJFZOTJASTXJ33NUZJBM5QUYZO3AM',
      v : '20183008',
      near : 'New York'
    }
    axios.get(endPoint + new URLSearchParams(parameters)).then(response => {
      this.setState({
        places : response.data.response.groups[0].items
      });
      this.state.places.map(item => {
       return console.log(item.venue.location)
      });
    }).catch(e => {
      console.log(e)
    })
    console.log(parameters);
    
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
