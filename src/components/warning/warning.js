import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles"
import "./warning.css"
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button"
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Translations from "../../translations/translations"

const styles = (theme) => ({
   submit : theme.submit,
});

class Warning extends Component {

    state ={

    };

    render () {
        const { text,url } = this.props;
        const { classes,language } = this.props;
        const {returnToMain} = Translations.Warning
        return (
            <div className = "warning-container">
                {/*<div className="success-label">*/}
                    {/*<div className="success-label1"></div>*/}
                    {/*<div className="success-label2"></div>*/}
                    {/*<div className="success-label3"></div>*/}
                {/*</div>*/}
                <div className="f-modal-alert">
                   <div className="f-modal-icon f-modal-warning scaleWarning">
                        <span className="f-modal-body pulseWarningIns"/>
                        <span className="f-modal-dot pulseWarningIns"/>
                   </div>
                </div>
                <p className="warning-text">
                    <span style={{fontSize : '20px', fontWeight : 'bold'}}>{this.props.error}</span>
                    {text}
                </p>
                <Link to={url/*this.props.url === undefined || this.props.url=== null || this.props.url === '/' ? '/' : '/main'*/} style={{textDecoration:"none"}}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className={`${classes.submit} warning-btn`}
                    >
                        {returnToMain[language]}

                    </Button>
                </Link>
            </div>
        );
    }
}



Warning.propTypes = {
    classes: PropTypes.object.isRequired
};



const mapStateToProps = state => {
    return {
        language: state.menuItems.language,
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles)(Warning)));
