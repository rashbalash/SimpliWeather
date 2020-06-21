import React from 'react';
import './Daily.css';
import WeatherIcon from '../../weatherAnimation/WeatherIcon';

function Daily(weatherData) {

    console.log(weatherData);

    const { daily } = weatherData;

    var dailyData = [];
    var minTemp = 0;
    var maxTemp = 0;
    var condition;

    for (var i = 0; i < daily.length; ++i) {

        var day = new Date((daily[i].dt) * 1000).toUTCString().slice(0, 3);

        condition = daily[i].weather[0].id;

        minTemp = Math.round(daily[i].temp.min);
        maxTemp = Math.round(daily[i].temp.max);

        
        
        dailyData.push(
            <div key={ i } className = "dailyData">
                <p className = "dayOfWeek">{ day }</p>
                <div><WeatherIcon condition={condition} time={12} /></div>
                <p className = "dataValue">{ maxTemp }&#176; | { minTemp }&#176;</p>
            </div>
        );

    }

    return (
        <div id="dailyDataWrapper">
            { dailyData }
        </div>
    )
}

export default Daily;