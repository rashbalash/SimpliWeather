import React, { Component } from 'react';
import CurrentLocation from './CurrentLocation';

class App extends Component {
  render() {
    return (
      <div id="container" className="App">
        <p id="title">Weather</p>

        <CurrentLocation id="currentLocation"/>

      </div>
    );
  }
}

export default App;
