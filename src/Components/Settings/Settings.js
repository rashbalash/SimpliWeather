import React, { Component } from 'react';
import './Settings.css';

import { ReactComponent as Imperial } from './settingIcons/fahrenheit.svg';
import { ReactComponent as Metric } from './settingIcons/celsius.svg';
import { ReactComponent as About } from './settingIcons/about.svg';
import { ReactComponent as Mode } from './settingIcons/darkorlight.svg';
import { ReactComponent as Search } from './settingIcons/search.svg';
import { ReactComponent as Trash } from './settingIcons/trash.svg';

class Settings extends Component {


    handleClear = (e) => {
        localStorage.clear();
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

    render() {
        return (
            <div>
                {/* Add | Search */}
                <button><Search className="svgIcon" /></button>

                {/* Celsius | Fahrenheit */}
                <button onClick= { this.props.handleTempScaleChange }>{ this.getScaleIcon() }</button>
                
                {/* Dark Mode | Light Mode */}
                <button onClick= { this.handleMode }> <Mode className="svgIcon" /> </button>

                {/* Clear Data */}
                <button onClick= { this.handleClear }> <Trash className="svgIcon" /> </button>

                {/* About */}
                <button><About className="svgIcon" /></button>
            </div>
        )
    }

}

export default Settings;