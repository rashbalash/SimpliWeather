import React, { Component } from 'react';
import LocationRequest from './Components/LocationRequest/LocationRequest';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather';
import WeatherIcon from './weatherAnimation/WeatherIcon';
import Footer from './Components/Footer/Footer';
import { weatherApiKey } from './ApiKeys';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      zipcode: localStorage.getItem("zipcode"), 
      lat: localStorage.getItem("lat"), 
      lon: localStorage.getItem("lon"),
      weatherData: {},
      dailyWeatherData: {},
      tempScale: localStorage.getItem("tempScale"),
    };
    this.getCurrentWeather();
    this.getDailyWeather();
  }

  getLocation = (location) => {
    this.setState({
      zipcode: location.zipcode,
      lat: location.lat,
      lon: location.lon,
      tempScale: "imperial",
    }, () => {
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("zipcode", this.state.zipcode);
        localStorage.setItem("lat", this.state.lat);
        localStorage.setItem("lon", this.state.lon);
        localStorage.setItem("tempScale", this.state.tempScale);
      }
      this.getCurrentWeather();
      this.getDailyWeather();
    });
  }

  getCurrentWeather = () => {
    if ((this.state.lat !== "null" && this.state.lon !== "null") && (this.state.lat !== null && this.state.lon !== null))  {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${ this.state.lat }&lon=${ this.state.lon }&units=${ this.state.tempScale }&appid=${ weatherApiKey }`)
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          this.setState({
            weatherData: myJson,
          });
        });
    } else if (this.state.zipcode != null & this.state.zipcode !== "null") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${ this.state.zipcode },${ "US" }&units=${ this.state.tempScale }&appid=${ weatherApiKey }`)
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
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${ this.state.lat }&lon=${ this.state.lon }&units=${ this.state.tempScale }&appid=${ weatherApiKey }`)
        .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          dailyWeatherData: myJson,
        });
      });
    } else if (this.state.zipcode != null & this.state.zipcode !== "null") {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${ this.state.zipcode },${ "US" }&units=${ this.state.tempScale }&appid=${ weatherApiKey }`)
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          this.setState({
            dailyWeatherData: myJson,
          });
        });
    } else {
      console.log("No Data");
    } 
  }

  handleMode = (e) => {
    console.log("change background color");
  }

  handleTempScaleChange = (e) => {
    const newScale = this.state.tempScale === "imperial" ? "metric" : "imperial";
    this.setState({ tempScale: newScale },
      () => {
        localStorage.setItem("tempScale", newScale);
        this.getCurrentWeather();
        this.getDailyWeather();
      });
  }

  renderContent = () => {
    const { weatherData, dailyWeatherData, zipcode, lat, tempScale } = this.state;

    const hasLoadedWeather = weatherData.hasOwnProperty('name');
    const hasLocation = zipcode || lat;
    var currentTime = new Date().getHours();
    
    if (hasLoadedWeather) {
      return CurrentWeather(weatherData, dailyWeatherData, tempScale, this.handleTempScaleChange);
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

  // handleLocationUpdate = (e) => {
  //   e.preventDefault();
  //   navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
  // }

  
  // options = {
  //   enableHighAccuracy: true,
  //   timeout: 10000,
  // }

  // success = (pos) => {
  //   var currentCoords = pos.coords;
    

  //   this.setState({
  //     lat: currentCoords.latitude,
  //     lon: currentCoords.longitude,
  //     validEntry: true
  //   })

  //   this.getLocation(this.state);
  // }

  // error = (err) => {
  //   console.warn(`ERROR(${err.code}): ${err.message}`);
  // }

  // handleDarkMode = () => {
    
    
  //   return (

  //   )
  // }

  render() {
    return (
      <div id="container" className="App">
        <header id="mainHeader">
          {/* { localStorage.length === 0 && this.state.validEntry !== true ? null : <p>hi</p> } */}
          <p id="title">SimpliWeather</p>
          {/* { localStorage.length === 0 && this.state.validEntry !== true ? null : <form onSubmit={ this.handleLocationUpdate }><button>hi</button></form> } */}
        </header>

        { this.renderContent() }

        <Footer />

      </div>
    );
  }
}

export default App;