import React, { Component } from 'react';
import { withRouter } from 'react-router'
import {HashRouter as Router, Route, Link} from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/Actions";
import {  Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import GoBack from "./go-back.png";
import defList from "./def-list.png";
import defListActive from "./def-list-active.png";
import blockList from "./block-list.png";
import blockListActive from "./block-list-active.png";
import PaymentsCategory from "../payments-categories"
import PaymentsTemplates from "../payments-template"
import PaymentsProviders from "../payments-providers"
import PaymentsForm from "../payments-form"
import Waiting from "../waiting"
import Success from "../success"
import Error from "../error"
import InnerWaiting from "../spinner-opacity";
import Api from "../../services/api"
import TempDialog from '../payments-template/template-deleteDialog'
import Translation from '../../translations/translations.json';
import { Redirect } from 'react-router-dom';
 const styles = theme => ({
      menuContent: {
        borderRadius: 6,
        border: "1px solid #e3e3e3",
        alignItems: "center",
        marginBottom:30,
      },
      menuSubContent: {
        borderRight: "1px solid #e3e3e3",
        borderBottom: "1px solid #e3e3e3",
        '&:hover':{
          backgroundColor: "rgba(10, 38, 108, 0.03);",
          cursor:"pointer"
        }
      },
      menuListItem:{
          padding: "15px",
        '&:hover':{
          backgroundColor:"rgba(10, 38, 108, 0.005);",
          fontWeight:500
        }
      },
      goBack:{
        textTransform: "capitalize",
        marginBottom:15
      },
      header:{
        display:"flex",
        width:"100%",
        borderBottom:"1px solid #e3e3e3",
        paddingLeft:16,
        paddingRight:16,
        paddingTop:10,
        paddingBottom:10,
        justifyContent:"space-between"
      },
      blockList:{
        marginLeft:10,
        marginTop:6,
        '&:hover':{
          cursor:"pointer"
        }
      },
      defList:{
        marginRight:10,
        marginTop:6,
        '&:hover':{
          cursor:"pointer"
        }
      },
      tabPayments:{
        textTransform: "capitalize",
      },
      disableTabPay:{
        textTransform: "capitalize",
        color:"#9b9b9b"
      }
    });
class Payments extends Component {
  api = new Api();
  state={
    reloaded:true,
    allProviders:null,
    currProviders:null,
    categoryTypes:true,
    savedTemplates:false,
    savedTemplateList:"",
    definitionList:true,
    blockListType:false,
    paymentForm:false,
    showProviders:false,
    currPaymentDetails:{
      currCategory:"default",
      currCategoryName:"",
      currInput:"",
      params:{},
    },
    tempPaymentForm:false,
    waiting:true,
    success:false,
    error:false,
    errorText:"",
    dialogOpen:false,
    deleteTempId:"",
    saveTemplateBegin:false,
    payment_details_temp:"",
    fullSaveTemplate:"",
    exchangeRateJson:null,
    innerWaiting:true,
    jsonTaxes:{
      CODE_OBJ:null,
      INN:null
    },
    innRequestSent:false
  }
  componentWillMount() {
    let reqMenus = {
        request: "get_service_type_list"
    };
    let reqSavedTemplates={
      request:"get_template_list",
      message_type:111
    };
    let reqExchangeRate={
      request:"get_exchange_rate",
      message_type:41
    }
  if(!localStorage.getItem('CODE_OBJ') && !localStorage.getItem('inn')){
      if (!this.state.exchangeRateJson) {
            this.api.SetAjax(reqExchangeRate).then(data=>{
            //   {  
            //     "result":"0",
            //     "currency_rates":[  
            //        {  
            //           "rate":8380,
            //           "from_currency":"840",
            //           "to_currency":"000"
            //        },
            //        {  
            //           "rate":8430,
            //           "from_currency":"000",
            //           "to_currency":"840"
            //        }
            //     ],
            //     "msg":""
            //  }
            if (data.result==='0') {
                this.setState({
                    exchangeRateJson:{
                        from_uzs_to_usd:data.currency_rates.filter(currency=>currency.from_currency==='840'),
                        from_usd_to_uzs:data.currency_rates.filter(currency=>currency.from_currency==='840')
                      },
                    waiting : false})
            }
            else
              {
                alert(data.msg);
                this.setState({
                waiting:false});
              }
            });
      }
      if (this.state.allProviders===null) {
            this.api.SetAjax(reqMenus).then(data=>{
            if (data.result.length) {
                this.setState({
                  allProviders: data.result,
                  waiting : false,
                  innerWaiting:false
                })
            }
            else
              this.setState({
                waiting:true});
            });
      }
      if(!this.state.savedTemplateList){
        this.setState({
          waiting:true});
          this.api.SetAjax(reqSavedTemplates).then(data=>{
          if (data.result === "0") {
              this.setState({
                savedTemplateList: data.list.filter(template=>template.detail_code!=="CARD_TO_CARD" || template.detail_code!=="LOAN" || template.detail_code!=="BUDGET_PAYMENT" ),
                waiting : false});
          }
          else
            this.setState({
              waiting:true});
          });
      }
    }
}

componentDidMount(){
  if(localStorage.getItem('CODE_OBJ') && localStorage.getItem('inn')){
    if(!this.state.innRequestSent)
    {
      this.setState({
        innRequestSent:true,
        jsonTaxes:{
          CODE_OBJ:localStorage.getItem('CODE_OBJ'),
          INN:localStorage.getItem('inn')
        }
      })
      localStorage.removeItem('CODE_OBJ');
      localStorage.removeItem('inn');
      this.handleFormForINN();
    }
  }
}
handleDefinitionType=()=>{
  this.setState({
    definitionList:true,
    blockListType:false
  });
}
handleBlockType=()=>{
  this.setState({
    definitionList:false,
    blockListType:true
  });
}
handleCategoryType=()=>{
  this.setState({
    categoryTypes:true,
    savedTemplates:false,
  });
}
handleTemplateType=()=>{
  this.setState({
    categoryTypes:false,
    savedTemplates:true,
    reloaded:false,
  });
}
handleCategoryClick=(cat_label,cat_target)=>{
  let filterProviderTarget;
  if(cat_target==="TELEPHONY")
  filterProviderTarget="IP_TELEPHONY";
  else
    filterProviderTarget=cat_target;
  this.setState({
    categoryTypes:this.state.allProviders!==null?false:true,
    savedTemplates:false,
    showProviders:this.state.allProviders!==null?true:false,
  currPaymentDetails:{
    ...this.state.currPaymentDetails,
    currCategoryName:cat_label,
    currCategory:cat_target=="CELLULAR"?"MOBILE":filterProviderTarget,
    },
    currProviders:this.state.allProviders!==null?this.state.allProviders.filter(item=>item.grouping==filterProviderTarget):[],
  });
}
handleProviderClick=(pro_label,pro_target,pro_contract_id,src)=>{
  const reqForm={
    request:this.state.currPaymentDetails.currCategory,
    is_web:"Y",
    message_type:8,
    contract_id:pro_contract_id,
    payment_detail_code:pro_target,
    curr_level_position:0,
    params:{  
       "key":"value"
    }
  }
  this.setState({
    waiting:true});
    console.log(JSON.stringify(reqForm));
    this.api.SetAjax(reqForm).then(data=>{
    if (data.result === "0") {
        this.setState({
          paymentForm:true,
          currPaymentDetails:{
            ...this.state.currPaymentDetails,
          contract_id:pro_contract_id,
          payment_detail_code:pro_target,
          currInput:data,
          currProviderName:pro_label,
          currIcon:src},
          waiting : false,
          reloaded:false,
      });
          console.log(JSON.stringify(data));
    }
    else
     { this.setState({
        waiting:true});
        console.log(JSON.stringify(data));
      }
    });
}
handleFormForINN=()=>{
  const reqFromINN={  
    "request":"BUDGET_PAYMENT",
    "is_web":"Y",
    "message_type":8,
    "contract_id":576,
    "payment_detail_code":"MUNIS_0201",
    "curr_level_position":0,
    "params":{  
       "key":"value"
    }
 }
this.setState({
  innerWaiting:false,
  categoryTypes:false,
  savedTemplates:false,
  showProviders:false,
  reloaded:false,
  currPaymentDetails:{
    ...this.state.currPaymentDetails,
    currCategory:'BUDGET_PAYMENT',
    },
    waiting:true});
    console.log(JSON.stringify(reqFromINN));
    this.api.SetAjax(reqFromINN).then(data=>{
    if (data.result === "0") {
        this.setState({
          paymentForm:true,
          currPaymentDetails:{
            ...this.state.currPaymentDetails,
          contract_id:576,
          payment_detail_code:'MUNIS_0201',
          currInput:data,
          currProviderName:Translation.Payments.TaxesName[this.props.currentLang?this.props.currentLang.language:"ru"],
          currIcon:'tax_logo.png'},
          waiting : false,
          reloaded:false,
      });
          console.log(JSON.stringify(data));
    }
    else
     { 
       this.setState({
        waiting:true});
        console.log(JSON.stringify(data));
      }
    });
}
handleTemplateClick=(template,template_label,src)=>{
  const reqForm={
    request:"TEMP_FORM",
    message_type:112,
    temp_id:template.temp_id,
    is_hashmap:'N'
  }
  this.setState({
    waiting:true});
    this.api.SetAjax(reqForm).then(data=>{
    if (data.result === "0") {
        this.setState({
          currPaymentDetails:{
            ...this.state.currPaymentDetails,
           contract_id:template.contract_id,
          payment_detail_code:template.detail_code,
          currProviderName:template_label,
          currIcon:src,
          currInput:data,},
          categoryTypes:false,
          savedTemplates:false,
          tempPaymentForm:true,
          waiting : false});
          console.log(reqForm)
          console.log(data);
    }
    else
      this.setState({
        waiting:true});
    });
}
handleBack=()=>{
  if(this.state.tempPaymentForm)
   {
     this.props.history.goBack();
     this.setState({
      tempPaymentForm:false,
      savedTemplates:true,
     });
    }
 else if(this.state.paymentForm)
   {
     this.props.history.goBack();
     this.setState({
      paymentForm:false,
      showProviders:true,
     });
    }
   else if(this.state.showProviders){
    this.props.history.goBack();
     this.setState({
      showProviders:false,
      categoryTypes:true,
     });
    }
  else{
      this.props.history.push("/"); 
    }
}
getPaymentState=(params)=>{
  this.setState({
    currPaymentDetails:{
      ...this.state.currPaymentDetails,
      params: {
        ...this.state.currPaymentDetails.params,
        ...params}
    },
    waiting:true});
    if(this.state.tempPaymentForm)
      this.setState({
        tempPaymentForm: false,
        paymentForm: true,
      });
  if(this.state.currPaymentDetails.currInput.level_position!=="-1"){
    const req={
    "request":this.state.currPaymentDetails.currCategory!==""?this.state.currPaymentDetails.currCategory:"default_template_request",
   "message_type":8,
   "contract_id":this.state.currPaymentDetails.contract_id,
   "payment_detail_code":this.state.currPaymentDetails.payment_detail_code,
   "curr_level_position":this.state.currPaymentDetails.currInput.level_position?this.state.currPaymentDetails.currInput.level_position:1,
   "params":{
    ...this.state.currPaymentDetails.params,
    ...params}
  }
  console.log(JSON.stringify(req));
  this.api.SetAjax(req).then(data=>{
  if (data.result === "0") {
      this.setState({
        currPaymentDetails:{
          ...this.state.currPaymentDetails,
          currInput: data
        },
        waiting:false
     });
     console.log(JSON.stringify(data));
  }
  else
    {console.log(JSON.stringify(data));
    this.setState({
    waiting:false,
    error:true,
    errorText:data.msg
    });}
  });

 
}
else{
  let paramsFull={
    ...this.state.currPaymentDetails.params,
    ...params
  }
  let amount=paramsFull["AMOUNT"]?paramsFull["AMOUNT"].replace(' ','').replace(' ','').replace(' ','').replace(' ','').replace(' ',''):paramsFull["amount"]?paramsFull["amount"].replace(' ','').replace(' ','').replace(' ','').replace(' ','').replace(' ',''):"";
  paramsFull={
    ...paramsFull,
    'AMOUNT':amount,
    'amount':amount
  }
  let currPayAmount=paramsFull["AMOUNT"]?paramsFull["AMOUNT"]:paramsFull["amount"]?paramsFull["amount"]:"";
  let currPayCard=paramsFull["CARD_NUMBER"]?paramsFull["CARD_NUMBER"]:"";
  const req={
   "request":this.state.currPaymentDetails.currCategory!==""?this.state.currPaymentDetails.currCategory:"default_request",
   "message_type":9,
   "contract_id":this.state.currPaymentDetails.contract_id,
   "payment_detail_code":this.state.currPaymentDetails.payment_detail_code,
   "curr_level_position":this.state.currPaymentDetails.currInput.level_position,
   "params":paramsFull,
    // ...this.state.currPaymentDetails.params,
    // ...params
  }
  console.log(JSON.stringify(req));
  this.api.SetAjax(req).then(data=>{
  if (data.result === "0") {
    let currCardsInfo=this.props.cardInfo.allCards;
    if(currCardsInfo && currCardsInfo.card_list.length)
    for( var i = 0; i < currCardsInfo.card_list.length; i++){ 
      if ( currCardsInfo.card_list[i].card_number === currPayCard) {
        currCardsInfo.card_list[i].balance=currCardsInfo.card_list[i].balance-currPayAmount;
      }
    }
    this.props.addCardInfo({
      allCards: currCardsInfo,
    });
    this.setState({
      waiting:false,
      success:true,
      saveTemplateBegin:true
    });
  }
  else
  {
    this.setState({
      errorText:data.msg,
      waiting:false,
      error:true,
    });}
    console.log(JSON.stringify(data));
  });
}
}
showSaveTemp=()=>{
  let fullSaveTemplate={
    contract_id:this.state.currPaymentDetails.contract_id,
    detail_code:this.state.currPaymentDetails.payment_detail_code,
    payment_details:this.state.payment_details_temp
  }
  this.setState({
    saveTemplateBegin:true,
    dialogOpen:true,
    fullSaveTemplate:fullSaveTemplate
  });
}
 handleDialogState=(temp_id,state)=>{
  if(state){
    this.setState({
      dialogOpen:true,
      deleteTempId:temp_id
    });
  }
  else{
    if(temp_id)
    { 
      this.setState({
        dialogOpen:false
      });
    }
    else{
      this.setState({
        dialogOpen:false
      });
    }
  }
 }
 getTemplateLast=(pay_details)=>{
   this.setState({
    payment_details_temp:[
       ...this.state.payment_details_temp,
       ...pay_details
     ]
    });
 }
 templatesUpdated=()=>{
  let reqSavedTemplates={
    request:"get_template_list",
    message_type:111
  }
  this.setState({
        waiting:true});
        this.api.SetAjax(reqSavedTemplates).then(data=>{
        if (data.result === "0") {
            this.setState({
              savedTemplateList: data.list.filter(template=>template.detail_code!=="CARD_TO_CARD" || template.detail_code!=="LOAN" || template.detail_code!=="BUDGET_PAYMENT" ),
              waiting : false});
        }
        else{
        alert(data.msg);
          this.setState({
            waiting:true});
          }
        });
 }
  render(){
    let lang = this.props.currentLang?this.props.currentLang.language:"ru";
    if(this.state.waiting){
      return <Waiting/>
  }
    if(this.state.success){
      return (
      <div>
          <Success toPayments={true} url="/" text={
            <div onClick={this.showSaveTemp} className='success-text' style={{cursor:"pointer",textDecoration:"underline",fontWeight:500, color: "#183784"}}>
            {Translation.Payments.paymentAddTemplate[lang]}
          </div>}/>
          <TempDialog 
          fullSaveTemplate={this.state.fullSaveTemplate} 
          saveTemplateBegin ={this.state.saveTemplateBegin} 
          open={this.state.dialogOpen} 
          temp_id={this.state.deleteTempId} dialog={this.handleDialogState}/>
      </div>
    )}
    if(this.state.error){
      return <Error text={this.state.errorText}/>
    }
    const { classes } = this.props;
    const {
      categoryTypes,
      savedTemplates,
      definitionList,
      blockListType,
      waiting,
      currProviders,
      paymentForm,
      tempPaymentForm,
      showProviders,
      currPaymentDetails
    }=this.state;
        return (
        <Router >
                <div>
                  <Button  className={classes.goBack} onClick={this.handleBack} >
                      <ListItemIcon  style={{marginRight:0}}><img src={GoBack} alt="goBack" /></ListItemIcon>
                      <ListItemText
                          primary={
                              <Typography variant="inherit" >
                                {Translation.Payments.paymentGoBack[lang]}  
                              </Typography>
                          }/>
                  </Button>
                  <Grid container spacing={16} className={classes.menuContent} style={{position:'relative'}}>
                  {this.state.innerWaiting ? <InnerWaiting/> : ""}
                  {/* <AllCards state="SV" data={this.props.cardInfo.allCards}/> */}
                    {paymentForm || tempPaymentForm?"":<div   className={classes.header}>
                      {!showProviders?<div style={{display:"inline-block"}}><Button onClick={this.handleCategoryType}  id ='categoryReClick' component={Link} to="/main/payments/categories" className={categoryTypes?classes.tabPayments:classes.disableTabPay}>{Translation.Payments.paymentCategories[lang]}</Button>
                      <Button  onClick={this.handleTemplateType} component={Link} to="/main/payments/templates" className={savedTemplates?classes.tabPayments:classes.disableTabPay}>{Translation.Payments.paymentSavedTemplates[lang]}</Button></div>:<div style={{display:"inline-block"}}><Button className={classes.tabPayments}>{currPaymentDetails.currCategoryName}</Button></div>}
                         
                      <div style={{display:"inline-block"}}>
                        <img onClick={this.handleDefinitionType} className={classes.defList} src={definitionList?defListActive:defList} alt="def-list" />
                        <img onClick={this.handleBlockType} className={classes.blockList} src={blockListType?blockListActive:blockList} alt="block-list" />
                      </div>
                    </div>}
                    
                      <Route exact path="/main/payments"  render={()=> <PaymentsCategory definitionList={definitionList} handleCategoryClick={this.handleCategoryClick}/>}/>
                      <Route exact path="/main/payments/categories"  render={()=> <PaymentsCategory definitionList={definitionList} handleCategoryClick={this.handleCategoryClick}/>} />
                      <Route exact path="/main/payments/templates"  render={()=> <PaymentsTemplates definitionList={definitionList} handleTemplateClick={this.handleTemplateClick} savedTemplateList={this.state.savedTemplateList} savedTemplates={savedTemplates} dialog={this.handleDialogState}/>} />
                      <Route exact path="/main/payments/categories/:id"  render={()=><PaymentsProviders definitionList={definitionList} currCategory={currPaymentDetails.currCategory.toLowerCase()} handleProvider={this.handleProviderClick} currProviders={currProviders}/>}  />
                      <Route exact path={`/main/payments/categories/:id/paymentForm`}  render={()=> <PaymentsForm jsonTaxes={this.state.jsonTaxes} getTemplateLast={this.getTemplateLast} currInput={currPaymentDetails} reloaded={this.state.reloaded} getPaymentState={this.getPaymentState}/>} />
                      <Route exact path={`/main/payments/templates/:id`}  render={()=> <PaymentsForm jsonTaxes={this.state.jsonTaxes} currInput={currPaymentDetails} getTemplateLast={this.getTemplateLast} templateForm={tempPaymentForm} reloaded={this.state.reloaded} getPaymentState={this.getPaymentState}/>} />
                      <TempDialog templatesUpdated={this.templatesUpdated} fullSaveTemplate={this.state.fullSaveTemplate} saveTemplateBegin ={this.state.saveTemplateBegin} open={this.state.dialogOpen} temp_id={this.state.deleteTempId} dialog={this.handleDialogState}/>
                  </Grid>
                  </div>
                </Router>
          );
  }
};
const mapStateToProps = state => {
  return {
    allPayments : state.menuItems.allPayments,
    cardInfo: state.cardsInfo,
    currentLang: state.menuItems
  };
};
const mapDispatchToProps = dispatch => {
  return {
      addMenuItems: info =>
          dispatch({
              type: actionTypes.menuItems,
              info: info
          }),
      addCardInfo: info =>
          dispatch({
              type: actionTypes.cardInformation,
              info: info
          }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles, { withTheme: true })(Payments)));