import React , { Component } from "react";
import './line.css';


class Line extends Component{


    render(){
        return (
            <div className='line-container' >
                <div className="line-border line-box"></div>
            </div>
        )
    }
}

export default Line;