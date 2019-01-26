import React from 'react';
import './Daily.css';
import WeatherIcon from './weatherAnimation/WeatherIcon';

function Daily(dailyWeatherData) {

    const { list } = dailyWeatherData;

    var timeRaw;

    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var dayOfWeek = "";

    var dailyData = [];
    var daysConditions = [];
    var todaysDate = new Date().getDay();
    var listDate;
    var minTemp = 0;
    var maxTemp = 0;
    var condition;

    for (var i = 0; i < list.length; i++) {

        listDate = new Date(list[i].dt_txt).getDay();

        if (todaysDate === listDate) {
            continue;
        }

        var newDay = 0;
        daysConditions = [];
        minTemp = Math.round(list[i].main.temp_min);
        maxTemp = Math.round(list[i].main.temp_max);

        timeRaw = new Date(list[i].dt_txt);
        dayOfWeek = week[timeRaw.getDay()];    

        while (newDay < 8) {

            if (minTemp > Math.round(list[i].main.temp_min)) {
                minTemp = Math.round(list[i].main.temp_min);
            }

            if (maxTemp < Math.round(list[i].main.temp_max)) {
                maxTemp = Math.round(list[i].main.temp_max);
            }

            daysConditions.push(list[i].weather[0].id);

            i++;
            newDay++;

            if (!list[i]) {
                break;
            } 
        }
                
        var averageCondition = daysConditions.reduce( (prev, cur) => {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
        }, {});

        condition = Object.keys(averageCondition)[0];
        
        dailyData.push(
            <div className = "dailyData">
                <p className = "dayOfWeek">{ dayOfWeek }</p>
                <div>{ WeatherIcon(condition, 12) }</div>
                <p className = "dataValue">{ minTemp }&#176; | { maxTemp }&#176;</p>
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