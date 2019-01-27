import React, { Component } from 'react';
import LocationRequest from './LocationRequest';
import CurrentWeather from './CurrentWeather';
import WeatherIcon from './weatherAnimation/WeatherIcon';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      zipcode: localStorage.getItem("zipcode"), 
      lat: localStorage.getItem("lat"), 
      lon: localStorage.getItem("lon"),
      weatherData: {},
      dailyWeatherData: {}
    };

    this.getCurrentWeather();
    this.getDailyWeather();
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
      this.getDailyWeather();
    });
  }

  getCurrentWeather = () => {
    if ((this.state.lat !== "null" && this.state.lon !== "null") && (this.state.lat !== null && this.state.lon !== null))  {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${ this.state.lat }&lon=${ this.state.lon }&units=imperial&appid=41aae642caeac8c0932d9726aad914cd`)
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          this.setState({
            weatherData: myJson,
          });
        });
    } else if (this.state.zipcode != null & this.state.zipcode !== "null") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${ this.state.zipcode },${ "US" }&units=imperial&appid=41aae642caeac8c0932d9726aad914cd`)
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

  getDailyWeather = () => {
    if ((this.state.lat !== "null" && this.state.lon !== "null") && (this.state.lat !== null && this.state.lon !== null))  {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${ this.state.lat }&lon=${ this.state.lon }&units=imperial&appid=41aae642caeac8c0932d9726aad914cd`)
        .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          dailyWeatherData: myJson,
          lat: null,
          lon: null,
          zipcode: null
        });
      });
    } else if (this.state.zipcode != null & this.state.zipcode !== "null") {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${ this.state.zipcode },${ "US" }&units=imperial&appid=41aae642caeac8c0932d9726aad914cd`)
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          this.setState({
            dailyWeatherData: myJson,
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
    const { weatherData, dailyWeatherData, zipcode, lat } = this.state;

    const hasLoadedWeather = weatherData.hasOwnProperty('name');
    const hasLocation = zipcode || lat;
    var currentTime = new Date().getHours();
    
    if (hasLoadedWeather) {
      return CurrentWeather(weatherData, dailyWeatherData);
    } else if (hasLocation) {
      var conditionNumber = 0;

      if (currentTime > 6 && currentTime < 18) {
        conditionNumber = 800;
      } else {
        conditionNumber = 799;
      }
      return <div id="loadingIcon">{ WeatherIcon(conditionNumber, currentTime, 3) }</div>
    } else {
      return <LocationRequest id="LocationRequest" getLocation = { this.getLocation } />;
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