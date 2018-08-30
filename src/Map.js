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

  render() {
    return (
      <div id="map"></div>
    );
  }
}

export default Map;