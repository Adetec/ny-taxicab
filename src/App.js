import React, { Component } from 'react';
// Import axios for making requests
import axios from 'axios';
// Import component
import './App.css';
import Navbar from './Navbar';
import Menu from './Menu';
import Footer from './Footer';

class App extends Component {
  
  state = {
    places : [],
    allPlaces : [],
    markers : []
  }
  //Fetch data and retrieve requests asynchronously
  componentDidMount() {
    this.retrieveVenues();
  }

  //Make Google map script for html
  mapScript = (src) => {
    let getFirstScript = window.document.getElementsByTagName('script')[0];
    let creatMapScript = window.document.createElement('script');
    creatMapScript.sync = true;
    creatMapScript.defer = true;
    creatMapScript.src = src;
    //insert preparde script into html befor bundle.js file script
    getFirstScript.parentNode.insertBefore(creatMapScript, getFirstScript);
  }

  //This will load google map script and initiate the map
  loadMapScript = () =>{
    // Set Map Source to the script
    this.mapScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBBYin2BxOn4OINcuPIgkLQynZH6EM_pc8&v=3&callback=initMap')
    // Now render map
    window.initMap = this.initMap;
    
    
    // Handle error map
    window.gm_authFailure = () => {
      // Display alert message
      alert('Oops!! Google maps Error loading!');
      this.setState({mapError : true})
    }
  }
  
  initMap = () => {
    // Create the map object
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.712775, lng: -74.005973},
      zoom: 10
    });
    
    let markers = [];// This will contain all markers
    // Loop through each place to create its marker
    this.state.places.map(place => {
      let marker = new window.google.maps.Marker({
        position: {lat : place.venue.location.lat, lng : place.venue.location.lng},
        map: map,
        id : place.venue.id,
        title: place.venue.name
      });
        //Then save it
        markers.push(marker);
        
        // Create infoWindow object
        const infoWindow = new window.google.maps.InfoWindow();


        marker.addListener('click', ()=>{// When user click on that marker
          marker.setAnimation(window.google.maps.Animation.BOUNCE);//Animate it
            setTimeout(() => {
                marker.setAnimation(null);// then stop animation after 3 seconde
            }, 3000);
            
            //Create html that will display place name, lat an lng information in th infoWindow
            let content = `
              <div id='info-view'>
                <h3>${place.venue.name}</h3>
                <p class='info-content'><strong>Latitude: </strong>${place.venue.location.lat}</p>
                <p class='info-content'><strong>Longitude: </strong>${place.venue.location.lng}</p>
              </div>`

            //Set the content and open ir
            infoWindow.setContent(content);
            infoWindow.open(map, marker)
        
        });
        return marker;
    });
    this.setState({markers : markers})
  }

  // Fetch places from foursquare api
  retrieveVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    let parameters = {
      query : 'taxicab',
      client_id : 'KGRM5HI3USNJX2LWHTWJ1J5PPJEF3F5LJP31GCLUATCK41AP',
      client_secret : 'KKZWIDKWEICCGARKXIEZJFZOTJASTXJ33NUZJBM5QUYZO3AM',
      v : '20183008',
      near : 'New York'
    }
    //Make promise using axios, based HTTP client for the browser and node.js
    axios.get(endPoint + new URLSearchParams(parameters)).then(response => {
      // Everything is ok so...
      let result = response.data.response.groups[0].items;//Get itmes obeject from the primary group
      
      this.setState({ // set state for both state arrays
        places : result, allPlaces : result
      });
      this.state.places.map(item => {
        return item;
      }, this.loadMapScript());// After getting all places load the map
    }).catch(e => {// If something went wrong, and the promise is failed
      alert('Sorry! Data can\'t be loaded'); // Handle this error by send an alert box
    });
    
  }
  
  filterPlaces = (places) => {
    this.setState({places})
  }

  render() {
    return (
      <div className="App" role="application" aria-label="React components parent">
        <Navbar />
        <main className="grid">
          <Menu places={this.state.allPlaces} filterPlaces={this.filterPlaces} markers={this.state.markers}/>
          <div tabIndex="3" id="map" role="application" aria-label="Google Map Api" ></div>
        </main>
          <Footer />
      </div>
    );
  }
}

export default App;
