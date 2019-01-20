import React, { Component } from 'react';

class CurrentLocation extends Component {
    
    
    onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);
    }
    
    onChange = (e) => {
        
    }

    render() {
        return(
            <form onSubmit={this.onSubmit}>
                <input type="text" name="zipcode" onChange={ this.onChange } placeholder="Enter Your ZipCode"/>
                <button>Submit</button>
            </form>
        )
    }
}

export default CurrentLocation;