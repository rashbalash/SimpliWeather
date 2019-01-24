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
    
    var windDegree = Math.round(((wind.deg) / 45) + 0.5);
    var windArr = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    var windDirection = windArr[(windDegree%8)];
    var windSpeed = wind.speed;

    if (weatherData.hasOwnProperty('rain')) {
        var { rain } = weatherData;
        var rainPrecipitation = Math.round((rain["1h"])*10)/10;
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
            <br/>
            <div id="sectionWrapper">
                <div id="matLeft">
                    <p id="matTitle">Precipication</p>       
                    <p id="matValue">{ rainPrecipitation } Inches</p> 
                </div>
                
                <div id="matRight">
                    <p id="matTitle">Humidity</p>
                    <p id="matValue">{ humidity }%</p>
                </div>
                
                <div id="matLeft">
                    <p id="matTitle">Sunrise</p>
                    <p id="matValue">{ sunrise }</p>
                </div>
                
                <div id="matRight">
                    <p id="matTitle">Sunset</p>
                    <p id="matValue">{ sunset }</p>
                </div>
                
                <div id="matLeft">
                    <p id="matTitle">Wind</p>
                    <p id="matValue">{ Math.round(windSpeed) } mph { windDirection }</p>
                </div>
                
                <div id="matRight">
                    <p id="matTitle">Pressure</p>
                    <p id="matValue">{ pressure } hPa</p>
                </div>                
            </div>
            
            <br/>
            <button id="clearData" onClick= { handleClear }>Clear Your Data</button>

        </div>
    )
} 

export default DisplayCurrentWeather;