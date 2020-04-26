import React from 'react';
import './CurrentWeather.css';
import Daily from '../Daily/Daily';
import Hourly from '../Hourly/Hourly';
import WeatherIcon from '../../weatherAnimation/WeatherIcon';
import Settings from '../Settings/Settings';


function windUnits(windSpeed, windDirection, tempScale) {
    if (tempScale === "imperial") {
        return <p id="matValue">{ Math.round(windSpeed) } mph { windDirection }</p>
    } else {
        return <p id="matValue">{ Math.round(windSpeed) } kmh { windDirection }</p>
    }
  }

function rainUnits(rainPrecipitation, tempScale) {

    if (tempScale === "imperial") {
        return <p id="matValue">{ rainPrecipitation } Inches</p> 
    } else {
        return <p id="matValue">{ rainPrecipitation } Centimeters</p> 
    }
}

function CurrentWeather(weatherData, dailyWeatherData, tempScale, handleTempScaleChange, handleMode, mode) {

    var { name, sys, main, weather, wind } = weatherData;
    
    // Current
    var country = sys.country;
    var mainTemp = main.temp;
    var minTemp = main.temp_min;
    var maxTemp = main.temp_max;
    var conditions = weather[0].main;
    var conditionNumber = weather[0].id;
    var currentTime = new Date().getHours();

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
        var rainPrecipitation = Math.round((rain["1h"]*0.0393701)*10)/10;
    } else {
        rainPrecipitation = 0;
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
        sunrise += sunriseTime.slice(7);
    } else {
        // remove indexes 5,6,7
        sunrise = sunriseTime.slice(0,5);
        sunrise += sunriseTime.slice(8);
    }

    if (sunsetTime.length === 10) {
        // remove indexes 4,5,6
        sunset = sunsetTime.slice(0,4);
        sunset += sunsetTime.slice(7);
    } else {
        // remove indexes 5,6,7
        sunset = sunsetTime.slice(0,5);
        sunset += sunsetTime.slice(8);
    }

    return(
        <div>
            <p id="locationName">{ name }, { country }</p>
            

            <div id="currentWeatherContainer">
                        
                
                <div id="currentTemperatureContainer"> 
                    {/* Display Icon Based On Weather */}
                    <div className="tempAndIcon">
                        <div id="weatherIcon">{ WeatherIcon(conditionNumber, currentTime, 2) }</div>
                        <p id="locationTemp">{ Math.round(mainTemp) }&#176;</p>
                    </div>
                    
                    <p id="minAndMaxTemp">{ conditions } | { Math.round(maxTemp) }&#176; | { Math.round(minTemp) }&#176; </p>
                </div>  

                <div id="hourlyAndDailyTemperatureContainer">
                    <div id="hourlyDailyWrapper">
                    <h1 id="section">Hourly</h1>
                    { dailyWeatherData.hasOwnProperty('city') ? 
                        Hourly(dailyWeatherData) :
                        ""
                    }

                    <h1 id="section">Daily</h1>
                    { dailyWeatherData.hasOwnProperty('city') ? 
                        Daily(dailyWeatherData) :
                        ""
                    }
                    </div>

                    <div id="MATContainer">
                        <h1 id="MATSection">More About Today</h1>
                        <div id="sectionWrapper">
                            <div id="matLeft">
                                <p id="matTitle">Precipitation</p>       
                                { rainUnits(rainPrecipitation, tempScale) }

                                <p id="matTitle">Sunrise</p>
                                <p id="matValue">{ sunrise }</p>

                                <p id="matTitle">Wind</p>
                                { windUnits(windSpeed, windDirection, tempScale) }
                            </div>
                            
                            <div id="matRight">
                                <p id="matTitle">Humidity</p>
                                <p id="matValue">{ humidity }%</p>

                                <p id="matTitle">Sunset</p>
                                <p id="matValue">{ sunset }</p>

                                <p id="matTitle">Pressure</p>
                                <p id="matValue">{ pressure } hPa</p>
                            </div>                
                        </div>
                    </div>
                </div>
            
                <div className="break"></div>
                
                <Settings id="settingsButtons" tempScale={ tempScale } handleTempScaleChange = { handleTempScaleChange } handleMode = { handleMode } mode= { mode } />

            </div>
        </div>
    )
} 

export default CurrentWeather;