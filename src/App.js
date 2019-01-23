import React, { Component } from 'react';
import CurrentLocation from './CurrentLocation';
import DisplayCurrentWeather from './DisplayCurrentWeather';

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
            weatherData: myJson,
            lat: null,
            lon: null,
            zipcode: null
          });
        });
      // fetch(`https://samples.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22`)
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((fiveDayJson) => {
      //     this.setState({
            
      //     })
      //   })
    } else if (this.state.zipcode != null) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${ this.state.zipcode },${ "US" }&units=imperial&appid=41aae642caeac8c0932d9726aad914cd`)
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          this.setState({
            weatherData: myJson,
            lat: null,
            lon: null,
            zipcode: null
          });
        });
    } else {
      console.log("Need Data");
    } 
  }

  render() {
    const { weatherData } = this.state;
    return (
      <div id="container" className="App">
        <header id="mainHeader">
          <p id="title">Weather</p>
        </header>

        {/* <CurrentLocation id="currentLocation" getLocation = { this.getLocation } /> */}
        

        { weatherData.hasOwnProperty('name')  ?
            DisplayCurrentWeather(weatherData) : 
            <CurrentLocation id="currentLocation" getLocation = { this.getLocation } />
        }
            {/* <h1 id="enterLocation">Enter Your Location!</h1> */}
              

      </div>
    );
  }
}

export default App;

// api call in app.js is fine
// 