import React, { Component } from 'react';
import CurrentLocation from './CurrentLocation';

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

  render() {
    return (
      <div id="container" className="App">
        <p id="title">Weather</p>

        <CurrentLocation id="currentLocation" getLocation = { this.getLocation } />
        <p>{ this.state.lat }</p>
        <p>{ this.state.lon }</p>
        <p>{ this.state.zipcode }</p>

        

      </div>
    );
  }
}

export default App;
