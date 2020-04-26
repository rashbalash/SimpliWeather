import React, { Component } from 'react';
import './Settings.css';

import { ReactComponent as Imperial } from './settingIcons/fahrenheit.svg';
import { ReactComponent as Metric } from './settingIcons/celsius.svg';
import { ReactComponent as About } from './settingIcons/about.svg';
import { ReactComponent as Dark } from './settingIcons/dark.svg';
import { ReactComponent as Light } from './settingIcons/light.svg';
import { ReactComponent as Search } from './settingIcons/search.svg';
import { ReactComponent as Trash } from './settingIcons/trash.svg';

class Settings extends Component {


    handleClear = (e) => {
        var saveMode = localStorage.getItem("mode");
        localStorage.clear();
        localStorage.setItem("mode", saveMode);
        window.location.reload();
    }

    getScaleIcon = () => {
        // check localstorage if using fahrenheit or celsius
        if (this.props.tempScale === "metric") {
            return <Metric className="svgIcon" />
        } else {
            return <Imperial className="svgIcon" />
        }
    }

    getModeIcon = () => {
        if (this.props.mode === "light") {
            return <Light className="svgIcon" />
        } else {
            return <Dark className="svgIcon" />
        }
    }

    handleModeChange = (e) => {
        this.props.handleMode();
    }

    render() {

        var buttonClassName = this.props.mode === "light" ? "light-button": "dark-button";

        return (
            <div id="settingsWrapper">
                {/* Add | Search */}
                <button className={ buttonClassName } ><Search className="svgIcon" /></button>

                {/* Celsius | Fahrenheit */}
                <button className={ buttonClassName } onClick= { this.props.handleTempScaleChange }>{ this.getScaleIcon() }</button>
                
                {/* Dark Mode | Light Mode */}
                <button className={ buttonClassName } onClick= { this.handleModeChange }>{ this.getModeIcon() }</button>

                {/* Clear Data */}
                <button className={ buttonClassName } onClick= { this.handleClear }> <Trash className="svgIcon" /> </button>

                {/* About */}
                <button className={ buttonClassName }><About className="svgIcon" /></button>
            </div>
        )
    }

}

export default Settings;