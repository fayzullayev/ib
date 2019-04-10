import React, { Component } from 'react';
import waiting from "./assets/waiting.png";
import "./waiting-opacity.css"
import Spinner from "../spinner"

class WaitingOpacity extends Component {

    state ={

    };

    render () {
        return (
            <div className = "waiting-container2">
                <Spinner/>
            </div>
        );
    }
}

export default WaitingOpacity;