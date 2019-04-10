import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import AABIcon from '../../assets/logo.png';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SetTimer from '../../services/setTimer';
import * as actionTypes from '../../store/actions/Actions';
import './login-sms.css';
import Api from '../../services/api';
import InnerWaiting from "../spinner-opacity";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Translation from '../../translations/translations.json';
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
        fontSize: "15px",
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
    stick: {
        width: "148px",
        height: "3px",
        backgroundColor: "#ffd897",
        margin: "8px auto"
    }, goToLogin: {
        fontSize: "12px",
        color: "#000000",
        textAlignLast: "center",
        marginTop: "16px"
    },
    login: {
        margin: "8px",
    }
});

class LoginSms extends Component {
    api = new Api();

    constructor(props) {
        super(props);
        this.state = {
            request: "sign_in",
            login: "998909009090",
            password: "00",
            client_ip: "1",
            auth_type: "SMS",
            card_num: "",
            auth_code: '',
            nls: "RU",
            redirect: false,
            waiting: false,
            snackBarOpen: false,
            snackBarMessage: ""
        };
        this.clickRef = React.createRef();
    }

    handleClose = (event) => {
        this.setState({
            snackBarOpen: false
        })
    };
    handler = (event) => {
        event.preventDefault();

        if (this.state.login && this.state.password && this.state.auth_code) {
            this.setState({
                waiting: true
            });
            let r = {
                "request": "sign_in",
                "login": this.props.userInfo.login,
                "password": this.props.userInfo.password,
                "client_ip": "1",
                "auth_type": "SMS",
                "card_num": "",
                "auth_code": this.state.auth_code.replace(/[^0-9]/g, ''),
                "nls": this.props.currentLang.lang
            };

            this.api.SetAjax(r).then(data => {
                console.log("sending sign in----->", r);
                if (data.status === "success" && data.result === 0) {
                    console.log("Sign in result ------------", data);
                    this.setState({
                        redirect: true,
                        waiting: false
                    });
                    // window.location.href = "dispatch.jsp?relocate=main";
                } else {
                    this.setState({
                        waiting: false
                    });
                }
            }).catch(err => {
                this.setState({
                    waiting: false,
                    snackBarOpen: true,
                    snackBarMessage: err.responseText
                });
            })

        } else {
            // alert("Enter info plz");
            this.setState({
                snackBarOpen: true,
                snackBarMessage: Translation.lanEnterInfo[this.props.currentLang.lang]
            })
        }
    };


    SMSHandler = (event) => {
        let SMS_code = event.target.value;
        console.log("SMS_code -------", SMS_code);
        this.setState({
            auth_code: SMS_code
        });
    };
    refreshHandler = () => {
        window.location.reload();
    };

    render() {
        let lang = this.props.currentLang.lang;
        let {redirect} = this.state;
        const {classes} = this.props;
        if (redirect) {
            // return <Redirect to="/main" />;
            return (
                <div>
                    <div>
                        <Redirect to="main"/>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    {this.state.waiting ? <InnerWaiting/> : null}
                    <Grid container justify="center" alignContent="center" alignItems="center"
                          style={{
                              // marginTop: theme.spacing.unit
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
                                {Translation.lanEnterCode[lang]}{/*Пожалуйста введите код*/}

                            </Typography>
                            <div className={classes.stick}/>
                        </div>

                    </Grid>
                    <form className={classes.form}>
                        <Grid container justify="center" alignContent="center" alignItems="center">
                            <Grid item xs={10}>
                                <FormControl margin="normal" required fullWidth className={classes.form}>
                                    {/*<InputMask*/}
                                    {/*mask=" 9 9 9 9 9"*/}
                                    {/*onChange={this.SMSHandler}*/}
                                    {/*>*/}
                                    {/*{() => <TextField*/}
                                    {/*autoFocus*/}
                                    {/*label="Введите код авторизации"*/}
                                    {/*placeholder="x x x x x"*/}
                                    {/*margin="normal"*/}
                                    {/*type="text"*/}
                                    {/*/>}*/}
                                    {/*</InputMask>*/}
                                    <TextField
                                        autoFocus
                                        onChange={this.SMSHandler}
                                        label={Translation.lanTypeCode[lang]}
                                        type="tel"
                                        margin="normal"
                                    />

                                </FormControl>
                            </Grid>
                            <Grid item xs={2} style={{marginTop: "30px"}}>
                                <SetTimer minutes={2} seconds={0} /*path="registration"*/
                                          refresh /*refresh = {true} */ />
                            </Grid>
                        </Grid>


                        <Grid container justify="center" alignItems="center"
                              style={{
                                  // marginTop: theme.spacing.unit,

                              }}>
                            <Button
                                ref={this.clickRef}
                                type="submit"
                                variant="contained"
                                color="secondary"
                                className={`${classes.submit} Login-button`}
                                onClick={this.handler}
                                style={{fontSize: "14px", padding: "10px 60px"}}
                            >
                                {Translation.lanConfirm[lang]}{/*Подтвердить*/}
                            </Button>
                        </Grid>

                    </form>
                    <Grid container justify="center" alignItems="center">
                        <Typography
                            color="primary">
                            <Link to="/" style={{textDecoration: "none"}}>
                                <Button className={classes.goToLogin} onClick={this.refreshHandler}>
                                    {Translation.lanBackToLogin[lang]}
                                    {/*Вернуться в аккаунт*/}
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
                                <CloseIcon/>
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
        userInfo: state.login,
        currentLang: state.setLanguage

    }
};
const mapDispatchToProps = dispatch => {
    return {
        cardInfo: info =>
            dispatch({
                type: actionTypes.cardInformation,
                info: info
            })
    }
};
LoginSms.propTypes = {
    classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginSms));