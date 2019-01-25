import React from 'react';
import { ReactComponent as Day } from './animated/day.svg';

function WeatherIcon(condition) {
    
    // Series of if statements to select and display correct SVG
    
    return(
        <Day />        
    )
}

export default WeatherIcon;