import React from 'react';

function HourlyWeather(fiveDayWeatherData) {

    // var { list } = fiveDayWeatherData;

    // var temp;
    // var condition;
    // var timeRaw;
    // var time = "";
 
    // var hourlyHTML = "";

    // for (var i = 0; i < 5; i++) {
    //     temp = Math.round(list[i].main.temp);
    //     condition = list[i].weather[0].main;
    //     timeRaw = new Date(list[i].dt_txt).toLocaleTimeString();

    //     if (timeRaw.length === 10) {
    //         // remove indexes 4,5,6
    //         time = timeRaw.slice(0,4);
    //     } else {
    //         // remove indexes 5,6,7
    //         time = timeRaw.slice(0,5);
    //     }
        


    // }
  
    return(
        <div>
            <h3>Hourly Data Here</h3>
            {/* <div id="hourlyData">{ hourlyHTML }</div> */}
        </div>
    )
}

export default HourlyWeather;