import React from 'react';
import './DisplayCurrentWeather.css';

function DisplayCurrentWeather(weatherData) {

    var { name, sys, main } = weatherData;
    var country = sys.country;
    var temp = main.temp;

    return(
        <div id="currentWeatherCointainer">
            <p id="temp">{ Math.round(temp) }&#176;</p>
            <h1>{ name }, { country }</h1>
        </div>
    )
} 

export default DisplayCurrentWeather;