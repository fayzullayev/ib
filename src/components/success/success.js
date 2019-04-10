import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles"
import "./success.css"
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button"
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Translations from "../../translations/translations.json";

const styles = (theme) => ({
   submit : theme.submit
});

class Success extends Component {

    state ={

    };

    render () {
        const lang =this.props.currentLang?this.props.currentLang.language:"ru";
        const { text } = this.props;
        const { classes } = this.props;
        if(this.props.toCards){
            return (
                <div className = "success-container">
                    {/*<div className="success-label">*/}
                        {/*<div className="success-label1"></div>*/}
                        {/*<div className="success-label2"></div>*/}
                        {/*<div className="success-label3"></div>*/}
                    {/*</div>*/}
                    <div className="check_mark">
                        <div className="sa-icon sa-success animate">
                            <span className="sa-line sa-tip animateSuccessTip"></span>
                            <span className="sa-line sa-long animateSuccessLong"></span>
                            <div className="sa-placeholder"></div>
                            <div className="sa-fix"></div>
                        </div>
                    </div>
                    <div className='success-text'>
                    {Translations.successMessage[lang]}
                    </div>
                    <p className="success-text">
                        {text}
                    </p>
                    <Link to='/' style={{textDecoration:"none"}}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={this.props.toCards}
                        className={classes.submit}
                    >
                        Вернуться на карты
    
                    </Button>
                    </Link>
                </div>
            );
        }
        else
        return(
            <div className = "success-container">
                {/*<div className="success-label">*/}
                    {/*<div className="success-label1"></div>*/}
                    {/*<div className="success-label2"></div>*/}
                    {/*<div className="success-label3"></div>*/}
                {/*</div>*/}
                <div className="check_mark">
                    <div className="sa-icon sa-success animate">
                        <span className="sa-line sa-tip animateSuccessTip"></span>
                        <span className="sa-line sa-long animateSuccessLong"></span>
                        <div className="sa-placeholder"></div>
                        <div className="sa-fix"></div>
                    </div>
                </div>
                <div className='success-text'>
                    Успешно выполнена
                </div>
                <p className="success-text">
                    {text}
                </p>
                <Link to={this.props.url} style={{textDecoration:"none"}}>
                <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                >
                    Вернуться на главное

                </Button>
                </Link>
            </div>
        );
    }
}



Success.propTypes = {
    classes: PropTypes.object.isRequired
};

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
)(withStyles(styles)(Success));