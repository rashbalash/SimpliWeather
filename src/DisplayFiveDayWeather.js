import React from 'react';
import './DisplayFiveDayWeather.css';

function DisplayFiveDayWeather(fiveDayWeatherData) {

    const { list } = fiveDayWeatherData;

    var timeRaw;

    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var dayOfWeek = "";

    var fiveDayData = [];
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

            daysConditions.push(list[i].weather[0].main);

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
        
        fiveDayData.push(
            <div className = "dailyData">
                <p className = "dayOfWeek">{ dayOfWeek }</p>
                <p className = "dataValue">{ minTemp }&#176; | { maxTemp }&#176;</p>
                <p className = "dataValue">{ condition }</p>
            </div>
        );

    }

    return (
        <div id="fiveDayDataWrapper">
            { fiveDayData }
        </div>
    )
}

export default DisplayFiveDayWeather;