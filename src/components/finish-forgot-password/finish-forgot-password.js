import React, {Component} from "react";
import SetAjax from '../../services/SetAjax';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AABIcon from '../../assets/logo.png';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';
import {Link, Redirect} from "react-router-dom";
import Translations from '../../translations/translations';
import Api from '../../services/api';
import InnerWaiting from "../spinner-opacity";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
//const  AABIcon = require('../../assets/AABIcon.svg');

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
    enterImportantInfo: {
        fontSize: "16px",
        fontWeight: 300,
        color: "#787993",
        marginLeft: "10px",
        textAlignLast: "center"
    },
    stick: {
        width: "148px",
        height: "3px",
        backgroundColor: "#ffd897",
        margin: "8px auto"
    },
    goToLogin: {
        fontSize: "12px",
        color: "#000000",
        textAlignLast: "center",
        marginTop: "16px"
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
    }
});

class FinishRegistration extends Component {
    api = new Api();

    constructor(props) {
        super(props);
        this.state = {
            request: "reload_password",
            login: this.props.forgotPasswordInfo.login,
            password: null,
            repeatedPassword: null,
            sms_code: "",
            redirect: false,
            waiting: false,
            currentLanguage: "en",
            snackBarOpen: false,
            snackBarMessage: ""
        }

    }
    handleClose = (event) => {
        this.setState({
            snackBarOpen: false
        })
    };

    passwordHandler = (event) => {
        event.preventDefault();
        let pass = event.target.value;
        console.log("password======>", pass);
        // pass = pass.replace(/[^0-9]/g, '');
        this.setState({
            ...this.state,
            password: pass
        })
    };
    repeatedPasswordHandler = (event) => {
        event.preventDefault();
        let repeatedPassword = event.target.value;
        // repeatedPassword = repeatedPassword.replace(/[^0-9]/g, '');
        this.setState({
            repeatedPassword: repeatedPassword
        })
    };
    SMSHandler = (event) => {
        let SMSCode = event.target.value;
        SMSCode = SMSCode.replace(/[^0-9]/g, '');
        this.setState({
            sms_code: SMSCode
        })
    };
    finishForgotPasswordHandler = (e) => {
        e.preventDefault();

        if (this.state.password && this.state.sms_code && this.state.repeatedPassword) {
            this.setState({
                waiting: true
            });
            let r = {
                request: this.state.request,
                login: this.state.login,
                password: this.state.password,
                confirm_password: this.state.repeatedPassword,
                sms_code: this.state.sms_code,
            };
            console.log(r);
            this.api.SetAjax(r).then(responseJson => {
                console.log(responseJson);
                if (responseJson.status === "success") {
                    this.setState({
                        redirect: true,
                        waiting: true
                    })
                } else {
                    this.setState({
                        waiting: false
                    })
                }
            }).catch(err => {
                this.setState({
                    waiting: false
                })
            });

        } else if (this.state.password !== this.state.repeatedPassword) {
            // alert("Repeated password is not same with actual password");
            this.setState({
                snackBarOpen: true,
                snackBarMessage: Translations.ForgotPassord.repeatedPasswordIncorrect[this.props.language.lang]
            })
        } else {
            // alert("Please, fill all inputs!");
            this.setState({
                snackBarOpen: true,
                snackBarMessage: Translations.ForgotPassord.enterInfoSnackBar[this.props.language.lang]
            })
        }
    };

    render() {
        let {redirect, password} = this.state;
        const lan = Translations.ForgotPassord;
        console.log('password  ------------ >', password);
        let currentLanguage = this.props.language.lang;
        const {classes} = this.props;
        if (redirect) {
            return (
                <div>
                    <Redirect to="/"/>
                </div>
            )
        } else {
            return (
                <div style={{position: "relative"}}>
                    {this.state.waiting ? <InnerWaiting/> : null}
                    <Grid container justify="center" alignContent="center" alignItems="center">
                        <Avatar alt="Asia Alliance Bank" src={AABIcon} className={classes.avatar}/>
                        <Typography component="h3" variant="h6" className="bank-name">
                            Asia Alliance Bank
                        </Typography>
                    </Grid>
                    <Grid container justify="center" alignItems="center">
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
                                // onChange={this.phoneNoHandler}
                                value={this.state.login}
                                disabled
                            >
                                {() => <TextField
                                    label={lan.phoneNumber[currentLanguage]}
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
                                label={lan.password[currentLanguage]}
                                type="password"
                                margin="normal"
                                placeholder="* * * * *"

                            />

                        </FormControl>
                        <FormControl margin="normal" required fullWidth className={classes.form}>

                            <TextField
                                onChange={this.repeatedPasswordHandler}
                                id="standard-password-input"
                                label={lan.repeatPassword[currentLanguage]}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                placeholder="* * * * *"
                            />

                        </FormControl>
                        <FormControl margin="normal" required fullWidth className={classes.form}>
                            <InputMask
                                mask=" 9 9 9 9 9"
                                onChange={this.SMSHandler}
                            >
                                {() => <TextField
                                    label={lan.enterAuthenticationCode[currentLanguage]}
                                    placeholder="x x x x x"
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
                                onClick={this.finishForgotPasswordHandler}
                            >
                                {lan.save[currentLanguage]} {/*Сохранить*/}
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
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        forgotPasswordInfo: state.forgotPassword,
        language: state.setLanguage
    }
};

const mapDispatchToProps = () => {
    return {}
};
FinishRegistration.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FinishRegistration));