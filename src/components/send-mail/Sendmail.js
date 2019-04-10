import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/Actions';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import {MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Translations from '../../translations/translations.json';
import theme from '../../theme/theme';
import InnerWaiting from "../spinner-opacity";
import Api from '../../services/api';
import InputMask from "react-input-mask";

const styles = theme => ({
    main: {
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 375,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        margin: "none",
        marginTop: theme.spacing.unit * 0.5,
        marginBottom: -theme.spacing.unit,
    },
    submit: theme.submit,
});

class sendMail extends Component {
    state = {
        fio: "",
        text: "",
        email: "",
        mobile_phone: "", 
        theme:"",
        currentLanguage: this.props.language
    };
    api = new Api();
    handler = (event) => {
        event.preventDefault();
      const req = {
        "request": "sand_email",
        "message_type":28,
        "fio" : this.state.fio,
        "text" : this.state.text,
        "email" : this.state.email,
        "mobile_phone":this.state.mobile_phone,
        "theme":this.state.theme
      };
     
     this.api.SetAjax(req).then(responseJson=>{
         if(responseJson.result === "0"){
            alert (Translations.Feedback.success[this.props.language]);
        }
     else{
      console.log(responseJson.error)
     }
     })
     
    };
    inputHandler = (event) => {
        let input_name = event.target.name;
        this.setState({
            ...this.state,
          [input_name] : event.target.value
        });
      
      };
      componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {
            this.setState({
                currentLanguage: this.props.language
            })
        }
    }

    render(){
        const {classes} = this.props;
        const lan = Translations.Feedback;

        const {currentLanguage} = this.state;
        return (<div className={classes.main} style={{height: "100vh", display: 'flex', alignItems: 'center'}}>

            <form name="form" className={classes.form} action="servlet/SendMail" method="post" enctype="text/plain">
                {false ? <InnerWaiting/> : null}

                <Grid container justify="center">
                    <Typography color={"primary"} style={{fontSize: "25px", fontWeight: 700}}>
                    {lan.feedback[currentLanguage]} {/* Обратный связь */}
                    </Typography>
                </Grid>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        name="theme"
                        autoFocus
                        label={lan.subject[currentLanguage]}
                        type="text"
                        margin="normal"
                        onChange={this.inputHandler}
                        required
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        name="text"
                        multiline={true}
                        rowsMax={10}
                        label={lan.message[currentLanguage]}
                        type="text"
                        margin="normal"
                        onChange={this.inputHandler}
                        required
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        name="email"
                        multiline={true}
                        rowsMax={10}
                        label={lan.yourMail[currentLanguage]}
                        type="email"
                        margin="normal"
                        onChange={this.inputHandler}
                        required
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputMask
                        mask="+\9\98 99 999 99 99"
                        onChange={this.inputHandler}
                    >
                        {() => <TextField
                            label={lan.phoneNumber[currentLanguage]}
                            name="mobile_phone"
                            placeholder="+998 xx xxx xx xx"
                            margin="normal"
                            
                            type="text"
                        />}
                    </InputMask>
                </FormControl>
                <FormControl margin="normal" required fullWidth className={classes.form}>

                    <TextField
                        label={lan.FIO[currentLanguage]}
                        name="fio"
                        type="text"
                        margin="normal"
                        onChange={this.inputHandler}
                        required
                    />

                </FormControl>

                <Grid container justify="center" alignItems="center">

                    <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        className={`${classes.submit} Login-button`}
                        style={{marginTop: "20px"}}
                        onClick={this.handler}
                     
                    >{lan.send[currentLanguage]}
                    </Button>
                </Grid>
            </form>
        </div>)
    };
}
const mapStateToProps = state => {
    return {
        language: state.menuItems.language,
    }
};
const mapDispatchToProps = dispatch => {
    return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(sendMail));
