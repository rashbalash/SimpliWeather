import React from 'react';
import './DisplayCurrentWeather.css';

function DisplayCurrentWeather(weatherData) {

    var { name, sys, main, weather } = weatherData;
    var country = sys.country;
    var mainTemp = main.temp;
    var minTemp = main.temp_min;
    var maxTemp = main.temp_max;
    var conditions = weather[0].main;

    console.log(weatherData);
    console.log();

    return(
        <div id="currentWeatherCointainer">

            {/* Display Icon Based On Weather */}
            

            <p id="locationTemp">{ Math.round(mainTemp) }&#176;</p>
            <p id="minAndMaxTemp">{ conditions } | { Math.round(minTemp) }&#176; | { Math.round(maxTemp) }&#176;</p>
            <p id="locationName">{ name }, { country }</p>
        </div>
    )
} 

export default DisplayCurrentWeather;