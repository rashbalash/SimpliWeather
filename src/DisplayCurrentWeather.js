import React from 'react';
import './DisplayCurrentWeather.css';
import sun from './images/sun.png';

function DisplayCurrentWeather(weatherData) {

    var { name, sys, main, weather, wind } = weatherData;
    
    console.log(weatherData);

    // Current
    var country = sys.country;
    var mainTemp = main.temp;
    var minTemp = main.temp_min;
    var maxTemp = main.temp_max;
    var conditions = weather[0].main;

    // More About Today
    var humidity = main.humidity;
    var pressure = main.pressure;
    var sunriseTime = (new Date(sys.sunrise*1000)).toLocaleTimeString();
    var sunsetTime = (new Date(sys.sunset*1000)).toLocaleTimeString();
    var sunrise = '';
    var sunset = '';
    var windDirection = wind.deg;
    var windSpeed = wind.speed;

    if (weatherData.hasOwnProperty('rain')) {
        var { rain } = weatherData;
        var rainPrecipitation = rain["1h"] ? rain["1h"]*0.0393701 : rain["3h"]*0.0393701;
    }

    // if (weatherData.hasOwnProperty('snow')) {
    //     var { snow } = weatherData;
    //     if (snow["1h"]) {
    //         var snowPrecipitation = snow["1h"] ? snow["1h"]*0.0393701 : snow["3h"]*0.0393701;
    //     }
    // }

    if (sunriseTime.length === 10) {
        // remove indexes 4,5,6
        sunrise = sunriseTime.slice(0,4);
        sunrise += " " + sunriseTime.slice(7);
    } else {
        // remove indexes 5,6,7
        sunrise = sunriseTime.slice(0,5);
        sunrise += " " + sunriseTime.slice(8);
    }

    if (sunsetTime.length === 10) {
        // remove indexes 4,5,6
        sunset = sunsetTime.slice(0,4);
        sunset += " " + sunsetTime.slice(7);
    } else {
        // remove indexes 5,6,7
        sunset = sunsetTime.slice(0,5);
        sunset += " " + sunsetTime.slice(8);
    }

    function handleClear(e) {
        localStorage.clear();
        window.location.reload();
    }

    return(
        <div id="currentWeatherCointainer">
            <p id="locationName">{ name }, { country }</p>

            {/* Display Icon Based On Weather */}
            <div className="tempAndIcon">
                <img src={ sun } alt="sunny" id="weatherIcon"/>
                <p id="locationTemp">{ Math.round(mainTemp) }&#176;</p>
            </div>
            
            <p id="minAndMaxTemp">{ conditions } | { Math.round(minTemp) }&#176; | { Math.round(maxTemp) }&#176;</p>

            <br/> 
            <h1 id="section">Hourly</h1>
            <br/>
            <h1 id="section">Daily</h1>
            <br/>
            <h1 id="section">More About Today</h1>
            <div id="matPrecipitation">
                <p id="matTitle">Precipication:</p>       
                <p id="matValue">{ Math.round(rainPrecipitation) } Inches</p> 
            </div>
            <div>
                <p id="matTitle">Humidity:</p>
                <p id="matValue">{ humidity }%</p>
            </div>
            


            <br/>
            <br/>
            <br/>
            <p id="matTitle">Sunrise: { sunrise }</p>
            <p id="matTitle">Sunset: { sunset }</p>
            <p id="matTitle">Wind Direction: { windDirection } Degrees</p>
            <p id="matTitle">Wind Speed: { Math.round(windSpeed) } mph</p>
            <p id="matTitle">Pressure: { pressure } hPa</p>

            <button id="clearData" onClick= { handleClear }>Clear Your Data</button>
            <br/>

        </div>
    )
} 

export default DisplayCurrentWeather;