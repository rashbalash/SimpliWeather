import React, { Component } from 'react';

class CurrentLocation extends Component {
    
    state = {
        location: null
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

    render() {
        return(
            <form id="currentLocationForm" onSubmit={ this.handleSubmit }>
                <label htmlFor="location">ZipCode: </label>
                <input type="text" id="location" onChange= { this.handleChange }/>
                <button>Submit</button>
            </form>
        )
    }
}

export default CurrentLocation;