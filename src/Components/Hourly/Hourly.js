import React from 'react';
import './Hourly.css';
import WeatherIcon from '../../weatherAnimation/WeatherIcon';

function Hourly(weatherData) {

    var { hourly } = weatherData;

    var temp;
    var condition;
    var hourlyData = [];

    for (var i = 1; i < 13; i++) {
        temp = Math.round(hourly[i].temp);
        condition = hourly[i].weather[0].id;
        
        var hour = new Date((weatherData.hourly[i].dt) * 1000).getHours();
                
        var ifAmOrPm = hour > 12 ? 'PM' : 'AM';

        hour = hour > 12 ? hour - 12 : hour;
        hour = hour === 0 ? hour + 12 : hour;
        
        hourlyData.push(
            <div key={ i } className = "dataWrapper">
                <p className="dataValue">{ hour }:00 { ifAmOrPm }</p>
                <div><WeatherIcon condition={condition} time={hour} /></div>
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