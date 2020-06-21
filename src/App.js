import React, { Component } from 'react';
import LocationRequest from './Components/LocationRequest/LocationRequest';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather';
import WeatherIcon from './weatherAnimation/WeatherIcon';
import Footer from './Components/Footer/Footer';
import { weatherApiKey } from './ApiKeys';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      zipcode: localStorage.getItem("zipcode"), 
      city: localStorage.getItem("city"),
      lat: localStorage.getItem("lat"), 
      lon: localStorage.getItem("lon"),
      weatherData: {},
      tempScale: localStorage.getItem("tempScale"),
      mode: localStorage.getItem("mode"),
    };
  }

  componentDidMount = async () => {

    const coordinates = await this.getCoordinates();
    this.setState({lat: coordinates.coord.lat, lon: coordinates.coord.lon, city: coordinates.name });

    const weather = await this.getWeather();
    this.setState({weatherData: weather})

  }

  getLocation = async (location) => {
    this.setState({
      zipcode: location.zipcode,
      city: location.city,
      lat: location.lat,
      lon: location.lon,
      tempScale: "imperial",
    }, async () => {
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("zipcode", this.state.zipcode);
        localStorage.setItem("city", this.state.city);
        localStorage.setItem("lat", this.state.lat);
        localStorage.setItem("lon", this.state.lon);
        localStorage.setItem("tempScale", this.state.tempScale);
        localStorage.setItem("mode", this.state.mode);
      }

      const coordinates = await this.getCoordinates();
      this.setState({lat: coordinates.coord.lat, lon: coordinates.coord.lon, city: coordinates.name });

      const weather = await this.getWeather();
      this.setState({weatherData: weather})

    });
  }

  getCoordinates = async () => {
    let url;
    if ((this.state.lat !== "null" && this.state.lon !== "null") && (this.state.lat !== null && this.state.lon !== null))  {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${ this.state.lat }&lon=${ this.state.lon }&units=${ this.state.tempScale }&appid=${ weatherApiKey }`;
    } else if (this.state.zipcode != null & this.state.zipcode !== "null") {
      url = `https://api.openweathermap.org/data/2.5/weather?zip=${ this.state.zipcode },${ "US" }&units=${ this.state.tempScale }&appid=${ weatherApiKey }`;
    } else if (this.state.city != null & this.state.city !== "null") {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${ this.state.city },${ "US" }&units=${ this.state.tempScale }&appid=${ weatherApiKey }`;
    } else {
      console.log("No Data");
    } 

    const response = await fetch(url);
    return await response.json();
  }

  getWeather = async () => {
    let weatherUrl;

    if ((this.state.lat !== "null" && this.state.lon !== "null") && (this.state.lat !== null && this.state.lon !== null))  {
      weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${ this.state.lat }&lon=${ this.state.lon }&units=${ this.state.tempScale }&exclude=minutely&appid=${ weatherApiKey }`
    } else {
      console.log("No Data");
    } 


    const response = await fetch(weatherUrl);
    return await response.json();

  }

  handleMode = (e) => {
    
    const newMode = this.state.mode === "dark" ? "light" : "dark";
    this.setState({ mode: newMode },
      () => {
        localStorage.setItem("mode", newMode);
      })
  }

  handleTempScaleChange = (e) => {
    const newScale = this.state.tempScale === "imperial" ? "metric" : "imperial";
    this.setState({ tempScale: newScale },
      async () => {
        localStorage.setItem("tempScale", newScale);
        const updateWeather = await this.getWeather();
        this.setState({ weatherData: updateWeather });
      });      
  }

  renderContent = () => {
    const { weatherData, zipcode, lat, tempScale, mode, city } = this.state;

    const hasLoadedWeather = weatherData.hasOwnProperty('timezone');
    const hasLocation = lat || zipcode;
    var currentTime = new Date().getHours();
    
    if (hasLoadedWeather) {
      return CurrentWeather(weatherData, tempScale, this.handleTempScaleChange, this.handleMode, mode, city);
    } else if (hasLocation) {
      var conditionNumber = 0;

      if (currentTime > 6 && currentTime < 18) {
        conditionNumber = 800;
      } else {
        conditionNumber = 799;
      }
      return <div id="loadingIcon"><WeatherIcon condition={conditionNumber} time={currentTime} iconSize={3} /></div>
    } else {
      return <LocationRequest id="LocationRequest" getLocation = { this.getLocation } />;
    }
  }

  render() {

    var bodyClassName = this.state.mode === "light" ? "light-body": "dark-body";
    
    return (
      <div id="container" className={["App", bodyClassName].join(' ')}>
        <header id="mainHeader">
          <p id="title">SimpliWeather</p>
        </header>

        { this.renderContent() }

        <Footer />

      </div>
    );
  }
}

export default App;