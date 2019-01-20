import React, { Component } from 'react';

class CurrentLocation extends Component {
    
    state = {
        location: null,
        latitude: null,
        longitude: null
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
    options = {
        enableHighAccuracy: true,
        timeout: 10000,
    }

    success = (pos) => {
        var currentCoords = pos.coords;
        
        this.setState({
            latitude: currentCoords.latitude,
            longitude: currentCoords.longitude
        })
        
        console.log('Your current position is:');
        console.log(`Latitude : ${currentCoords.latitude}`);
        console.log(`Longitude: ${currentCoords.longitude}`);
        console.log(`More or less ${currentCoords.accuracy} meters.`);
    }

    error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    handleRequest = (e) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
    }

    render() {
        return(
            <div>
                <form id="currentLocationForm" onSubmit={ this.handleSubmit }>
                    <label htmlFor="location">ZipCode: </label>
                    <input type="text" id="location" onChange= { this.handleChange }/>
                    <button>Submit</button>
                </form>
                <form id="currentLocationRequest" onSubmit= { this.handleRequest }>
                    <button>Request Location</button>
                </form>
            </div>
        )
    }
}

export default CurrentLocation;