import React from 'react';

function HourlyWeather(fiveDayWeatherData) {

    var { list } = fiveDayWeatherData;

    var temp;
    var condition;
    var timeRaw;
    var time = "";    

    for (var i = 0; i < list.length; i++) {
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
        
        console.log(temp);
        console.log(condition);
        console.log(time);
    }

    return(
        <div>
            <h3>Hourly Data Here</h3>
            <h3>{ time }</h3>
            
        </div>
    )
}

export default HourlyWeather;