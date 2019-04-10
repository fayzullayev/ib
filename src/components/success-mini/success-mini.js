import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles"
import "./success-mini.css"
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button"
// import {Link} from "react-router-dom";
const styles = (theme) => ({
   submit : theme.submit
});

class SuccessMini extends Component {

    state ={

    };

    render () {
        const { text } = this.props;
        const { classes,close } = this.props;
        return (
            <div className = "mini-success-container">
                {/*<div className="success-label">*/}
                    {/*<div className="success-label1"></div>*/}
                    {/*<div className="success-label2"></div>*/}
                    {/*<div className="success-label3"></div>*/}
                {/*</div>*/}
                <div className="mini-check_mark">
                    <div className="mini-sa-icon mini-sa-success mini-animate">
                        <span className="mini-sa-line mini-sa-tip mini-animateSuccessTip"></span>
                        <span className="mini-sa-line mini-sa-long mini-animateSuccessLong"></span>
                        <div className="mini-sa-placeholder"></div>
                        <div className="mini-sa-fix"></div>
                    </div>
                </div>
                <div className='mini-success-text'>
                    Успешно выполнена
                </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick = {()=>close()}
                    >
                        Назад

                    </Button>
            </div>
        );
    }
}



SuccessMini.propTypes = {
    classes: PropTypes.object.isRequired
};



export default withStyles(styles)(SuccessMini);