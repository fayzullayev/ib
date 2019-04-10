import React, {Component} from 'react';
import SetAjax from '../../services/SetAjax';
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
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask'
import Footer from '../footer';
import FinishForgotPassword from '../finish-forgot-password';
import {Link} from "react-router-dom";
import Translations from '../../translations/translations';
import Api from '../../services/api';
import InnerWaiting from "../spinner-opacity";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './forgot-password.css';
//const  AABIcon = require('../../assets/AABIcon.png');


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#25265E'
        },
        secondary: {
            main: '#ffc004'
        }
    },

    typography: {useNextVariants: true}
});

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
    submit: {
        marginTop: theme.spacing.unit * 2,
        borderRadius: "23px",
        boxShadow: "4px 5px 9px rgba(255, 192, 4, 0.19);",
        margin: "auto",
        fontSize: "14px",
        padding: "10px 60px",
    },
    registrationLink: {
        fontSize: "13px",
        textAlign: "right"
    },
    forgotPasswordLink: {
        fontSize: "13px",
        textAlign: "left"
    },
    linksParent: {
        marginTop: 5
    },
    enterAccount: {
        fontSize: "24px",
        marginTop: 5,
        fontWeight: 500,
        textAlign: "center"
    },
    goToLogin: {
        fontSize: "12px",
        color: "#000000",
        textAlignLast: "center",
        marginTop: "16px"
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
        width: 375,
        display: "flex",
        alignItems: "center",
        marginLeft: 'auto',
        marginRight: 'auto',
    }
});


class ForgotPassword extends Component {
    api = new Api();

    constructor(props) {
        super(props);
        this.state = {
            request: "forgot_password",
            login: "",
            redirect: true,
            waiting: false,
            currentLanguage: this.props.language.lang,
            snackBarOpen: false,
            snackBarMessage: ""
        }

    }

    handler = (e) => {
        e.preventDefault();
        if (this.state.login) {
            this.setState({
                waiting: true
            });
            let r = {
                request: "forgot_password",
                login: this.state.login.replace(/[^0-9]/g, ''),
            };
            this.api.SetAjax(r).then(data => {
                console.log("data ----------------- ", data);
                if (data.result === 0) {
                    //initializing reducer
                    this.props.addInfo(
                        {
                            login: this.state.login.replace(/[^0-9]/g, ''),
                        }
                    );
                    this.setState({
                        redirect: !this.state.redirect,
                        waiting: false
                    })
                } else if (data.result !== 0) {
                    this.setState({
                        waiting: false
                    })
                }
            }).catch(err => {
                this.setState({
                    waiting: false
                })
            });

        } else {
            // alert("Enter info plz");
            this.setState({
                snackBarOpen: true,
                snackBarMessage: Translations.ForgotPassord.enterPhoneNo[this.props.language.lang]
            })
        }
    };

    handleClose = (event) => {
        this.setState({
            snackBarOpen: false
        })
    };
    loginHandler = (event) => {
        let login = event.target.value;
        login = login.replace(/[^0-9]/g, '');
        this.setState({
            login: login
        })
    };

    render() {
        let {redirect} = this.state;
        const {classes} = this.props;
        const currentLanguage = this.props.language.lang;
        console.log(this.props);
        const lan = Translations.ForgotPassord;
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <div className={`${classes.parentDiv} Forgot-password`} >
                        <div style={{position: "relative"}} className={`${classes.main} innerDiv`}>
                            {this.state.waiting ? <InnerWaiting/> : null}
                            <Paper className={classes.paper}>
                                {redirect ? <div>
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
                                            <Typography className={`${classes.enterAccount} subtitle`}
                                                        color="primary">
                                                {lan.doYouForgotPassword[currentLanguage]} {/*Забыли пароль?*/}
                                            </Typography>
                                            <div className={classes.stick}></div>
                                        </div>
                                    </Grid>
                                    <form className={classes.form}>
                                        <FormControl margin="normal" required fullWidth className={classes.form}>
                                            <InputMask
                                                mask="+\9\98 99 999 99 99"
                                                onChange={this.loginHandler}
                                            >
                                                {() => <TextField
                                                    autoFocus
                                                    label={lan.phoneNumber[currentLanguage]}
                                                    placeholder="+998 xx xxx xx xx"
                                                    margin="normal"
                                                    type="text"
                                                />}
                                            </InputMask>
                                        </FormControl>
                                        <Grid container justify="center" alignItems="center">
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                className={`${classes.submit} Forgot-password-button`}
                                                onClick={this.handler}
                                            >
                                                {lan.send[currentLanguage]}{/*Отправить*/}
                                            </Button>
                                        </Grid>
                                    </form>
                                    <Grid container justify="center" alignItems="center">
                                        <Typography
                                            color="primary">
                                            <Link to="/" style={{textDecoration: "none"}}>
                                                <Button className={classes.goToLogin}>
                                                    {lan.login[currentLanguage]} {/*Вернуться в аккаунт*/}
                                                </Button>
                                            </Link>
                                        </Typography>
                                    </Grid>
                                </div> : <div>
                                    <FinishForgotPassword/>
                                </div>
                                } </Paper>
                        </div>
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
                                <CloseIcon/>
                            </IconButton>,
                        ]}
                    />
                    <Footer/>
                </MuiThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.setLanguage
    }
};
const mapDispatchToProps = dispatch => {
    return {
        addInfo: (info) => dispatch({
            type: actionTypes.forgotPasswordCredentials,
            info: info
        })
    }
};
ForgotPassword.propTypes = {
    classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ForgotPassword))