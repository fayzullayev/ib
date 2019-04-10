import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Api  from '../../services/api';
import FormHelperText from '@material-ui/core/FormHelperText';
import Waiting from '../waiting';
import Translations from "../../translations/translations";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import './index.css'

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
            main: '#ffc004'
        }
    },
    typography: { useNextVariants: true }
})

class Debt extends Component {
    api = new Api();
    constructor(props){
        super(props)
        this.state = {
            ssn: '',
            error: false,
            info:null,
            waiting:false,
            objectname: null,
            overpayment: null, 
            fine:null,
            objectCode: null,
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
    formatCurrency  = (balance) =>{
        let bal =  balance.substring(0, balance.indexOf('.'))
        let bal2 = balance.substring(balance.indexOf('.'))
        let res = '';
        let fin ='';
        let ret = [];
        let i = bal.length
        for(i; i>-3; i-=3 ){
              if(i===-1){
                res+=bal.substr(0, 2)
                  
              }
              else if(i===-2){
                res+=bal.substr(0, 1)
              }
              else
            res+=bal.substr(i, 3)
              
        }
        for(i=0; i<res.length; i+=3){
            ret.push(res.substr(i, 3))
        }
        for(i=ret.length-1; i>=0; i--){
            if(i==0)
            fin+=ret[i];
            else
            fin+=ret[i]+' ' 
          }
        return fin+bal2;
    }
    getDebt = () =>{
        this.setState({waiting:true})
        const req ={
            "language": "RU",
            "message_type":"88",
            "request":"get_debt",
            "inn": document.getElementById('ssn').value.replace(/\s/g,'')
        }
        if(document.getElementById('ssn').value){
            this.api.SetAjax(req).then(res=>{
                this.setState({waiting:false})
                if(res.result==="0"){
                    this.setState({
                        info:res,
                        objectname : res.debt_list[0].Objectname,
                        objectCode : res.debt_list[0].Objectcode,
                        fine: this.formatCurrency(res.debt_list[0].Penya),
                        overpayment: this.formatCurrency(res.debt_list[0].Pereplata)
                    })
                    localStorage.setItem("CODE_OBJ", this.state.objectCode)
                    localStorage.setItem("inn", document.getElementById('ssn').value.replace(/\s/g,''))
                   }
                else{
                    this.hasError(res.msg)
                }
            })
        }
    }
  hasError=(msg)=>{
    localStorage.setItem('error', msg)
    console.log(msg)
    this.setState({error:true})
  }
  ssnDebt = (event) =>{
    let value = event.target.value
    this.setState({
        ssn : value
    })
  }
  
  render(){
    const {classes} = this.props;
    const {info, waiting, error, objectname, fine, overpayment, currentLanguage} = this.state
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
                        <h5 className={classes.noTopBottom} style={{marginTop:20}}>{lan.typeSsn[currentLanguage]}</h5>
                        <InputMask mask="9 9 9 9 9 9 9 9 9" align="center" onChange={this.ssnDebt}  
                          defaultValue={localStorage.getItem('inn') ? localStorage.getItem('inn') : this.state.ssn}
                  >
                      {() => <TextField
                          className={classes.textField}
                          id="ssn"
                          defaultValue={localStorage.getItem('inn') ? localStorage.getItem('inn') : this.state.ssn}
                          label={lan.ssn[currentLanguage]}
                          fullWidth
                          placeholder='123456789'
                          margin="normal"
                           
                      />}
                  </InputMask>
                  {   error ? <Error /> : '' }
                  <Grid container justify='center' alignItems='center'>
                    <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            margin="auto"
                            className={classes.submit}
                            onClick={this.getDebt}
                    >{lan.showDetails[currentLanguage]}</Button>
                        </Grid>
                        
                        {/* <TextField
                                className={"textarea"}
                                id="fullname"
                                label={lan.fullname[currentLanguage]}
                                fullWidth
                                disabled
                                defaultValue={localStorage.getItem('name')}
                                placeholder='Navruzbek Noraliev'
                                margin="normal"
                        /> */}
                        <TextField
                            className={"textarea"}
                            id="objectname"
                            label={lan.objectName[currentLanguage]}
                            fullWidth
                            disabled
                            defaultValue={objectname}
                            placeholder='Машина'
                            margin="normal"
                        />
                        <TextField
                            className={"textarea"}
                            id="Overpayment"
                            label= {lan.overpayment[currentLanguage]}
                            fullWidth
                            disabled
                            defaultValue={overpayment}
                            placeholder='45 000 000'
                            margin="normal"
                        />
                        <TextField
                            className={"textarea"}
                            id="fine"
                            label={lan.fine[currentLanguage]}
                            disabled
                            fullWidth
                            defaultValue={fine}
                            placeholder='Ташкент'
                            margin="normal"
                        />
                        <Link to ='/main/payments/categories/budget_payment/paymentForm' style={{textDecoration:'none'}}>
                        <Grid container justify='center' alignItems='center'>
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                margin="auto"
                                className={classes.submit}
                                onClick={this.props.goDebt}
                                style={{marginBottom:30}}
                            >{lan.payForDebts[currentLanguage]}
                            </Button>
                            </Grid>
                        </Link>
                    </Grid>
                   
                </Grid>
            </MuiThemeProvider>
        )
    }
    else
    return(
      <MuiThemeProvider theme={theme}>
          <Grid container justify="center" item md={12} alignItems="center">
              <Grid item xs={8} md={4} alignContent="center">
                  <h5 className={classes.noTopBottom} style={{marginTop:20}}>{lan.typeSsn[currentLanguage]}</h5>
                  <InputMask mask="9 9 9 9 9 9 9 9 9" align="center" onChange={this.ssnDebt}  
                          defaultValue={localStorage.getItem('inn') ? localStorage.getItem('inn') : this.state.ssn}
                  >
                      {() => <TextField
                          className={classes.textField}
                          id="ssn"
                          defaultValue={localStorage.getItem('inn') ? localStorage.getItem('inn') : this.state.ssn}
                          label="ИНН"
                          fullWidth
                          placeholder='123456789'
                          margin="normal"
                           
                      />}
                  </InputMask>
                  {   error ? <Error /> : '' }
                  <Grid container justify='center' alignItems='center'>
                    <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            margin="auto"
                            className={classes.submit}
                            onClick={this.getDebt}
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

Debt.propTypes = {
    classes: PropTypes.object.isRequired
};

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Debt));

class Error extends Component {
    render() {
        return(
            <Grid container justify='center' alignItems='center'>
                <FormHelperText id="component-error-text" style={{color:'red', marginLeft:20}}>{localStorage.getItem("error")}</FormHelperText>
            </Grid>
        )
    }
}
