import React from 'react';
import './WeatherIcon.css';

import { ReactComponent as Cloudy } from './animated/cloudy.svg';
import { ReactComponent as CloudyDay } from './animated/cloudyDay.svg';
import { ReactComponent as CloudyNight } from './animated/cloudyNight.svg';
import { ReactComponent as Day } from './animated/day.svg';
import { ReactComponent as HeavyRain } from './animated/heavyRain.svg';
import { ReactComponent as HeavySnow } from './animated/heavySnow.svg';
import { ReactComponent as LightSnow } from './animated/lightSnow.svg';
import { ReactComponent as Night } from './animated/night.svg';
import { ReactComponent as RainySunny } from './animated/rainySunny.svg';
import { ReactComponent as Thunder } from './animated/thunder.svg';

function WeatherIcon(condition, time) {
    
    // Series of if statements to select and display correct SVG
    
    var returnCondition;

    if (condition === 799) {
        returnCondition = <Night className="iconSize" />;

    } else if (condition >= 200 && condition <= 232) {
        returnCondition = <Thunder />;

    } else if (condition > 801 && condition <= 804) {
        returnCondition = <Cloudy />;

    } else if (condition === 801) {
        
        if (time >= 6 && time <= 6) {
            returnCondition = <CloudyDay />;
        } else {
            returnCondition = <CloudyNight />;
        }
        
    } else if (condition >= 701 && condition <= 781) {
        returnCondition = <Cloudy />;

    } else if (condition === 600 || (condition >= 611 && condition <= 620)) {
        returnCondition = <LightSnow />;

    } else if (condition === 601 || condition === 602 || condition === 621 || condition === 622) {
        returnCondition = <HeavySnow />;

    } else if (condition === 500 || condition === 501 || condition === 520 || condition === 531) {
        returnCondition = <RainySunny />;

    } else if ((condition >= 502 && condition <= 511) || condition === 521 || condition === 522) {
        returnCondition = <HeavyRain />;

    } else {
        returnCondition = <Day className="iconSize" />;
    }

    return(
        <div>
            { returnCondition }
        </div>
    )
}

export default WeatherIcon;