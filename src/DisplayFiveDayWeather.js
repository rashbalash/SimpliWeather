import React from 'react';

function DisplayFiveDayWeather(fiveDayWeatherData) {

    var { list } = fiveDayWeatherData;

    var timeRaw = new Date(list[0].dt_txt);

    var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dayOfWeek = week[timeRaw.getDay()];

    return (
        <div>
            <h3>Daily Data Here</h3>
            <h4>{ dayOfWeek }</h4>
        </div>
    )
}

export default DisplayFiveDayWeather;