import React, { Component } from 'react';
import L from 'leaflet'
export default class Map extends Component {
  render() {
    const  mymap = L.map('map').setView([51.505, -0.09], 13);
    const marker = L.marker([51.5, -0.09]).addTo(mymap);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    return (
      <div id="map"></div>
    );
  }
}