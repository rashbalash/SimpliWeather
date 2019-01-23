import React from 'react';
import './DisplayCurrentWeather.css';
import sun from './images/sun.png';

function DisplayCurrentWeather(weatherData) {

    var { name, sys, main, weather } = weatherData;
    var country = sys.country;
    var mainTemp = main.temp;
    var minTemp = main.temp_min;
    var maxTemp = main.temp_max;
    var conditions = weather[0].main;

    return(
        <div id="currentWeatherCointainer">
            <p id="locationName">{ name }, { country }</p>

            {/* Display Icon Based On Weather */}
            <div className="tempAndIcon">
                <img src={ sun } alt="sunny" id="weatherIcon"/>
                <p id="locationTemp">{ Math.round(mainTemp) }&#176;</p>
            </div>
            
            <p id="minAndMaxTemp">{ conditions } | { Math.round(minTemp) }&#176; | { Math.round(maxTemp) }&#176;</p>
        </div>
    )
} 

export default DisplayCurrentWeather;