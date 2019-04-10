import React , { Component } from "react";
import './spinner.css'
import AABIcon1 from "./AABIcon1.png"
import PropTypes from 'prop-types';
// const  AABIcon1 = require('./AABIcon1.svg');

class Spinner extends Component {
    state = {
        width : this.props.width,
        height : this.props.height,
        spinnerColor : this.props.spinnerColor,
        borderWidth : this.props.borderWidth
    }

    render(){

        const { width, height, spinnerColor, borderWidth} = this.state;

        return(
            <div className='big-container'>
                <div
                    style = {{ width : width, height : height}}
                    className="spinner-container">
                    <div style={{
                        boxShadow: `0 ${ borderWidth } 0 0 ${ spinnerColor }`
                    }}></div>
                    <img src={AABIcon1} className="icon"/>
                </div>
            </div>
        )
    }
}

Spinner.propTypes = {
    width : PropTypes.string,
    height : PropTypes.string
}

Spinner.defaultProps  = {
    width: "100px",
    height: "100px",
    spinnerColor : "#ffc004",
    borderWidth : "2.5px"
}


export default Spinner;