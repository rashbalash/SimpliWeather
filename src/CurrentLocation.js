import React, { Component } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import './CurrentLocation.css';

class CurrentLocation extends Component {
    
    state = {
        zipcode: null,
        lat: null,
        lon: null
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
                    <p id="mainContext">Click The Icon Below To Allow This Application To Access Your Location!</p>
                    <form id="currentLocationRequest" onSubmit= { this.handleRequest }>
                        <br/>
                        <button className="btn"><FaLocationArrow id="locationIcon"/></button>
                    </form>
                    <p id="mainContext">Or Enter Your Zipcode!</p>
                    <br/>
                    <form id="currentLocationForm" onSubmit= { this.handleSubmit }>
                        <input type="text" id="zipcode" placeholder="Zipcode..." required onChange= { this.handleChange }/>
                        <br/>
                        <button id="submitBtn">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CurrentLocation;