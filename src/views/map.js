import React, { Component } from 'react';
import L from 'leaflet'
import { AutoFixOffSharp } from '@mui/icons-material';
export default class Map extends Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state={
      imperial: [900, -800],
      geometry: {
        circles: [],
        lines: [],
        points: []
      }
    }
  }
  componentDidMount(){
    //INSTANCE MAP

   const map = L.map('map', {
     crs: L.CRS.Simple,
     minZoom:-2,
     maxZoom:-2
	  });
    // MAKE GRID
    for (let index = -1000; index < 1100; index += 100) {
      L.polyline([[1000, index], [-1000, index],], {color: '#b4b4b4', opacity: 0.3}).addTo(map);
      L.polyline([[index, 1000], [index, -1000],], {color: '#b4b4b4', opacity: 0.3}).addTo(map);
    }
    // MAKE LIMITS MAP
	  const bounds = [[-1000,-1000], [1000,1000]];
	  L.imageOverlay('https://wallpaperaccess.com/full/2151907.jpg', bounds).addTo(map);
    // CONFIGURE ICONS
    const myIcon = L.icon({
      iconUrl: 'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/44946/satellite-emoji-clipart-md.png',
      iconSize: [40, 40],
    });
    const imperial = L.icon({
      iconUrl: 'https://i.imgur.com/8gVlBCY.png',
      iconSize: [100, 100],
    });
    // CONFIGURE GEOMETRY
    this.props.satellites.forEach(element => {
      const coords = [element.position.y, element.position.x]
      element.distance = Math.sqrt(Math.pow(element.position.y - this.state.imperial[0], 2) + Math.pow(element.position.x-this.state.imperial[1], 2))
      this.state.geometry.lines.push(L.polyline([coords, this.state.imperial,], {color: 'red'}).addTo(map))
      this.state.geometry.circles.push(
        L.circle(coords, {
          color: 'blue',
          fillColor: '#f03',
          fillOpacity: 0.1,
          radius: element.distance
      }).addTo(map))
      this.state.geometry.points.push(L.marker(coords,{icon:myIcon,}).addTo(map));
    })
    
    const imperialShip = L.marker(this.state.imperial,{
      icon:imperial,
      draggable: true
    }).addTo(map);

    imperialShip.on("move", e =>{
      this.props.setDistance(e.latlng)
      this.state.geometry.lines.forEach(element=> {
        const origin = element.getLatLngs()
        element.setLatLngs([origin[0], e.latlng])
      });
      this.state.geometry.circles.forEach(element => {
        const origin = element.getLatLng()
        element.setRadius(Math.sqrt(Math.pow(origin.lng-e.latlng.lng, 2) + Math.pow(origin.lat-e.latlng.lat, 2)))
      })
    })

	  map.fitBounds(bounds)
    map.setView([0, 0]); 
  }
  
  render() {
    return (
      <div>
        <div id="map" style={{height: "500px"}}></div>
      </div>
    );
  }
}