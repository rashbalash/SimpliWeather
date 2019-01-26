import React from 'react';
import './Hourly.css';
import WeatherIcon from './weatherAnimation/WeatherIcon';

function Hourly(dailyWeatherData) {

    var { list } = dailyWeatherData;

    var temp;
    var condition;
    var timeRaw;
    var time = "";
    var hourlyData = [];
    var UTCtime;

    for (var i = 0; i < 9; i++) {
        temp = Math.round(list[i].main.temp);
        condition = list[i].weather[0].id;
        timeRaw = new Date(list[i].dt_txt).toLocaleTimeString();
        UTCtime = new Date(list[i].dt_txt).getHours();        
        
        if (timeRaw.length === 10) {
            // remove indexes 4,5,6
            time = timeRaw.slice(0,4);
        } else {
            // remove indexes 5,6,7
            time = timeRaw.slice(0,5);
        }
        
        hourlyData.push(
            <div className = "dataWrapper">
                <p className="dataValue">{ time }</p>
                <div>{ WeatherIcon(condition, UTCtime) }</div>
                <p className = "dataValue">{ temp }&#176;</p>
            </div>
        );
    }
  

    return(
        <div id="hourlyDataWrapper">
            { hourlyData }
        </div>
    )
}

export default Hourly;