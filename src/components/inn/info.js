import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Api  from '../../services/api';
import Waiting from '../waiting';
import {Link} from "react-router-dom";
import './index.css'
import Translations from "../../translations/translations";
import {connect} from 'react-redux';

const styles = theme => ({
    noTopBottom:{
        marginTop: 0,
        marginBottom:0,
    },
    mT5:{
        marginTop:5,
    },
    submit: {
        marginTop: theme.spacing.unit * 2,
        borderRadius: "23px",
        boxShadow: "4px 5px 9px rgba(255, 192, 4, 0.19);",
        margin: "auto",
        fontSize: "14px",
        padding: "10px 60px",
        marginBottom: 16,
        textTransform: "capitalize",
    },
    textField: {
        marginTop: 5,
        marginBottom:0,
    },
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#25265E'
        },
        secondary: {
            main: '#ffc004',
            float: 'center',
            align:'center',
        }
    },
    typography: { useNextVariants: true }
})

class Info extends Component {
    api = new Api();
    constructor(props){
        super(props)
        this.state={
            headPassport:null,
            tailPassport:null,
            ssn:null,
            fullname:null,
            province:null,
            state:null,
            waiting:false,
            info   :null,
            currentLanguage: this.props.language
        }
    
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.cardInfo !== prevProps.cardInfo) {
            this.setState({
                currentLanguage: this.props.language
            })

        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                currentLanguage: this.props.language
            })
        }, 50);
    }
    //Get SSN 
    getSsn = () =>{
        this.setState({waiting:true})
        const req ={
            "language": "RU",
            "message_type":"86",
            "request":"get_inn",
            "pass_serial": this.state.headPassport.replace(/\s/g,'').toUpperCase(),
            "pass_number": this.state.tailPassport.replace(/\s/g,''),
        }
        
        if(this.state.headPassport && this.state.tailPassport){
            this.api.SetAjax(req).then(res=>{
                if(res.result==="0"){
                    
                    this.setState({
                        ssn : res.inn
                    })
                    this.getInfo()
                }
            })
        }
    }
    //Get User Info by Ssn 
    getInfo = () =>{
        const req = {
            "language": "RU",
            "message_type":"87",
            "request":"get_info",
            "inn": this.state.ssn,
        }
        if(this.state.ssn){
            localStorage.setItem('inn', this.state.ssn)
            this.api.SetAjax(req).then(res=>{
                console.log(res)
                this.setState({info:res})
                this.setState({province:res.ns11name})
                this.setState({state:res.ns13name})
                this.setState({fullname:res.firstname + " " + res.surname + " " + res.middlename })
                this.setState({waiting:false})
            })    
        }
    }

    headPass = (event) =>{
        let value = event.target.value
        this.setState({
            headPassport : value.toUpperCase()
        })
        document.getElementById('headerPassport').style.textTransform="uppercase";
    } 

    tailPass = (event) =>{
        let value = event.target.value
        this.setState({
            tailPassport : value
        })
    }
    
  render(){
    const {classes} = this.props;
    const {waiting, info, headPassport, state, province, fullname, ssn, tailPassport, currentLanguage} = this.state
    let lan = Translations.SSN;
        
    if(waiting){
        return(
                <Grid item md={12}>
                    <Waiting/>
                </Grid>
              )        
    }
    else if(info){
       return(
            <MuiThemeProvider theme={theme}>
                <Grid container justify="center" item md={12} alignItems="center">
                    <Grid item xs={8} md={4}>
                        <h5 className={classes.noTopBottom} style={{marginTop:20}}> {lan.typePassportDetails[currentLanguage]}</h5>
                        <InputMask mask="a a" align="center" onChange={this.headPass} defaultValue={headPassport}
                                >
                            {() => <TextField
                                className={classes.textField}
                                id="headerPassport"
                                label={lan.passportSeries[currentLanguage]}
                                defaultValue={headPassport}
                                placeholder='A A'
                                margin="normal"
                                fullWidth
                            />}
                        </InputMask>
                        <InputMask mask="9 9 9 9 9 9 9" align="center" onChange={this.tailPass} defaultValue={tailPassport}>
                            {() => <TextField
                                className={classes.textField}
                                id="tailPassport"
                                label={lan.passportNumber[currentLanguage]}
                                defaultValue={tailPassport}
                                placeholder='1234567'
                                margin="normal"
                                fullWidth
                            />}
                        </InputMask>
                        <Grid container justify='center' alignItems='center'>
                        <Button
                              type="submit"
                              variant="contained"
                              color="secondary"
                              margin='auto'
                              className={classes.submit}
                              onClick={this.getSsn}
                              
                        >{lan.showDetails[currentLanguage]}</Button>
                        </Grid>
                        <TextField
                                className={"textarea"}
                                id="fullname"
                                label={lan.fullname[currentLanguage]}
                                fullWidth
                                disabled
                                defaultValue={fullname}
                                placeholder='Navruzbek Noraliev'
                                margin="normal"
                        />
                        <TextField
                            className={"textarea"}
                            id="ssn"
                            label={lan.ssn[currentLanguage]}
                            fullWidth
                            disabled
                            defaultValue={ssn}
                            placeholder='123456789'
                            margin="normal"
                        />
                        <TextField
                            className={"textarea"}
                            id="passportDetails"
                            label={lan.passportNumber[currentLanguage]}
                            fullWidth
                            disabled
                            defaultValue={headPassport+" " +tailPassport}
                            placeholder='AA 1234567'
                            margin="normal"
                        />
                        <TextField
                            className={"textarea"}
                            id="province"
                            label={lan.province[currentLanguage]}
                            disabled
                            fullWidth
                            defaultValue={province}
                            placeholder='Ташкент'
                            margin="normal"
                        />
                        <TextField
                            className={"textarea"}
                            id="state"
                            label={lan.status[currentLanguage]}
                            fullWidth
                            disabled
                            defaultValue={state}
                            placeholder='Активный'
                            margin="normal"
                        />
                        <Link to ='/main/inn/debt' style={{textDecoration:'none'}}>
                        <Grid container justify='center' alignItems='center'>
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                margin="auto"
                                className={classes.submit}
                                onClick={this.props.goDebt}
                            >{lan.goToDebts[currentLanguage]}
                            </Button>
                            </Grid>
                        </Link>
                    </Grid>
                   
                </Grid>
            </MuiThemeProvider>
                );
          }  
    else
    return(
      <MuiThemeProvider theme={theme}>
          <Grid container justify="center" item md={12} alignItems="center">
              <Grid item xs={8} md={4}>
                  <h5 className={classes.noTopBottom} style={{marginTop:20}}>{lan.typePassportDetails[currentLanguage]}</h5>
                  <InputMask mask="a a" align="center" onChange={this.headPass} >
                      {() => <TextField
                          className={classes.textField}
                          id="headerPassport"
                          label={lan.passportSeries[currentLanguage]}
                          defaultValue={headPassport?headPassport : ""}    
                           
                          placeholder='A A'
                          margin="normal"
                          fullWidth
                         
                      />}
                  </InputMask>
                  <InputMask mask="9 9 9 9 9 9 9" align="center" onChange={this.tailPass}>
                      {() => <TextField
                          className={classes.textField}
                          id="tailPassport"
                          label={lan.passportNumber[currentLanguage]}
                          defaultValue={tailPassport?tailPassport : ""}
                          placeholder='1234567'
                          margin="normal"
                          fullWidth
                      />}
                  </InputMask>
                <Grid container justify='center' alignItems='center'>
                <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        margin='auto'
                        className={classes.submit}
                        onClick={this.getSsn}
                  >{lan.showDetails[currentLanguage]}</Button>
                </Grid>
                  
              </Grid>
             
          </Grid>
      </MuiThemeProvider>
          );
    }  
}
const mapStateToProps = state => {
    return {
        language: state.menuItems.language,
    }
};
const mapDispatchToProps = dispatch => {
    return {}
};


Info.propTypes = {
    classes: PropTypes.object.isRequired
};


export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Info));