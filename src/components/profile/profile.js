import React, {Component} from 'react';
import Api from "../../services/api";
import * as actionTypes from "../../store/actions/Actions";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import {withRouter,Link} from "react-router-dom";
import InputMask from 'react-input-mask';
import Translation from '../../translations/translations.json';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Avatar from '@material-ui/core/Avatar';
import ImageUploader from 'react-images-upload';
import Icon from '@material-ui/core/Icon';
import $ from 'jquery';
import "./profile.css";
import url from "../../services/url";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GoBack from "../bank_operation/go-back.png";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    content: {
        borderRadius: 6,
        border: "1px solid #e3e3e3",
        alignItems: "center"
    },
    form: {
        margin: "auto",
        marginTop: theme.spacing.unit * 0.5,
        marginBottom: -theme.spacing.unit,
    },
    submit: theme.submit,
    icon: {
        zIndex:999,
        marginLeft:"50px"
      },
    profileForm:{

    },
    goBackssss: {
        textTransform: "capitalize",
        marginBottom : "10px",
    }
});


 class Profile extends Component {
    api = new Api();
  state = {
    first_name: "a",
    second_name: "b",
    gender: "",
    selectedFile: null,
    //redirect: false
};


  inputHandler = (event) => {
    let input_name = event.target.name;
    this.setState({
        ...this.state,
      [input_name] : event.target.value
    });

  };

handleBack = () => {
         this.props.history.goBack();
     };
    componentWillMount(){//onunload
        this.setState({
          first_name: this.props.first_name,
          second_name: this.props.second_name,
          gender:this.props.gender
        });

    }
    fileChangedHandler = (event) =>{
        this.setState({ selectedFile: event.target.files[0] })
        this.uploadHandler()
    };

    uploadHandler = () => {
        let form = $('#fm')[0];
        let formData = new FormData(form);
        let result = '';

        if(document.getElementById('uploader').files[0] == null ) return;
        $.ajax({
            //dataType: 'html',
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            url:url,
        }).done(function(data){
            document.getElementById("profile_img").src = URL.createObjectURL(document.getElementById('uploader').files[0]);
        }).fail(function(xhr, ajaxOptions, thrownError) {
            alert("error " + thrownError);
            result = xhr.responseText;
        });

            this.props.ClientNameChanged("",URL.createObjectURL(document.getElementById('uploader').files[0]));
    };
    handler = (event) => {
        event.preventDefault();
      const req = {
        "request": "save_profile",
        "first_name" : this.state.first_name,
        "second_name" : this.state.second_name,
        "gender" : this.state.gender,
      };
    //  const responseJson=SetAjax(req);
    this.api.SetAjax(req).then(responseJson=>{
        if(responseJson.result === "0"){
            let clientName = this.state.first_name + " " + this.state.second_name;
            this.props.ClientNameChanged(clientName,URL.createObjectURL(document.getElementById('uploader').files[0]));
            alert ("Успешно выполнено !");
        }
     else{
      console.log(responseJson.error)
     }
    })

    };
   render() {
    let lang = this.props.currentLang?this.props.currentLang.language:"ru";
    //let {redirect} = this.state;
    const {classes} = this.props;
       let V_src;
       try {
           V_src = this.props.clientSrc;
       } catch (e) {
           V_src = require('./user.png');
       }
      return (
 <div>
             <Button className={`${classes.goBackssss} goBacksssssss`} onClick={this.handleBack}>
                 <ListItemIcon style={{marginRight: 0}}><img src={GoBack} alt="goBack"/></ListItemIcon>
                 <ListItemText
                     primary={
                         <Typography variant="inherit">
                             Назад
                         </Typography>
                     }/>
             </Button>
            <div className={classes.content} >
            <form className={classes.form} >
            <Grid spacing={8} container justify="center" alignItems="center">
                <Grid item xs={6} >
                    <form id="fm" className='profile-form' name="fm" enctype="multipart/form-data" method="POST" action={url}  >
                        <img alt="Remy Sharp" id="profile_img"  src={V_src} className='profile-img' />
                        <div className='profile-add-icon-container'>
                        <Icon className='profile-add-icon'  onClick={() => document.getElementById("uploader").click()}>camera_alt</Icon>
                        </div>
                        <input type="file" id="uploader" onChange={this.fileChangedHandler} name="photo" style={{display:"none"}} />
                        <input name="request_name" type="hidden" value="save_profile_img" />
                    </form>
                            <FormControl margin="normal" required fullWidth className={classes.form}>
                                    <TextField
                                        autoFocus
                                        defaultValue={this.props.first_name}
                                        onChange={this.inputHandler}
                                        label={Translation.Profile.name[lang]}//Имя
                                        name="first_name"
                                        margin="normal"
                                        type="text"
                                        />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth className={classes.form}>
                                <TextField
                                    defaultValue={this.props.second_name}
                                    id="someinput"
                                    onChange={this.inputHandler}
                                    name="second_name"
                                    label={Translation.Profile.surname[lang]}//Фамилия
                                    margin="normal"
                                    />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth className={classes.form}>
                                <TextField
                                    mask="+\9\98 99 999 99 99"
                                    disabled
                                    onChange={this.inputHandler}
                                    name="phone_number"
                                    id="someinput"
                                    defaultValue={this.props.phone_number}
                                    label={Translation.Profile.phonenumber[lang]}
                                    margin="normal"
                                    />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth className={classes.form}>
                                <RadioGroup row
                                    aria-label="Gender"
                                    name="gender"
                                    onClick={this.inputHandler}
                                    className={classes.group}
                                    value={this.state.gender}
                                    >
                                    <FormControlLabel value="female" control={
                                    <Radio />
                                    } label={Translation.Profile.woman[lang]}/>

                                    <FormControlLabel value="male"  control={
                                    <Radio />
                                    } label={Translation.Profile.man[lang]} />
                                </RadioGroup>
                            </FormControl>
                            <Grid container justify="center" alignItems="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                onClick={this.handler}
                                >
                            {Translation.Profile.save[lang]} {/* Login to system*/}
                            </Button>
                        </Grid>
                </Grid>
            </Grid>
            </form>

            </div>
         </div>
    );
   }
 }

const mapStateToProps = state => {
    return {
        currentLang: state.menuItems
    }
};
const mapDispatchToProps = dispatch => {
    return {
        addMenuItems: info =>
            dispatch({
                type: actionTypes.menuItems,
                info: info
            }),
    }
};

Profile.propTypes = {
    classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Profile)));