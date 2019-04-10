import React, {Component} from "react";
import Footer from '../footer';
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
import InputMask from 'react-input-mask';
import FinishRegistration from '../finish-registration';
import {Link} from 'react-router-dom';
import Translations from '../../translations/translations';
import Api from '../../services/api';
import InnerWaiting from "../spinner-opacity";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MyAlliancePdf from '../../assets/MyAlliance.pdf';
import './registration.css';
//const  AABIcon = require('../../assets/AABIcon.svg');

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
        marginBottom: "40px"
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
        textAlignLast: "center",
        textAlign: "center"
    },
    termAndConditions: {
        fontSize: "13px",
        color: "#000000",
        textAlignLast: "center",
        marginTop: "16px",
        textAlign: "center"
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

class Registration extends Component {
    api = new Api();
    constructor(props) {
        super(props);
        this.state = {
            request: "registration",
            phone_number: "",
            card_num: "",
            date_expire: "",
            redirect: true,
            waiting: false,
            snackBarOpen: false,
            snackBarMessage: ""
        }

    }

    phoneNoHandler = (event) => {
        let phoneNo = event.target.value;
        phoneNo = phoneNo.replace(/[^0-9]/g, '');
        this.setState({
            ...this.state,
            phone_number: phoneNo
        })
    };
    cardNoHandler = (event) => {
        let cardNo = event.target.value;
        cardNo = cardNo.replace(/[^0-9]/g, '');
        this.setState({
            ...this.state,
            card_num: cardNo
        })
    };
    expiryDateHandler = (event) => {
        let dateExpiry = event.target.value;
        dateExpiry = dateExpiry.replace(/[^0-9]/g, '');
        this.setState({
            ...this.state,
            date_expire: dateExpiry
        });
    };
    handleClose = (event) => {
        this.setState({
            snackBarOpen: false
        })
    };
    nextButtonHandler = (e) => {
        e.preventDefault();
        if (this.state.phone_number && this.state.card_num && this.state.date_expire) {
            this.setState({
                waiting: true
            });
            let r = {
                request: this.state.request,
                phone_number: this.state.phone_number,
                card_num: this.state.card_num,
                date_expire: this.state.date_expire
            };
            console.log(r);
            // let responseJson = SetAjax(r);
            this.api.SetAjax(r).then(responseJson => {
                if (responseJson.status === "success") {
                    this.props.registrationInfo({
                        phoneNo: this.state.phone_number.replace(/[^0-9]/g, ''),
                        card_num: this.state.card_num,
                        date_expire: this.state.date_expire
                    });
                    this.setState({
                        ...this.state,
                        redirect: !this.state.redirect,
                        waiting: false
                    })
                } else  {
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
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline/>
                    <div style={{
                        height: "100vh",
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <div className={`${classes.main} Registration`} >

                            <Paper className={classes.paper}>
                                {redirect ? <div style={{position: "relative"}}>
                                    {this.state.waiting ? <InnerWaiting/> : null}
                                    <Grid container justify="center" alignContent="center" alignItems="center"
                                          style={{
                                              marginTop: theme.spacing.unit
                                          }}>
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
                                                onChange={this.phoneNoHandler}
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

                                        <FormControl margin="normal" required fullWidth className={classes.form}>
                                            <InputMask
                                                mask="\8\6\0\0 9999 9999 9999"
                                                onChange={this.cardNoHandler}
                                            >
                                                {() => <TextField
                                                    label={lan.cardNo[currentLanguage]}
                                                    margin="normal"
                                                    type="text"
                                                />}
                                            </InputMask>
                                        </FormControl>
                                        <FormControl margin="normal" required fullWidth className={classes.form}>
                                            <InputMask
                                                mask="99\/99"
                                                onChange={this.expiryDateHandler}
                                            >
                                                {() => <TextField
                                                    label={lan.cardExpiryDate[currentLanguage]}
                                                    placeholder="--/--"
                                                    margin="normal"
                                                    type="text"
                                                />}
                                            </InputMask>
                                        </FormControl>
                                        <Grid container justify="center" alignItems="center">
                                            <Typography className={classes.termAndConditions}
                                                        color="primary">
                                                {/*Нажав кнопку «Далее», принимаете <br/> все условия */} {lan.pressNext[currentLanguage]}<a href={MyAlliancePdf} target="_blank"
                                                                                style={{color: "#3DB2FE", marginLeft:"5px"}}>{lan.termsAndConditions[currentLanguage]} </a>
                                            </Typography>
                                        </Grid>
                                        <Grid container justify="center" alignItems="center">
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                className={`${classes.submit} Registration-button`}
                                                onClick={this.nextButtonHandler}
                                            >
                                                {lan.Next[currentLanguage]}  {/*Далее*/}
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
                                    <FinishRegistration/>
                                </div>
                                } </Paper>
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
                    </div>
                    <Footer/>
                </MuiThemeProvider>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.setLanguage
    }
};
//giving data to redux via actionTypes.registrationCredentials
const mapDispatchToProps = dispatch => {
    return {
        registrationInfo: (info) => dispatch({
            type: actionTypes.registrationCredentials,
            info: info
        })
    }
};
Registration.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps,
    mapDispatchToProps)(withStyles(styles)(Registration));