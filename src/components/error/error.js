import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles"
import "./error.css"
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button"
import {Link,withRouter} from "react-router-dom"

const styles = (theme) => ({
   submit : theme.submit
});

class Error extends Component {

    state ={};

    render () {
        const { text } = this.props;
        const { classes } = this.props;
        return (
            <div className = "success-container">
                {/*<div className="success-label">*/}
                    {/*<div className="success-label1"></div>*/}
                    {/*<div className="success-label2"></div>*/}
                    {/*<div className="success-label3"></div>*/}
                {/*</div>*/}
                <div className="swal2-icon swal2-error swal2-animate-error-icon" style={{display: 'flex'}}>
                    <span className="swal2-x-mark">
                        <span className="swal2-x-mark-line-left"></span>
                        <span className="swal2-x-mark-line-right"></span>
                    </span>
                </div>
                <p className="success-text" style={{color:"red"}}>
                    {text}
                </p>
                <Link to='/' style={{textDecoration:"none"}}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick = {this.convert}
                    >
                        Вернуться на главную

                    </Button>
                </Link>
            </div>
        );
    }
}



Error.propTypes = {
    classes: PropTypes.object.isRequired
};



export default withRouter(withStyles(styles)(Error));