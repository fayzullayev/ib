import React, { Component } from 'react';
import waiting from "./assets/waiting.png";
import "./waiting.css"
import Spinner from "../spinner"

class Waiting extends Component {

    state ={

    };

    render () {
        return (
            <div className = "waiting-container">
                <img src={waiting} alt = "Waiting"/>
                <p className = 'waiting-title'>Подождите, идет операция</p>
                <p className = 'waiting-text'>Пожалуйста, из системы
                    <br/> не выходите</p>
                <div className = 'waiting-stick'></div>
                <Spinner/>
            </div>
        );
    }
}

export default Waiting;