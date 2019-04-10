import React, { Component }  from 'react';
import { Redirect} from 'react-router-dom'
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import {  Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {PropTypes} from "prop-types";
import InputMask from 'react-input-mask';
import Api from "../../services/api"
import card from "./card8.png";
import '../cards-list/cards-list.css'
import {DatePicker, MuiPickersUtilsProvider} from 'material-ui-pickers';
import {CalendarToday} from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';
import Check from '../payment-curr-check';
import Translation from '../../translations/translations.json';
import Cleave from "cleave.js/react";
import "./currency_payment.css";
import * as accounting from "accounting";
import Snackbar from "@material-ui/core/Snackbar";


const localeMap = {
  en: enLocale,
  ru: ruLocale,
  uzc: ruLocale,
  uzl: ruLocale,
};
const styles = theme => ({
    submit:theme.submit,
    menuItem : {
      height : "50px",
      paddingTop: '20px',
      margin : '10px',
      borderRadius: '4px'
  }
});
//<Cards data = {uzCards} fio={fio} cardHandler = {this.cardHandler} active = {from_card}/>
class PaymentsForm extends Component {
  api = new Api();
  state = { 
    openSnack:false,
    submitDisable:false,
    snackMSG:"",
    vertical:'top',
    horizontal:'center',
    currInputs:"",
     params:{},
     checkDetails:{},
     dates:{
      PERIOD_BEGIN:"",
      PERIOD_END:""
     },
     currentLanguage: this.props.currentLang?this.props.currentLang.language:"ru",
     needData:{},
     currDivisions:"",
     redirect:false,
     payment_details:[],
     isUZS : true, //switch uz text
     isUSD : false, //switch usd text
     amountCurrency:''
   };
  componentWillMount(){
      let params=this.props.currInput.params;
      let datePicked= new Date();
      if(!this.props.reloaded)
      {
        this.setState(
        {
          currInputs:this.props.currInput,
          params,
          dates:{
            PERIOD_BEGIN:datePicked,
            PERIOD_END:datePicked
          },
          redirect:false,
        });
      }
      else{
          this.setState({
            redirect:true,
          });
        }
  }
  handleChangeSelect = (event,placeholder,divisions) => {
    if((event.target.name==='AMOUNT' || event.target.name==='amount') && parseInt(event.target.value.replace(' ','').replace(' ','').replace(' ','').replace(' ','').replace(' ',''))<500){
      this.setState({
        openSnack:true,
        snackMSG:Translation.Payments.minSumShould[this.props.currentLang?this.props.currentLang.language:"ru"],
        submitDisable:true
      });
    }
    else if((event.target.name==='AMOUNT' || event.target.name==='amount') && parseInt(event.target.value.replace(' ','').replace(' ','').replace(' ','').replace(' ','').replace(' ',''))>=500){
      this.setState({
        openSnack:false,
        submitDisable:false
      })
    }
    let category=this.props.currInput.currCategory;
    let currPaymentDetails=this.state.payment_details;
    if(category==="MOBILE" && this.state.currInputs.currInput.level_position==='1' && event.target.name==="AMOUNT"){
      if(!event.target.value){
        this.setState({
          amountCurrency:''
        });
      }
      else if(this.state.isUSD){
          this.setState({
            amountCurrency:Math.round((4210.35*parseInt(event.target.value.replace(' ','').replace(' ','').replace(' ','').replace(' ',''))) * 100)/100
          });
        }
      else if(this.state.isUZS){
        this.setState({
          amountCurrency:Math.round((parseInt(event.target.value.replace(' ','').replace(' ','').replace(' ','').replace(' ',''))/4210.35) * 100)/100
        });
      }
    }
    if(divisions!=="" && event.target.name==="REGIONS" && event.target.value!=="")
   {
     let currRegionCode= event.target.value.slice(0,2);
     let currDivisions=divisions.values.filter(division=> division.code.slice(0,2)===currRegionCode)
     this.setState({
       currDivisions:currDivisions
     })
    }
    
    this.setState({ 
      params:{
      ...this.state.params,
      [event.target.name]: category==="MOBILE" && event.target.name==="PROVIDER_ACC"?event.target.value.replace(/[^0-9]/g, ''):category==="MOBILE" && event.target.name==="AMOUNT"?this.state.isUSD?Math.round((4210.35*parseInt(event.target.value.replace(' ','').replace(' ','').replace(' ','').replace(' ',''))) * 100)/100:event.target.value:event.target.value
      },
    });
    if(currPaymentDetails && currPaymentDetails.length>0)
    {
        let flag=false;
        for( var i = 0; i < currPaymentDetails.length; i++){ 
          if ( currPaymentDetails[i].code === event.target.name) {
            let temp={
              code:event.target.name,
              value:event.target.value,
              level_position:this.state.currInputs.currInput.level_position,
            }
            currPaymentDetails[i]=temp
            flag=true;
            return;
          }
      }
      if(!flag){
        currPaymentDetails=[
          ...currPaymentDetails,
          {
            code:event.target.name,
            value:event.target.value,
            level_position:this.state.currInputs.currInput.level_position,
          }
        ]
      }
    }
    else
    {
        currPaymentDetails=[
        ...currPaymentDetails,
        {
          code:event.target.name,
          value:event.target.value,
          level_position:this.state.currInputs.currInput.level_position,
        }
      ]
    }
    this.setState({
      payment_details:currPaymentDetails
    });
  };
  startDateChangeHandler = date =>{
   let datePicked= moment(date).format('DD.MM.YYYY');
   this.setState({
     dates:{
       ...this.state.dates,
       PERIOD_BEGIN:date,
     },
     params:{
       ...this.state.params,
       PERIOD_BEGIN:datePicked
     }
   });
  }
  endDateChangeHandler=date=>{
    let datePicked= moment(date).format('DD.MM.YYYY');
    this.setState({
      dates:{
        ...this.state.dates,
        PERIOD_END:date,
      },
      params:{
        ...this.state.params,
        PERIOD_END:datePicked
      }
    });
  }
  currencyToggle=()=>{
    if(this.state.amountCurrency!=='' && document.getElementById('AMOUNT').value!==''){
      let tempVal=parseInt(document.getElementById('AMOUNT').value.replace(' ','').replace(' ','').replace(' ','').replace(' ','').replace(' ',''));
      this.setState({
        amountCurrency: !this.state.isUZS?Math.round((tempVal/4210.35) * 100)/100:Math.round((tempVal*4210.35) * 100)/100,
        isUZS : !this.state.isUZS,
        isUSD : !this.state.isUSD,
      })
    }
    else
    this.setState({
      isUZS : !this.state.isUZS,
      isUSD : !this.state.isUSD,
    })
  }
  handle = (e,params)=>{
    e.preventDefault();
    if(params!==""){
      let newParams={
        ...this.state.params,
        ...params,
      }
      if(params["PROVIDER_ACC"])
      params["PROVIDER_ACC"]=params["PROVIDER_ACC"].replace(/[^0-9]/g, '');
      this.setState({
        params:newParams
      });
    this.props.getTemplateLast(this.state.payment_details);
    this.props.getPaymentState(newParams);
    }
    else
    {
      this.props.getTemplateLast(this.state.payment_details);
      this.props.getPaymentState(this.state.params);
    }
  }
  handleCloseSnackbar = () => {
      this.setState({ openSnack: false });
  };
  render() {
    console.log(this.state.params);
    let lang = this.props.currentLang?this.props.currentLang.language:"ru";
    const {openSnack,vertical,horizontal,snackMSG,submitDisable}=this.state;
    if(this.state.redirect)
    return(<Redirect to="/main/payments/categories"/>);
    const {classes}=this.props;
    const {dates,currentLanguage}=this.state;
    const locale = localeMap[currentLanguage];
    const service_details=this.state.currInputs.currInput;
   let i=0;
   let params1="";
   let divisions="";
   let dateNames="";
    let inputBlock= this.props.templateForm?"":service_details.service_details?service_details.service_details.map(input=>{
      if(input.code==="CARD_NUMBER"){
        return("");
      }
      if(input.is_visible==="Y" && ((input.param_type==="N" && input.code!=="CARD_NUMBER") || input.param_type==="T" ))
          if(this.props.currInput.currCategory==="MOBILE" && input.code==="PROVIDER_ACC")
            {
                if(input.is_read_only==="Y" || (input.code==="PHONE" && this.props.currInput.currCategory==="UTILITIES") )
                {
                    params1={
                    ...params1,
                    [input.code]:input.def_value
                  }
                }
                if(this.props.currInput.payment_detail_code!=='PAYNET_FOREIGN')
                return(<FormControl margin="normal" required fullWidth key={i++} disabled={input.is_read_only==="Y" || (this.state.currInputs.level_position==="-1" && input.def_value!=="")?true:false}>
              <InputMask
                    mask="+\9\98 99 999 99 99"
                    defaultValue={input.def_value}
                    onChange={(e)=>this.handleChangeSelect(e,input.name,divisions)}
                >
                  {()=><TextField
                      required
                      defaultValue={input.def_value}
                      id="standard-password-input"
                      label={input.name}
                      type="text"
                      name={input.code}
                  />}
              </InputMask>
          </FormControl>);
                else{
                  return(<FormControl margin="normal" required fullWidth key={i++}>
                  <TextField
                    required
                    disabled={input.is_read_only==="Y" || (this.state.currInputs.currInput.level_position==="-1" && input.def_value!=="")?true:false}
                    defaultValue={input.def_value}
                    onChange={(e)=>this.handleChangeSelect(e,input.name,divisions)}
                    id="standard-password-input"
                    label={input.name}
                    type="text"
                    name={input.code}
                />
                </FormControl>
                );
                }
        }
          else if(this.props.currInput.currCategory==="MOBILE" && input.code==="AMOUNT")
                {
                  if(input.is_read_only==="Y" || (input.code==="PHONE" && this.props.currInput.currCategory==="UTILITIES"))
                    {  params1={
                        ...params1,
                        [input.code]:input.def_value
                      }
                    }
                    let uzsTextClass = !this.state.isUZS ? "uzsTextClassPayment" : null;
                     let usdTextClass = !this.state.isUSD ? "usdTextClassPayment" : null;
                  return(<div>
                    <div  className="conversion-form-payment">
                                    <Cleave options={
                                        {

                                            numeralThousandsGroupStyle : "thousand",
                                            numeral: true,
                                            numeralIntegerScale: 10,
                                            numeralDecimalScale: 3,
                                            numeralDecimalMark: '.',
                                            delimiter: ' ',
                                            numeralPositiveOnly: true
                                        }
                                    }
                                            id={input.code}
                                            placeholder={input.name}
                                            onChange={(e)=>this.handleChangeSelect(e,input.name,divisions)}
                                            value={input.def_value!=='0' && input.def_value!==''?input.def_value:''}
                                            name={input.code}
                                            style  = {{border :"none" ,height: "40px",backgroundColor:'none',fontSize: 'inherit',outline : "none"}}
                                    />
                                    {this.state.currInputs.currInput.level_position==="1"?<div className='currency-switch-payment'>
                                        <label className="switch-payment">
                                            <input
                                                type="checkbox"
                                                id='checkss'
                                                onChange={this.currencyToggle}
                                                defaultChecked
                                                />
                                                
                                            <span className="slider-payment"></span>
                                            <span className={`uzPayment ${uzsTextClass}`}>UZS</span>
                                            <span className={`usdPayment ${usdTextClass}`}>USD</span>
                                        </label>
                                    </div>:''}
                   </div>
                   {this.state.currInputs.currInput.level_position==="1"?<div style={{fontSize:12,color:"#BDBDBD",marginTop:15}}>{Translation.Payments.toggleCurrentCourse[lang]}: <span style={{fontSize:13,color:"#BDBDBD",float:"right"}}>1 USD = 4 210.35 UZS</span></div>:''}
                   {this.state.currInputs.currInput.level_position==="1"?this.state.amountCurrency!==''?<div style={{fontSize:12,color:"#BDBDBD",marginTop:10}}>{Translation.Payments.amountCurrencyPayments[lang]}: <span style={{fontSize:13,color:"#BDBDBD",float:"right"}}> {this.state.amountCurrency} {this.state.isUZS?'USD':'UZS'}</span></div>:"":""}                 
                   </div>
                  );}
              else{ 
                if(input.is_read_only==="Y" || (input.code==="PHONE" && this.props.currInput.currCategory==="UTILITIES"))
                {
                    params1={
                      ...params1,
                      [input.code]:input.code==="PROVIDER_ACC"?input.def_value.replace(/ /g, '').replace(/\+/g,''):input.def_value
                    };
                }
                if(input.mondatory==="Y" && input.def_value!=="" && input.def_value!=="0")
                {
                    params1={
                      ...params1,
                      [input.code]:input.code==="PROVIDER_ACC"?input.def_value.replace(/ /g, '').replace(/\+/g,''):input.def_value
                    };
                }
                if(this.state.currInputs.currInput.level_position==='1' && this.props.currInput.payment_detail_code==="MUNIS_0201" && this.props.jsonTaxes.INN!==null && this.props.jsonTaxes.CODE_OBJ!==null){
                  params1={
                    ...params1,
                    INN:this.props.jsonTaxes.INN,
                    CODE_OBJ:this.props.jsonTaxes.CODE_OBJ
                  }
                }
                return(input.mondatory==='Y' && input.code!=="PAY_PURPOSE"?<FormControl margin="normal" required fullWidth key={i++}>
                  {input.code==='AMOUNT' || input.code==='amount'?
                  <div  className="conversion-form">
                  <Cleave options={
                    {

                        numeralThousandsGroupStyle : "thousand",
                        numeral: true,
                        numeralIntegerScale: 10,
                        numeralDecimalScale: 3,
                        numeralDecimalMark: '.',
                        delimiter: ' ',
                        numeralPositiveOnly: true
                    }}
                        placeholder={input.name}
                        onChange={(e)=>this.handleChangeSelect(e,input.name,divisions)}
                        value={input.def_value!=='0' && input.def_value!==''?input.def_value:this.state.params[input.code]?this.state.params[input.code]:''}
                        name={input.code}
                        style  = {{backgroundColor:'none',border :"none" ,height: "40px",fontSize: 'inherit',outline : "none"}}
                /></div>
                  :<TextField
                      required
                      disabled={input.is_read_only==="Y" || (this.state.currInputs.currInput.level_position==="-1" && input.def_value!=="")?true:false}
                      defaultValue={this.state.currInputs.currInput.level_position==='1' && this.props.currInput.payment_detail_code==="MUNIS_0201" && this.props.jsonTaxes[input.code]!==null && input.def_value===''?this.props.jsonTaxes[input.code]:this.state.params[input.code]?this.state.params[input.code]:input.def_value}
                      onChange={(e)=>this.handleChangeSelect(e,input.name,divisions)}
                      id="standard-password-input"
                      label={input.name}
                      type="text"
                      name={input.code}
                  />}
              </FormControl>:"");}
        else if(input.is_visible==="Y"&& input.param_type==="S")
          {
            if( input.code==="CODE_GP" || input.code==="DIVISIONS" || input.code==="GNI")
              divisions={
                name:input.code,
                values:input.values?input.values:""
              }
            if(!input.values)
             {
                return "";}
            else
            {
              return(<FormControl margin="normal" required fullWidth key={i++}>
              <InputLabel htmlFor={input.code}>{input.name}</InputLabel>
              <Select
                required
                disabled={input.is_read_only==="Y" || (this.state.currInputs.level_position==="-1" && input.def_value!=="")?true:false}
                value={this.state.params[input.code]?this.state.params[input.code]:""}
                onChange={(e)=>this.handleChangeSelect(e,input.name,divisions)}
                name={input.code}
                inputProps={{
                  id: input.code,
                }}
                className={classes.selectEmpty}
              >
                <MenuItem disabled value="">
                  <em>{Translation.Payments.paymentChooseOption[lang]}</em>
                </MenuItem>
                {(input.code==="CODE_GP" || input.code==="DIVISIONS" || input.code==="GNI") && this.state.currDivisions!==""?this.state.currDivisions.map(text=>{
                  return(<MenuItem value={text.code} key={i++}>{text.name}</MenuItem>);
                }):input.values?input.values.map(text=>{
                  return(<MenuItem value={text.code} key={i++}>{text.name}</MenuItem>);
                }):""}
              </Select>
            </FormControl>
                );
              }
        }
        else if(input.is_visible==="N" && input.def_value!==""){
            params1={
            ...params1,
            [input.code]:input.def_value
          }
        }
        else if(input.is_visible==="Y" && input.def_value!=="" && input.def_value!=="0"){
            params1={
            ...params1,
            [input.code]:input.def_value
          }
        }
        if(input.is_visible==="Y" && input.param_type==="D"){
          if(input.code==="PERIOD_BEGIN")
          dateNames={
            ...dateNames,
            PERIOD_BEGIN:input.name
          }
          else if(input.code==="PERIOD_END")
            dateNames={
              ...dateNames,
              PERIOD_END:input.name
            }
        }
        if(input.mondatory==="Y" && input.is_visible==="N" &&( input.def_value!=="0" || input.def_value!==""))
        {
          params1={
            ...params1,
            [input.code]:input.def_value
          }
        }
      }):"";
   let dateBlock=(<MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
     <FormControl margin="normal" required fullWidth>
          <DatePicker
          name="PERIOD_BEGIN"
              margin="normal"
               label={dateNames!==""?dateNames["PERIOD_BEGIN"]:""}
               value={dates.PERIOD_BEGIN}
              onChange={this.startDateChangeHandler}
              style={{marginTop: "8px"}}
              autoOk
              InputProps={{
                startAdornment: <InputAdornment position="start"><CalendarToday style={{color: "#B0B0B0"}}/></InputAdornment>,
              }}
          />
          </FormControl>
     <FormControl margin="normal" required fullWidth>
          <DatePicker
          name="PERIOD_END"
              margin="normal"
               label={dateNames!==""?dateNames["PERIOD_END"]:""}
               value={dates.PERIOD_END} 
              onChange={this.endDateChangeHandler}
              style={{marginTop: "8px"}}
              autoOk
              InputProps={{
                startAdornment: <InputAdornment position="start"><CalendarToday style={{color: "#B0B0B0"}}/></InputAdornment>,
              }}
          />
          </FormControl>
      </MuiPickersUtilsProvider>);
    const templateInputs=this.props.templateForm?this.state.currInputs.currInput.payment_details?this.state.currInputs.currInput.payment_details.map(input=>{
        params1={
          ...params1,
          [input.code]:input.value
        }
      return(<FormControl margin="normal" required fullWidth key={i++}>
      <TextField
          required
          defaultValue={input.value}
          onChange={(e)=>this.handleChangeSelect(e,input.name,divisions)}
          id="standard-password-input"
          label={input.name}
          type="text"
          name={input.code}
      />
  </FormControl>)
    })
    :"":"";
    const card_options=(<FormControl margin="normal" required fullWidth key={i++}>
    <InputLabel htmlFor={"CARD_NUMBER"}>{Translation.Payments.paymentCardNumber[lang]}</InputLabel>
    <Select
      required
      value={this.state.params["CARD_NUMBER"]?this.state.params["CARD_NUMBER"]:""}
      onChange={(e)=>this.handleChangeSelect(e,"Номер карты")}
      name={"CARD_NUMBER"}
      inputProps={{
        id: "CARD_NUMBER",
      }}
      className={classes.selectEmpty}
    >
      <MenuItem disabled value="">
        <em>{Translation.Payments.paymentChooseOption[lang]}</em>
      </MenuItem>
      {this.props.cardInfo.uzCards?this.props.cardInfo.uzCards.length?this.props.cardInfo.uzCards.map(item=>{
        return(<MenuItem className={classes.menuItem} value={item.card_number} key={i++}>
                <div>
                    <div className="cards-cards">
                        <img src={card} className='cards-cards-image' style={{display : "block"}}/>
                        <div className="cards-cards-info">
                            <p className="cards-cards-name">{item.card_name}</p>
                            <p className="cards-cards-value">{`${accounting.formatMoney(item.balance,"","2"," ",".")} ${item.currency_char}`}</p>
                        </div>
                    </div>
                </div>
                </MenuItem>
              );
      }):"":""}
    </Select>
    </FormControl>);
    const currSrc=this.props.currInput.currIcon;
    let temp;
      try{
        temp=require('../../../public/assets/payment-icons/providers/'+currSrc);
      }
      catch(e){
        temp=require('./AABIcon.png');
      }
      const currProName=this.props.currInput.currProviderName;
      return(
       <Grid container spacing={24} justify='center'>
          <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={openSnack}
              onClose={this.handleCloseSnackbar}
              ContentProps={{
                  'aria-describedby': 'message-id',
              }}
              autoHideDuration = {3000}
              message={<span id="message-id">{snackMSG}</span>}
          />
              <div style={{margin:"auto",marginBottom:50,marginTop:50,width:"40%"}}>
                    <div style={{display:"flex",margin:"auto",justifyContent:"center"}}>
                      <img src={temp} alt={currProName} style={{width:55,height:55,display:"inline-block"}}/>
                      <Typography style={{display:"inline-block",marginTop:"auto",marginBottom:"auto",marginLeft:15}}>{currProName}</Typography>
                    </div>
                    {this.state.currInputs.currInput.level_position==="-1"?<Check card_options ={card_options} inputBlock={inputBlock} onSubmit={(e)=>this.handle(e,params1)}  />:
                    <form onSubmit={(e)=>this.handle(e,params1)}>
                        {this.props.templateForm?templateInputs:inputBlock}
                        {this.props.currInput?this.props.currInput.payment_detail_code==="MUNIS_0103" && this.props.currInput.currInput.level_position==="1"?dateBlock:"":""}
                        <Grid container justify="center" alignItems="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                disabled={submitDisable}
                                className={classes.submit}
                              style={{marginTop:15}}
                              >
                                {Translation.Payments.paymentContinue[lang]}
                            </Button>
                        </Grid>
                    </form>}
            </div>
        </Grid>)
  }
}

PaymentsForm.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    cardInfo: state.cardsInfo,
    currentLang: state.menuItems
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(PaymentsForm));