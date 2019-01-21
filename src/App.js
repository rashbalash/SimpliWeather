import React, { Component } from 'react';
import CurrentLocation from './CurrentLocation';
import DisplayWeather from './DisplayWeather';

class App extends Component {

  state = {
    zipcode: null, 
    lat: null, 
    lon: null
  }

  getLocation = (location) => {
    this.setState({
      zipcode: location.zipcode,
      lat: location.lat,
      lon: location.lon
    })
  }

  getWeather = () => {
    if (this.state.lat != null && this.state.lon != null) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${ this.state.lat }&lon=${ this.state.lon }&appid=c7e4b6ffdc34413cd5d2c37f336b78f4`)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          console.log(JSON.stringify(myJson));
        });
    } else if ( this.state.zipcode != null) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${ this.state.zipcode },${ "US" }&appid=c7e4b6ffdc34413cd5d2c37f336b78f4`)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          console.log(JSON.stringify(myJson));
        });
    }  else {
      console.log("Need Data");
    } 
  }

  render() {
    return (
      <div id="container" className="App">
        <p id="title">Weather</p>

        <CurrentLocation id="currentLocation" getLocation = { this.getLocation } />
        <p>{ this.state.lat }</p>
        <p>{ this.state.lon }</p>
        <p>{ this.state.zipcode }</p>
        
        { this.getWeather() }

        <DisplayWeather />

      </div>
    );
  }
}

export default App;
