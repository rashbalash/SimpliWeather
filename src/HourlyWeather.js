import React from 'react';
import './HourlyWeather.css';

function HourlyWeather(fiveDayWeatherData) {

    var { list } = fiveDayWeatherData;

    var temp;
    var condition;
    var timeRaw;
    var time = "";
 
    var hourlyData = [];

    for (var i = 0; i < 9; i++) {
        temp = Math.round(list[i].main.temp);
        condition = list[i].weather[0].main;
        timeRaw = new Date(list[i].dt_txt).toLocaleTimeString();

        if (timeRaw.length === 10) {
            // remove indexes 4,5,6
            time = timeRaw.slice(0,4);
        } else {
            // remove indexes 5,6,7
            time = timeRaw.slice(0,5);
        }
        
        
        hourlyData.push(
            <div className = "dataWrapper">
                <p>{ time }</p>
                <p>{ temp }</p>
                <p>{ condition }</p>
            </div>
        );

    }
  
    return(
        <div id="hourlyDataWrapper">
            { hourlyData }
        </div>
    )
}

export default HourlyWeather;