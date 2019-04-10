import React, {Component} from "react";
import './settings-main.css';
import Api from "../../services/api";
import {withRouter,Link} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import {Grid, withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import icon from "./assets/abb-icon.png";
import SpinnerOpacity from "../spinner-opacity"
import SuccesMini from "../success-mini"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline"
import uz from "./assets/uz.png"
import ru from "./assets/Bitmap.png"
import en from "./assets/gb.png"
import password from "./assets/ic_change_password.png";
import profile from "./assets/ic_settings_2.png";
import languagess from "./assets/ic_language.png";
import * as actionTypes from '../../store/actions/Actions';
import Snackbar from "@material-ui/core/Snackbar";
import Translations from "../../translations/translations";
import GoBack from "../bank_operation/go-back.png";
import Settings from "@material-ui/icons/Settings"
import VpnKey from "@material-ui/icons/VpnKey"
import Language from "@material-ui/icons/Language"
import ExitToApp from "@material-ui/icons/ExitToApp"

const styles = theme => ({
    menuContent: {
        borderRadius: 6,
        border: "1px solid #e3e3e3",
        alignItems: "center"
    },
    menuSubContent: {
        borderRight: "1px solid #e3e3e3",
        borderBottom: "1px solid #e3e3e3",
        '&:hover':{
            backgroundColor: "rgba(10, 38, 108, 0.03);",
            cursor:"pointer"
        },
        margin : "0 !important"
    },
    menuListItem:{
        padding: "20px 15px 20px 15px",
        '&:hover':{
            color : 'black',
            textDecoration:"none",
            fontWeight:500
        }
    },
    goBackssss: {
        textTransform: "capitalize",
        marginBottom : "10px",

    }
});


class SettingsMain extends Component{
    api = new Api();

    lang  = Translations.Settings;

    state = {
        password_content : true,
        password_open: false,
        language_open: false,
        old_password : null,
        password : null,
        spinner_opacity : false,
        isSuccess : false,
        current : '',
        new_password : '',
        repeat_new_password : '',
        current_on_mouse_click : true,
        new_password_on_mouse_click : true,
        repeat_new_password_on_mouse_click : true,
        vertical: 'top',
        horizontal: 'center',
        isPassword : false,
        isPasswordMsg : null,
        isPasswordMsgShow : false,
        isPassword2 : false,
        isPasswordMsg2 : null,
        isPasswordMsgShow2 : false,
        isPassword3 : false,
        isPasswordMsg3 : null,
        isPasswordMsgShow3 : false,
        languages : [
            {name : 'uzl', label : 'O`zbek',img : uz},
            {name : 'uzc', label : 'Ўзбек', img : uz},
            {name : 'ru', label : 'Русский', img : ru},
            {name : 'en', label : 'English', img : en},
        ],
        open: false,
        msg : null
    };

    handleClickOpen = (name) => {
        this.setState({
            [name]: true
        });
    };

    handleClose = (name) => {
        this.setState({
            [name]: false,
            isPassword : false,
            isPasswordMsg : null,
            isPasswordMsgShow : false,
            isPassword2 : false,
            isPasswordMsg2 : null,
            isPasswordMsgShow2 : false,
            isPassword3 : false,
            isPasswordMsg3 : null,
            isPasswordMsgShow3 : false,
            current : '',
            new_password : '',
            repeat_new_password : '',
            isSuccess :false,
        });
            setTimeout(()=>{
                this.setState({
                    password_content : true
                })
            },1000)
    };

    close = () =>{
        this.setState({
            password_open: false,
            isPassword : false,
            isPasswordMsg : null,
            isPasswordMsgShow : false,
            isPassword2 : false,
            isPasswordMsg2 : null,
            isPasswordMsgShow2 : false,
            isPassword3 : false,
            isPasswordMsg3 : null,
            isPasswordMsgShow3 : false,
            current : '',
            new_password : '',
            repeat_new_password : '',
            isSuccess : false,
        });
        setTimeout(()=>{
            this.setState({
                password_content : true
            })
        },1000)
    };


    password = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    };

    onMouseDown = (name) => {
        this.setState({
            [`${name}_on_mouse_click`] : false
        })
    };

    onMouseUp = (name) => {
        this.setState({
            [`${name}_on_mouse_click`] : true
        })
    };

    handler = (e)=>{
      this.setState({
          [e.target.name] : e.target.value
      })
    };

    onBlur = e => {
        if(e.target.name === 'current'){
            if(this.state.current === "" || this.state.current.length === 0 || this.state.current === null){
                const currentPassword = this.lang.currentPassword[this.props.language]
                this.setState({
                    isPassword3 : false,
                    isPasswordMsg3 : currentPassword,
                    isPasswordMsgShow3 : true
                })
            }else {
                this.setState({
                    isPassword3 : true,
                    isPasswordMsg3 : '',
                    isPasswordMsgShow3 : false
                })
            }
        }

        if(e.target.name === 'new_password'){
            if(this.state.new_password === "" || this.state.new_password.length === 0 || this.state.new_password === null){
                const newPassword = this.lang.newPassword[this.props.language];
                this.setState({
                    isPassword : false,
                    isPasswordMsg : newPassword,
                    isPasswordMsgShow : true
                })
            }else if(this.state.new_password.length < 8 ) {
                const shouldPassword = this.lang.shouldPassword[this.props.language];
                this.setState({
                    isPassword : false,
                    isPasswordMsg : shouldPassword,
                    isPasswordMsgShow : true
                })
            }else{
                this.setState({
                    isPassword : true,
                    isPasswordMsg : '',
                    isPasswordMsgShow : false
                })
            }

        }

        if(e.target.name === 'repeat_new_password'){
            if(this.state.isPassword){
                if(this.state.new_password === this.state.repeat_new_password){
                    this.setState({
                        isPassword2 : true,
                        isPasswordMsg2 : '',
                        isPasswordMsgShow2 : false
                    })
                }else {
                    const passwordDoesNotMatch = this.lang.passwordDoesNotMatch[this.props.language];
                    this.setState({
                        isPassword2 : false,
                        isPasswordMsg2 : passwordDoesNotMatch,
                        isPasswordMsgShow2 : true
                    })
                }
            }
        }
    };

    killSession=()=>{
        if (window.confirm('Are you sure you want to log out the system?')) {
            let reqKillSession={
                request:"sign_out"
            };
            this.api.SetAjax(reqKillSession).then(data=>{
                window.location.href = '/ib_web/ib';
            });
        } else {
            console.log("// Do nothing!");
        }
    };

    sendPassword = () => {
        if(this.state.current === "" || this.state.current.length === 0 || this.state.current === null){
            const currentPassword = this.lang.currentPassword[this.props.language]
            this.setState({
                isPassword3 : false,
                isPasswordMsg3 : currentPassword,
                isPasswordMsgShow3 : true
            })
        }else{
            this.setState({
                isPassword3 : true,
                isPasswordMsg3 : '',
                isPasswordMsgShow3 : false
            })
        }

        if(this.state.new_password === "" || this.state.new_password.length === 0 || this.state.new_password === null){
            const newPassword = this.lang.newPassword[this.props.language];
            this.setState({
                isPassword : false,
                isPasswordMsg : newPassword,
                isPasswordMsgShow : true
            })
        }else if(this.state.new_password.length < 8 ) {
            const shouldPassword = this.lang.shouldPassword[this.props.language];
            this.setState({
                isPassword : false,
                isPasswordMsg : shouldPassword,
                isPasswordMsgShow : true
            })
        }else{
            this.setState({
                isPassword : true,
                isPasswordMsg : '',
                isPasswordMsgShow : false
            })
        }

        if(this.state.isPassword){
            if(this.state.new_password === this.state.repeat_new_password){
                this.setState({
                    isPassword2 : true,
                    isPasswordMsg2 : '',
                    isPasswordMsgShow2 : false
                })
            }else {
                const passwordDoesNotMatch = this.lang.passwordDoesNotMatch[this.props.language];
                this.setState({
                    isPassword2 : false,
                    isPasswordMsg2 : passwordDoesNotMatch,
                    isPasswordMsgShow2 : true
                })
            }
        }

        if(this.state.isPassword && this.state.isPassword2 && this.state.isPassword3){
            this.setState({
                spinner_opacity : true,
            });

            setTimeout(()=>{
                this.setState({
                    spinner_opacity : false,
                    isSuccess : true,
                    password_content : false
                })
            },4000);

        }
    };
    handleBack = () => {
        this.props.history.goBack();
    };

    languageHandlers = (langs) =>{
        const request = {
            request:"change_language",
            lang: langs
        };
        this.api.SetAjax(request).then((data)=>{


            if(data.status === "success"){
                this.props.addMenuItems({
                    language:langs,
                });
                const completedSuccessfully = this.lang.completedSuccessfully[this.props.language];
                this.setState({
                    open : true,
                    msg : completedSuccessfully,
                    language_open : false

                })
            }else{
                this.setState({
                    open : true,
                    msg : data.success
                })
            }
        })
    };

    handleCloses = () => {
        this.setState({ open: false });
    };

    render(){
        const {classes,language} = this.props;

        const lang = this.state.languages.map((item)=>{

            let circle = item.name === language ?  <CheckCircleOutline color='secondary' style={{fontSize : "12pz"}}/> : <CheckCircleOutline color='primary' style={{color : 'transparent'}}/>;

            return(
                <div key={item.label} className='language-row' onClick = {()=>this.languageHandlers(item.name)}>
                    <div className='language-name'>
                        <img src={item.img} alt={item.name} /> {item.label}
                    </div>
                    <div className='language-icon'>
                        {circle}
                    </div>
                </div>
            )
        });
    const  {vertical,horizontal,open} = this.state;
        return (
            <div className="ssettings-main">
                <Button className={`${classes.goBackssss}`} onClick={this.handleBack}>
                    <ListItemIcon style={{marginRight: 0}}><img src={GoBack} alt="goBack"/></ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="inherit">
                                {Translations.Monitoring.toMain[this.props.language]}
                            </Typography>
                        }/>
                </Button>
                {/*Dialog for password*/}
            <Snackbar
                    anchorOrigin={{ vertical,horizontal }}
                    open={open}
                    onClose={this.handleCloses}
                    ContentProps={{
                        'aria-describedby': 'message-id',

                    }}
                    autoHideDuration = {2500}
                    message={<span id="message-id">{this.state.msg}</span>}
                    />

                <Dialog
                    open={this.state.password_open}
                    onClose={()=> this.handleClose('password_open')}
                    aria-labelledby="form-dialog-title"
                    maxWidth = 'xs'
                    fullWidth={true}
                >

                    {this.state.isSuccess ? <DialogContent> <SuccesMini close={this.close}/> </DialogContent>: null}


                    { this.state.password_content ? (
                        <React.Fragment>
                            {this.state.spinner_opacity ?<SpinnerOpacity/> : null}
                            <DialogContent>
                            <div style={{position : 'relative'}}>
                                <div style={{textAlign : 'center'}}>
                                    <img src={icon}/>
                                </div>
                                <div  className="settings-form">
                                    <p className='settings-big-title'> {this.lang.currentPassword[this.props.language]}</p>
                                    <p className="settings-title settings-value">{this.lang.currentPass[this.props.language]}</p>
                                    <div className='setting-eye' onMouseDown={()=>this.onMouseDown('current')} onMouseUp={()=>this.onMouseUp('current')}>{this.state.current_on_mouse_click ?<Visibility color = 'primary' style={{fontSize : '18px'}}/> : <VisibilityOff color = 'secondary' style={{fontSize : '18px'}}/>}</div>
                                    <input
                                            type={this.state.current_on_mouse_click ? 'password' : 'text'}
                                            name = 'current'
                                            onBlur={this.onBlur}
                                            maxLength={15}
                                            onChange={this.handler}
                                            style  = {{border :"none" ,width : '100%',height: "40px",fontSize: '16px',outline : "none"}}
                                            className = "settings-cleave"
                                            autoComplete = "off"
                                    />
                                </div>
                                <div style={{color : 'red',fontSize : '12px'}}>{this.state.isPasswordMsgShow3 ? this.state.isPasswordMsg3 : null}</div>

                                <p className='settings-big-title'>{this.lang.newPassword[this.props.language]}</p>
                                <div  className="settings-form">
                                    <p className="settings-title settings-value">{this.lang.newPass[this.props.language]}</p>
                                    <div className='setting-eye' onMouseDown={()=>this.onMouseDown('new_password')} onMouseUp={()=>this.onMouseUp('new_password')}>{this.state.new_password_on_mouse_click ?<Visibility color = 'primary' style={{fontSize : '18px'}}/> : <VisibilityOff color = 'secondary' style={{fontSize : '18px'}} />}</div>
                                    <input
                                        type={this.state.new_password_on_mouse_click ? 'password' : 'text'}
                                        name = 'new_password'
                                        maxLength={15}
                                        onBlur={this.onBlur}
                                        onChange={this.handler}
                                        style  = {{border :"none" ,width : '100%',height: "40px",fontSize: '16px',outline : "none"}}
                                        className = "settings-cleave"
                                        autoComplete = "off"
                                    />
                                </div>
                                <div style={{color : 'red',fontSize : '12px'}}>{this.state.isPasswordMsgShow ? this.state.isPasswordMsg : null}</div>
                                <div  className="settings-form">
                                    <p className="settings-title settings-value">{this.lang.repeatPassword[this.props.language]}</p>
                                    <div className='setting-eye' onMouseDown={()=>this.onMouseDown('repeat_new_password')} onMouseUp={()=>this.onMouseUp('repeat_new_password')}>{this.state.repeat_new_password_on_mouse_click ?<Visibility color = 'primary' style={{fontSize : '18px'}}/> : <VisibilityOff color = 'secondary' style={{fontSize : '18px'}}/>}</div>
                                    <input
                                        type={this.state.repeat_new_password_on_mouse_click ? 'password' : 'text'}
                                        name = 'repeat_new_password'
                                        maxLength={15}
                                        onChange={this.handler}
                                        onBlur={this.onBlur}
                                        style  = {{border :"none" ,width : '100%',height: "40px",fontSize: '16px',outline : "none"}}
                                        className = "settings-cleave"
                                        autoComplete = "off"
                                    />
                                </div>
                                <div style={{color : 'red',fontSize : '12px'}}>{this.state.isPasswordMsgShow2 ? this.state.isPasswordMsg2 : null}</div>

                            </div>
                        </DialogContent>
                            <div style={{textAlign : 'center',color :"#4a4a4a",fontSize: '12px',padding : '0px 15px'}}>
                                {this.lang.mustMore[this.props.language]}
                            </div>
                        <DialogActions>
                            <Button className='setting-back-btn' onClick={()=> this.handleClose('password_open')} color="primary">
                                {this.lang.back[this.props.language]}
                            </Button>
                            <Button className='setting-password-btn' onClick={this.sendPassword} color="primary">
                                {this.lang.changePassword[this.props.language]}
                            </Button>
                        </DialogActions> </React.Fragment>) : null}

                </Dialog>

                {/*Dialog for language*/}
                <Dialog
                    open={this.state.language_open}
                    onClose={()=> this.handleClose('language_open')}
                    aria-labelledby="form-dialog-title"
                    maxWidth = 'xs'
                    fullWidth={true}
                >
                    <DialogContent>
                        <div style={{textAlign : 'center'}}>
                            <img src={icon}/>
                        </div>
                        <div className='languages'>
                            {lang}
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button className='setting-back-btn' onClick={()=>this.handleClose('language_open')} color="primary">
                            {this.lang.back[this.props.language]}
                        </Button>
                    </DialogActions>
                </Dialog>
                <div className='setting-item'>
                    <Grid container className={`${classes.menuContent}`} >
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.menuSubContent}
                              style={{textDecoration: "none", color: "black"}}>
                            <Link to="/profile" style={{textDecoration: 'none', color: '#0A266C'}} >
                                <ListItem className={classes.menuListItem}>
                                    <ListItemIcon style={{color : "#0A266C"}}>
                                        <Settings/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="inherit">
                                                {this.lang.changeProfil[this.props.language]}
                                            </Typography>
                                        }/>
                                </ListItem>
                            </Link>
                        </Grid>
                        {/*Password*/}
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.menuSubContent}
                              style={{textDecoration: "none", color: "black"}}>
                            <a style={{textDecoration: 'none', color: '#0A266C'}} onClick={()=> this.handleClickOpen('password_open')}>
                                <ListItem className={classes.menuListItem}>
                                    <ListItemIcon>
                                        <VpnKey style={{color : "#0A266C"}}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="inherit">
                                                {this.lang.changePassword[this.props.language]}
                                            </Typography>
                                        }/>
                                </ListItem>
                            </a>
                        </Grid>
                        {/*Language*/}
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.menuSubContent}
                              style={{textDecoration: "none", color: "black"}}>
                            <a style={{textDecoration: 'none', color: '#0A266C'}} onClick={()=> this.handleClickOpen('language_open')}>
                                <ListItem className={classes.menuListItem}>
                                    <ListItemIcon>
                                        <Language style={{color : "#0A266C"}}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="inherit">
                                                {this.lang.changeLanguage[this.props.language]}
                                            </Typography>
                                        }/>
                                </ListItem>
                            </a>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.menuSubContent}
                              style={{textDecoration: "none", color: "black"}}>
                            <a style={{textDecoration: 'none', color: '#0A266C'}} onClick={()=> this.killSession()}>
                                <ListItem className={classes.menuListItem}>
                                    <ListItemIcon>
                                        <ExitToApp style={{color : "#0A266C"}}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="inherit">
                                                {this.lang.signOut[this.props.language]}
                                            </Typography>
                                        }/>
                                </ListItem>
                            </a>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

SettingsMain.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        language: state.menuItems.language,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
            addMenuItems: info =>
                dispatch({
                    type: actionTypes.menuItems,
                    info: info
                })
        }
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles)(SettingsMain)));