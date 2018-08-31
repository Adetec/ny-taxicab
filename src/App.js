import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Menu from './Menu';
import Navbar from './Navbar';

class App extends Component {

  state = {
    places : [],
    allPlaces : []
  }
  componentDidMount() {
    this.retrieveVenues();
  }

  mapScript = (src) => {
    let getFirstScript = window.document.getElementsByTagName('script')[0];
    let creatMapScript = window.document.createElement('script');
    creatMapScript.sync = true;
    creatMapScript.defer = true;
    creatMapScript.src = src;

    getFirstScript.parentNode.insertBefore(creatMapScript, getFirstScript);
  }

  loadMapScript = () =>{
    this.mapScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBBYin2BxOn4OINcuPIgkLQynZH6EM_pc8&v=3&callback=initMap')
    window.initMap = this.initMap;
  }
  
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.712775, lng: -74.005973},
      zoom: 12
    });

    this.state.allPlaces.map(place => {
      let marker = new window.google.maps.Marker({
        position: {lat : place.venue.location.lat, lng : place.venue.location.lng},
        map: map,
        title: place.venue.name
      });
      console.log(marker);
      
      marker.addListener('click', ()=>{
        let content = place.venue.name + ', ' + place.venue.location.address
        infoWindow.setContent(content);
        console.log(marker)
        infoWindow.open(map, marker)
      });
      return marker;
    });

    const infoWindow = new window.google.maps.InfoWindow();

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
      let result = response.data.response.groups[0].items;
      this.setState({
        places : result, allPlaces : result
      });
      this.state.places.map(item => {
       return console.log(item.venue.location)
      }, this.loadMapScript());
    }).catch(e => {
      console.log(e)
    })
    console.log(parameters);
    
  }

  filterPlaces = (places) => {
    this.setState({places})
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <main className="grid">
          <Menu places={this.state.allPlaces} filterPlaces={this.filterPlaces}/>
          <div id="map"></div>
        </main>
      </div>
    );
  }
}

export default App;
