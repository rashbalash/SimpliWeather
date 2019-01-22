import React from 'react';
import './DisplayCurrentWeather.css';

function DisplayCurrentWeather(weatherData) {

    var { name, sys, main } = weatherData;
    var country = sys.country;
    var temp = main.temp;

    return(
        <div id="currentWeatherCointainer">
            <p id="locationTemp">{ Math.round(temp) }&#176;</p>
            <p id="locationName">{ name }, { country }</p>
        </div>
    )
} 

export default DisplayCurrentWeather;