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
import {Link, Redirect} from "react-router-dom"; // Please, do not remove Router here
import Translations from '../../translations/translations';
import Api from '../../services/api';
import InnerWaiting from "../spinner-opacity";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './finish-registration.css';
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
    },
    enterImportantInfo: {
        fontSize: "16px",
        fontWeight: 300,
        color: "#787993",
        marginLeft: "10px",
        textAlignLast: "center"
    },
    goToLogin: {
        fontSize: "12px",
        color: "#000000",
        textAlignLast: "center",
        marginTop: "24px"
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
    }
});

class FinishRegistration extends Component {
    api = new Api();

    constructor(props) {
        super(props);
        this.state = {
            request: "finish_registration",
            phone_number: this.props.registrationInfo.phoneNo,
            card_num: this.props.registrationInfo.card_num,
            date_expire: this.props.registrationInfo.date_expire,
            login: this.props.registrationInfo.phoneNo,
            password: "",
            sms_code: "",
            repeatedPassword: "",
            redirect: false,
            snackBarOpen: false,
            snackBarMessage: ""
        }

    }

    passwordHandler = (event) => {
        let pass = event.target.value;
        pass = pass.replace(/[^0-9]/g, '');
        this.setState({
            password: pass
        })
    };
    repeatedPasswordHandler = (event) => {
        let repeatedPassword = event.target.value;
        repeatedPassword = repeatedPassword.replace(/[^0-9]/g, '');
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
    handleClose = (event) => {
        this.setState({
            snackBarOpen: false
        })
    };
    finishRegistrationButtonHandler = (e) => {
        e.preventDefault();
        if (this.state.password && this.state.sms_code && this.state.repeatedPassword) {
            this.setState({
                waiting: true
            });
            let r = {
                request: this.state.request,
                phone_number: this.state.phone_number,
                card_num: this.state.card_num,
                date_expire: this.state.date_expire,
                login: this.state.login,
                password: this.state.password,
                sms_code: this.state.sms_code,
            };
            console.log(r);
            this.api.SetAjax(r).then(responseJson => {
                if (responseJson.status === "success") {
                    this.setState({
                        redirect: true,
                        waiting: false
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
                snackBarOpen:true,
                snackBarMessage: Translations.Registration.enterInfoSnackBar[this.props.language.lang]
            })
        } else {
            // alert("Please, fill all inputs!");
            this.setState({
                snackBarOpen:true,
                snackBarMessage: Translations.Registration.enterInfo[this.props.language.lang]
            })
        }
    };

    render() {
        let {redirect} = this.state;
        const {classes} = this.props;
        const lan = Translations.Registration;
        const currentLanguage = this.props.language.lang;
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

                        <Typography className={`${classes.enterAccount} registration-title`}
                                    color="primary">
                            {lan.Registration[currentLanguage]}{/*Зарегистрироваться*/}
                        </Typography>
                        <Typography className={`${classes.enterImportantInfo} subtitle`}
                                    color="primary">
                            {lan.enterInfo[currentLanguage]} {/*Пожалуйста, запоните полья <br/>*/}
                            {/*для идентификации*/}
                        </Typography>
                        <div className={classes.stick}></div>


                    </Grid>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth className={classes.form}>
                            <InputMask
                                mask="+\9\98 99 999 99 99"
                                // onChange={this.phoneNoHandler}
                                value={this.state.phone_number}
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
                                autoFocus
                                onChange={this.passwordHandler}
                                id="standard-password-input"
                                label={lan.password[currentLanguage]}
                                type="password"
                                autoComplete="current-password"
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
                                className={`${classes.submit} Registration-button`}
                                onClick={this.finishRegistrationButtonHandler}
                            >
                                {lan.Registration[currentLanguage]}{/*Зарегистрироваться*/}
                            </Button>
                        </Grid>
                    </form>
                    <Grid container justify="center" alignItems="center">
                        <Typography
                            color="primary">
                            <Link to="/" style={{textDecoration: "none"}}>
                                <Button className={classes.goToLogin}>
                                    {lan.login[currentLanguage]}{/*Вернуться в аккаунт*/}
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
        registrationInfo: state.registration,
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