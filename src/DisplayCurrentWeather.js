import React from 'react';

function DisplayCurrentWeather(weatherData) {
    
    console.log(weatherData);
    
    return(
        <h1>{ weatherData.name }</h1>
    )
} 

export default DisplayCurrentWeather;