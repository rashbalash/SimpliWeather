import React, { Component } from 'react';
import CurrentLocation from './CurrentLocation';
import DisplayCurrentWeather from './DisplayCurrentWeather';

// window.weatherData = {};

class App extends Component {

  state = {
    zipcode: null, 
    lat: null, 
    lon: null,
    weatherData: {}
  }

  getLocation = (location) => {
    this.setState({
      zipcode: location.zipcode,
      lat: location.lat,
      lon: location.lon
    });
    this.getWeather();
  }

  getWeather = () => {
    if (this.state.lat != null && this.state.lon != null) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${ this.state.lat }&lon=${ this.state.lon }&units=imperial&appid=41aae642caeac8c0932d9726aad914cd`)
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          this.setState({
            weatherData: myJson
          });
        });
    } else if ( this.state.zipcode != null) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${ this.state.zipcode },${ "US" }&units=imperial&appid=41aae642caeac8c0932d9726aad914cd`)
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          this.setState({
            weatherData: myJson
          });
        });
    } else {
      console.log("Need Data");
    } 
  }

  render() {
    const { lat, lon, zipcode, weatherData } = this.state;
    return (
      <div id="container" className="App">
        <p id="title">Weather</p>

        <CurrentLocation id="currentLocation" getLocation = { this.getLocation } />
              
        { DisplayCurrentWeather(weatherData) }

      </div>
    );
  }
}

export default App;

// api call in app.js is fine
// 