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
        
        const hourIn24 = new Date((weatherData.hourly[i].dt) * 1000).getHours();
                
        const ifAmOrPm = hourIn24 >= 12 ? 'PM' : 'AM';

        const hour = hourIn24 % 12 === 0 ? 12 : hourIn24 % 12;
        
        console.log(hour);

        hourlyData.push(
            <div key={ i } className = "dataWrapper">
                <p className="dataValue">{ hour }:00 { ifAmOrPm }</p>
                <div><WeatherIcon condition={condition} time={hourIn24} /></div>
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