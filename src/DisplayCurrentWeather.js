import React from 'react';

function DisplayCurrentWeather(weatherData) {
    
    var cityName = weatherData.name;

    console.log(cityName);
    
    return(
        <h1>{ cityName }</h1>
    )
} 

export default DisplayCurrentWeather;