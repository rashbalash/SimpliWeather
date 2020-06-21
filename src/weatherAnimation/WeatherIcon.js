import React, { useCallback } from 'react';
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
import { ReactComponent as Rainy } from './animated/rainy.svg';

function WeatherIcon(props) {
    
    const { condition, time, iconSize } = props;
    
    // Series of if statements to select and display correct SVG

    const parsedCondition = parseInt(condition);

    var WeatherSvg;

    if (parsedCondition === 799) {
        WeatherSvg = Night;

    } else if (parsedCondition >= 200 && parsedCondition <= 232) {
        WeatherSvg = Thunder;

    } else if (parsedCondition > 801 && parsedCondition <= 804) {
        WeatherSvg = Cloudy;

    } else if (parsedCondition === 801) {
        
        if (time >= 6 && time <= 18) {
            WeatherSvg = CloudyDay;
        } else {
            WeatherSvg = CloudyNight;
        }
        
    } else if (parsedCondition >= 701 && parsedCondition <= 781) {
        WeatherSvg = Cloudy;

    } else if (parsedCondition === 600 || (parsedCondition >= 611 && parsedCondition <= 620)) {
        WeatherSvg = LightSnow;

    } else if (parsedCondition === 601 || parsedCondition === 602 || parsedCondition === 621 || parsedCondition === 622) {
        WeatherSvg = HeavySnow;

    } else if (parsedCondition === 500 || parsedCondition === 501 || parsedCondition === 520 || parsedCondition === 531) {
        
        if (time >= 6 && time <= 18) {
            WeatherSvg = RainySunny;
        } else {
            WeatherSvg = Rainy;
        }

    } else if ((parsedCondition >= 502 && parsedCondition <= 511) || parsedCondition === 521 || parsedCondition === 522) {
        WeatherSvg = HeavyRain;

    } else {
        if (time >= 6 && time <= 18) {
            WeatherSvg = Day;
        } else {
            WeatherSvg = Night;
        }
    }

    const containerRef = useCallback(scaleIconContainer => {
        
        if (scaleIconContainer !== null && iconSize === 2) {
            const scaleIcon = scaleIconContainer.getElementsByTagName("svg")[0];
            scaleIcon.removeAttribute("width");
            scaleIcon.removeAttribute("height");
            scaleIcon.setAttribute("width", "120px");
            scaleIcon.setAttribute("height", "120px");
            scaleIcon.removeAttribute("viewBox");
            scaleIcon.setAttribute("viewBox", "13 12 35 41");
        }
    }, []);

    return(
        <div ref={containerRef}>
            <WeatherSvg  />
        </div>
    )
}

export default WeatherIcon;