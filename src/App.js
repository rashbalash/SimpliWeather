import React, { Component } from 'react';
import CurrentLocation from './CurrentLocation';
import DisplayCurrentWeather from './DisplayCurrentWeather';
import WeatherIcon from './weatherAnimation/WeatherIcon';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      zipcode: localStorage.getItem("zipcode"), 
      lat: localStorage.getItem("lat"), 
      lon: localStorage.getItem("lon"),
      weatherData: {},
      fiveDayWeatherData: {}
    };

    this.getCurrentWeather();
    this.getFiveDayWeather();
  }

  getLocation = (location) => {
    this.setState({
      zipcode: location.zipcode,
      lat: location.lat,
      lon: location.lon
    }, () => {
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("zipcode", this.state.zipcode);
        localStorage.setItem("lat", this.state.lat);
        localStorage.setItem("lon", this.state.lon);
      }
      this.getCurrentWeather();
      this.getFiveDayWeather();
    });
  }

  getCurrentWeather = () => {
    if ((this.state.lat !== "null" && this.state.lon !== "null") && (this.state.lat !== null && this.state.lon !== null))  {
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${ this.state.lat }&lon=${ this.state.lon }&units=imperial&appid=41aae642caeac8c0932d9726aad914cd`)
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          this.setState({
            weatherData: myJson,
          });
        });
    } else if (this.state.zipcode != null & this.state.zipcode !== "null") {
      fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${ this.state.zipcode },${ "US" }&units=imperial&appid=41aae642caeac8c0932d9726aad914cd`)
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          this.setState({
            weatherData: myJson,
          });
        });
    } else {
      console.log("No Data");
    } 
  }

  getFiveDayWeather = () => {
    if ((this.state.lat !== "null" && this.state.lon !== "null") && (this.state.lat !== null && this.state.lon !== null))  {
      fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${ this.state.lat }&lon=${ this.state.lon }&units=imperial&appid=41aae642caeac8c0932d9726aad914cd`)
        .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          fiveDayWeatherData: myJson,
          lat: null,
          lon: null,
          zipcode: null
        });
      });
    } else if (this.state.zipcode != null & this.state.zipcode !== "null") {
      fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${ this.state.zipcode },${ "US" }&units=imperial&appid=41aae642caeac8c0932d9726aad914cd`)
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          this.setState({
            fiveDayWeatherData: myJson,
            lat: null,
            lon: null,
            zipcode: null
          });
        });
    } else {
      console.log("No Data");
    } 
  }

  renderContent = () => {
    const { weatherData, fiveDayWeatherData, zipcode, lat } = this.state;

    const hasLoadedWeather = weatherData.hasOwnProperty('name');
    const hasLocation = zipcode || lat;
    
    if (hasLoadedWeather) {
      return DisplayCurrentWeather(weatherData, fiveDayWeatherData);
    } else if (hasLocation) {
      var currentTime = new Date().getHours();
      var conditionNumber = 0;

      if (currentTime > 6 && currentTime < 6) {
        conditionNumber = 800;
      } else {
        conditionNumber = 799;
      }
      return WeatherIcon(conditionNumber);
    } else {
      return <CurrentLocation id="currentLocation" getLocation = { this.getLocation } />;
    }
  }

  render() {
    

    return (
      <div id="container" className="App">
        <header id="mainHeader">
          <p id="title">Weather</p>
        </header>

        { this.renderContent() }

      </div>
    );
  }
}

export default App;