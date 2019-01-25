import React from 'react';

function DisplayFiveDayWeather(fiveDayWeatherData) {

    const { list } = fiveDayWeatherData;

    var timeRaw;

    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dayOfWeek = "";

    var fiveDayData = [];
    var todaysDate = new Date().getUTCDate();
    var listDate;
    var minTemp = 0;
    var maxTemp = 0;
    var condition = 0;

    console.log(fiveDayWeatherData);

    for (var i = 0; i < list.length; i++) {

        listDate = new Date(list[i].dt_txt).getUTCDate();

        if (todaysDate === listDate) continue;

        var newDay = 0;
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


            i++;
            newDay++;

            if (!list[i]) {
                break;
            } 
        }

        fiveDayData.push(
            <div className = "dataWrapper">
                <p className = "dayOfWeek">{ dayOfWeek }</p>
                <p className = "dataValue">{ minTemp }&#176; | { maxTemp }&#176;</p>
                {/* <p className = "dataValue">{ condition }</p> */}
            </div>
        );

    }

    return (
        <div>
            <h3>Daily Data Here</h3>
            { fiveDayData }
        </div>
    )
}

export default DisplayFiveDayWeather;