import React from 'react';

function DisplayCurrentWeather(weatherData) {

    // THIS FUNCTION GETS CALLED TWICE, FIX THAT

    var { name, sys, main } = weatherData;
    var country;
    var temp;

    if (weatherData.hasOwnProperty('sys') && weatherData.hasOwnProperty('main')) {
        country = sys.country;
        temp = main.temp;
    }

    return(
        <div>
            <h1>{ name }</h1>
            <h1>{ country }</h1>
            <h1>{ temp }</h1>
        </div>
    )
} 

export default DisplayCurrentWeather;