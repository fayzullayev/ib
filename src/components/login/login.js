import React, {Component} from 'react';
import LoginSMS from '../login-sms';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/Actions';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AABIcon from '../../assets/logo.png';
import Grid from '@material-ui/core/Grid';
import {MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';
import Footer from "../footer";
import Translation from '../../translations/translations.json';
import {Link} from "react-router-dom";
import theme from '../../theme/theme';
import './login.css';
import InnerWaiting from "../spinner-opacity";
import Api from '../../services/api';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
//const  AABIcon = require('./assets/AABIcon.svg');

const styles = theme => ({
    main: {
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 375,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    paper: {
        display: 'flex',
        flexDirection: 'column',
        position : 'relative',
        alignItems: 'center',
        borderRadius: "10px",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },

    footer: {
        border: "red",
    },

    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.secondary,
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        margin: "none",
        marginTop: theme.spacing.unit * 0.5,
        marginBottom: -theme.spacing.unit,
    },
    submit: theme.submit,
    registrationLink: {
        fontSize: "13px",
        textAlign: "right"
    },

    forgotPasswordLink: {
        fontSize: "13px",
        textAlign: "left"
    },

    linksParent: {
        marginTop: 5,
        marginBottom: 5
    },

    enterAccount: {
        fontSize: "24px",
        marginTop: 5,
        fontWeight: 500,
        textAlign:"center",
        textAlignLast: "center"
    },

    stick: {
        width: "148px",
        height: "3px",
        backgroundColor: "#ffd897",
        margin: "8px auto"
    },

    login: {
        margin: "8px",
    },

    paddingLeft30: {
        paddingLeft: "30px",
    },

    languageIcon: {
        width: "16px",
        height: "16px",
        marginRight: "5px"
    },

    fontSize12: {
        fontSize: "12px",
        marginTop: 8,
        color: "rgba(0, 0, 0, 0.5)"
    },
    parentDiv: {
        height: "95vh",
        display: "flex",
        alignItems: "center"
    }
});


class Login extends Component {
    api = new Api();

    constructor(props) {
        super(props);
        this.state = {
            request: "request_sms",
            login: "",
            password: "",
            redirect: true,
            waiting: false,
            snackBarOpen: false,
            snackBarMessage: ""
        }

    }

    handler = (event) => {
        event.preventDefault();


        if (this.state.login && this.state.password) {
            this.setState({
                waiting: true
            });
            let r = {
                request: "request_sms",
                login: this.state.login.replace(/[^0-9]/g, ''),
                password: this.state.password
            };

            this.api.SetAjax(r).then(data => {
                console.log("data ----------------- ",data);
                    if (data.result === 0) {
                        this.props.addUserInfo(
                            {
                                login: this.state.login.replace(/[^0-9]/g, ''),
                                password: this.state.password
                            }
                        );
                        this.setState({
                            redirect: !this.state.redirect,
                            waiting: false
                        })
                    } else if(data.result !== 0){
                        this.setState({
                            waiting: false
                        })
                    }
            }).catch(err=>{
                //alert(err.responseText);
                this.setState({
                    waiting: false,
                    snackBarOpen:true,
                    snackBarMessage: err.responseText
                })
            });

        } else {
            // alert("Enter info plz");
            this.setState({
                snackBarOpen:true,
                snackBarMessage: Translation.lanEnterInfo[this.props.currentLang.lang]
            })
        }
    };
    loginHandler = (event) => {
        let login = event.target.value;
        this.setState({
            login: login
        })
    };
    passwordHandler = (event) => {
        let pass = event.target.value;
        this.setState({
            password: pass
        })
    };
    handleClose = (event) => {
        this.setState({
            snackBarOpen: false
        })
    };

    render() {
        let lang = this.props.currentLang.lang;
        let {redirect} = this.state;
        const {classes} = this.props;
        let login = null;
        if (redirect) {
            login = (
                <div style={{display: "relative"}}>

                    <Grid container justify="center" alignContent="center" alignItems="center"
                          style={{
                              marginTop: theme.spacing.unit
                          }}>
                        <Avatar alt="Asia Alliance Bank" src={AABIcon} className={classes.avatar}/>
                        <Typography component="h3" variant="h6" className="bank-name">
                            Asia Alliance Bank
                        </Typography>
                    </Grid>
                    <Grid container justify="center">
                        <div>
                            <Typography className={`${classes.enterAccount} login-title `}
                                        color="primary">
                                {Translation.lanLogin[lang]}
                            </Typography>
                            <div className={classes.stick}></div>
                        </div>

                    </Grid>
                    <form className={classes.form}>
                        {this.state.waiting ? <InnerWaiting/> : null}
                        <FormControl margin="normal" required fullWidth>
                            <InputMask
                                mask="+\9\98 99 999 99 99"
                                onChange={this.loginHandler}
                            >
                                {() => <TextField
                                    autoFocus
                                    label={Translation.lanPhoneNumber[lang]}
                                    placeholder="+998 xx xxx xx xx"
                                    margin="normal"
                                    type="text"
                                />}
                            </InputMask>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth className={classes.form}>

                            <TextField
                                onChange={this.passwordHandler}
                                id="standard-password-input"
                                label={Translation.lanPassword[lang]}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                placeholder="* * * * *"

                            />

                        </FormControl>
                        <Grid container spacing={24} className={`${classes.linksParent} links-parent `}>
                            <Grid item xs={6} className={`${classes.forgotPasswordLink} links`}>
                                <Link to="/forgotPassword" style={{textDecoration: "none"}}>
                                    <Button className="links">
                                        {Translation.lanForgotPassword[lang]} {/*Забыли пароль?*/}
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={6} className={`${classes.registrationLink} links`}>
                                <Link to="/registration" style={{textDecoration: "none"}}>
                                    <Button className="links">
                                        {Translation.lanRegistration[lang]} {/*Регистрация*/}
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" alignItems="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                className={`${classes.submit} Login-button`}
                                onClick={this.handler}
                            >
                                {Translation.lanLogin[lang]} {/* Login to system*/}

                            </Button>
                        </Grid>
                    </form>
                </div>
            );
        } else {
            login = (
                <div>
                    <LoginSMS lang={this.props.currentLang.lang}/>
                </div>)
        }
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline/>
                    <div className={`${classes.parentDiv} Login`} >
                        <Paper className={`${classes.paper}`} style={{margin: "auto"}}>
                            {this.state.waiting ? <InnerWaiting/> : null}
                            {login}
                        </Paper>
                    </div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={this.state.snackBarOpen}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.snackBarMessage}</span>}
                        action={[

                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                    <Footer/>
                </MuiThemeProvider>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentLang: state.setLanguage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addUserInfo: (info) => dispatch({
            type: actionTypes.LoginPasswords,
            info: info
        })
    }
};

Login.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))