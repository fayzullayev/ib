import React, { Component } from 'react';
import {connect} from 'react-redux';
import waiting from "./assets/waiting.png";
import "./waiting.css"
import Spinner from "../spinner"
import Translations from "../../translations/translations.json";

class Waiting extends Component {

    state ={

    };

    render () {
        const lang =this.props.currentLang?this.props.currentLang.language:"ru";
        return (
            <div className = "waiting-container">
                <img src={waiting} alt = "Waiting"/>
                <p className = 'waiting-title'>{Translations.LoadingForm[lang]}</p>
                {/* <p className = 'waiting-text'>Пожалуйста, из системы не выходите</p> */}
                <div className = 'waiting-stick'></div>
                <Spinner/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        currentLang: state.menuItems
    }
}
const mapDispatchToProps = (dispatch) => {
    return {}
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Waiting);