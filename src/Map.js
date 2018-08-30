import React, { Component } from 'react';



class Map extends Component {

  mapScript = (src) => {
    let getFirstScript = window.document.getElementsByTagName('script')[0];
    let creatMapScript = window.document.createElement('script');
    creatMapScript.sync = true;
    creatMapScript.defer = true;
    creatMapScript.src = src;

    getFirstScript.parentNode.insertBefore(creatMapScript, getFirstScript);
  }

  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.386052, lng: -122.083851},
      zoom: 12
    });
  }

  render() {
    return (
      <div id="map"></div>
    );
  }
}

export default Map;