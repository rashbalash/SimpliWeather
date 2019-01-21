import React, { Component } from 'react';
import CurrentLocation from './CurrentLocation';
import DisplayCurrentWeather from './DisplayCurrentWeather';

var weatherData;

class App extends Component {

  state = {
    zipcode: null, 
    lat: null, 
    lon: null,
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
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${ this.state.lat }&lon=${ this.state.lon }&appid=41aae642caeac8c0932d9726aad914cd`)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          weatherData = myJson;
          DisplayCurrentWeather(weatherData);
          console.log(JSON.stringify(myJson));
        });
    } else if ( this.state.zipcode != null) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${ this.state.zipcode },${ "US" }&appid=41aae642caeac8c0932d9726aad914cd`)
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
        
      </div>
    );
  }
}

export default App;
