import React, { Component } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import './LocationRequest.css';

class LocationRequest extends Component {
    
    state = {
        zipcode: null,
        lat: null,
        lon: null,
        tempScale: "imperial",
    }
    
    handleSubmit = (e) => {
        e.preventDefault();      
        this.setState({
            [e.target.children[0].id]: e.target.children[0].value,
            lat: null,
            lon: null        
        }, () => {
            this.props.getLocation(this.state);
        }); 
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
            lat: currentCoords.latitude,
            lon: currentCoords.longitude
        })

        this.props.getLocation(this.state);
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
            <div className="formContainer">
                <div className="form">
                    <p id="mainContext">Click The Icon Below To Allow<br />SimpliWeather To Access Your Location!</p>
                    <form id="LocationRequest" onSubmit= { this.handleRequest }>
                        <br/>
                        <button className="btn"><FaLocationArrow id="locationIcon"/></button>
                    </form>
                    <p id="mainContext">Or Enter Your Zipcode!</p>
                    <br/>
                    <form id="LocationRequestForm" onSubmit= { this.handleSubmit }>
                        <input type="text" id="zipcode" placeholder="Zipcode..." required onChange= { this.handleChange }/>
                        <br/>
                        <button id="submitBtn">Submit</button>
                    </form>
                    <p id="subContext">(SimpliWeather does not store your data anywhere except for on your device, which you can delete by clicking on the trash can icon at the bottom of the page)</p>
                </div>
            </div>
        )
    }
}

export default LocationRequest;