import React, { Component } from 'react';
import Api from "../../services/api";
import RemmittanceList from "../remittance-list";
import CountryList from "../country-list";
import "./transfer-money.css";
import Warning from "../warning";
import Waiting from "../waiting";
import OperationWaiting from "../spinner-opacity";
import Success from "../success";
import Cleave from "cleave.js/react"
import {connect} from "react-redux"
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import CardsList from "../cards-list";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import * as actionTypes from "../../store/actions/Actions";

class TransferMoney extends Component {
    state = {
        rem : null,
        waiting : true,
        warning : false,
        success : false,
        opacity : false,
        msg : null,
        country : null,
        default_country : null,
        default_rem : null,
        default_card : null,
        data : null,
        currentLanguage : null,
        remittance_code : "",
        first_name : "",
        last_name : "",
        patronymic : "",
        remittance_amount : "",
        request : null,
        open: false,
        msg2 : "Hamma maydonni to`ldiring",
        vertical: 'top',
        horizontal: 'center',
    };

    api = new Api();

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                waiting: false,
                currentLanguage: this.props.language
            })
        }

        if (this.props.cardsInfo !== prevProps.cardsInfo) {
            const idx = this.props.cardsInfo.uzCards.findIndex((item) => item.is_default === "Y");
            if (idx >= 0) {
                const currentCard = this.props.cardsInfo.uzCards[idx].card_number;
                this.setState({ default_card: currentCard });
            } else {
                const currentCard = this.props.cardsInfo.uzCards[0].card_number;
                this.setState({ default_card: currentCard });
            }
            this.setState({
                data : this.props.cardsInfo,
                waiting: false,
            })
        }
    }

    componentWillMount() {
        console.log("---------------------",this.props.cardsInfo);
        if(this.props.cardsInfo.allCards){
            const idx = this.props.cardsInfo.uzCards.findIndex((item) => item.is_default === "Y");
            if (idx >= 0) {
                const currentCard = this.props.cardsInfo.uzCards[idx].card_number;
                this.setState({ default_card: currentCard });
            } else {
                const currentCard = this.props.cardsInfo.uzCards[0].card_number;
                this.setState({ default_card: currentCard });
            }
            this.setState({
                data : this.props.cardsInfo,
            })
        }
    }


    componentDidMount() {

        const requestCardToCard = {
            request : "get_course",
            message_type : 73,
        };

        this.api.SetAjax(requestCardToCard).then(data=>{
            if(data.result === "0"){
                console.log("----------------",JSON.stringify(data));
                const rem = data.remittance_types.map(item=>{
                    return item
                });

                this.setState({
                    default_rem :  rem[0].remittance_type_id
                });
                const country = data.countries.map(item => {
                    return item
                });

                this.setState({
                    default_country :  country[0].country_code
                });

                this.setState({
                    waiting : false,
                    rem : rem,
                    country : country,
                    request : data
                })
            }else{
                this.setState({
                    waiting:false,
                    warning : true,
                    msg : data.msg
                })
            }

        })

    }

    remmittanceList = (e) =>{
        this.setState({
            default_rem : e
        })
    };

    countryList = (e) =>{
        this.setState({
            default_country : e
        })
    };

    cardHandler = (e) => {
      this.setState({
          default_card : e
      })
    };

    fff = (e) =>{
        let el = document.getElementsByClassName(e)[0];
        el.style.top = "-3px";
        el.style.left = "0";
        el.style.fontSize = "12px";
        el.style.color = "#0A266C"
    };

    ffff = (e,inut_name) =>{
        if(this.state[inut_name] === null ||this.state[inut_name] === "" ){
            let el = document.getElementsByClassName(e)[0];
            el.style.top = "16px";
            el.style.left = "3px";
            el.style.fontSize = "14px";
            el.style.color = "#5A5A5A"
        }
    };
    handleChangeSelect = (e) => {
        if(e.target.name === "remittance_amount"){
            this.setState({
                [e.target.name] : e.target.value.replace(/[^0-9]/g, '')
            })
        }else{
            this.setState({
                [e.target.name] : e.target.value
            })
        }

    };

    handleClose = () => {
        this.setState({ open: false });
    };

    convert = (e)=>{
       if(this.state.first_name.length > 0 && this.state.last_name.length > 0 && this.state.patronymic.length > 0 && this.state.remittance_code.length > 0 && this.state.remittance_amount.length > 0){
           const reqq = {
               "request" : "CREATE_BANK_TRANSFER",
               "message_type": 71,
               "payment_detail_code": "CREATE_BANK_TRANSFER",
               "card_number" : this.state.default_card,
               //"client_phone" = 998935584545;
               "country_code" : this.state.default_country,
               "first_name" : this.state.first_name,
               "last_name" : this.state.last_name,
               "operation_id" : 2,
               "patronymic" : this.state.patronymic,
               "remittance_amount" : this.state.remittance_amount,
               "remittance_code" : this.state.remittance_code,
               "remittance_type_id" : this.state.default_rem,
           };
           this.setState({
               opacity : true
           });
          this.api.SetAjax(reqq).then(data=>{
              if(data.result === "0"){

                  let currCardsInfo=this.props.cardInfo.allCards;
                  if(currCardsInfo && currCardsInfo.card_list.length)
                      for( var i = 0; i < currCardsInfo.card_list.length; i++){
                          if ( currCardsInfo.card_list[i].card_number === this.state.default_card) {
                              currCardsInfo.card_list[i].balance=currCardsInfo.card_list[i].balance-this.state.remittance_amount;
                          }
                      }

                  this.props.addCardInfo({
                      allCards: currCardsInfo,
                  });

                  this.setState({
                      success : true,
                      opacity : false,
                  });
              }else{
                  this.setState({
                      opacity : false,
                      warning : true,
                      msg : data.msg
                  });
              }
          }).catch(err=>{
              console.log(err);
              this.setState({
                  opacity : false,
                  msg2 : err.responseText,
                  open : true
              })
          });
       }else{
           this.setState({
               msg2 : "Hamma maydonni to`ldiring",
               open : true
           })
       }


    };

    render () {
        console.log("---------------------",this.props.cardsInfo);
        const {opacity,rem,waiting,warning,msg,country,data,open,msg2,vertical,horizontal,success} = this.state;
        const { classes } = this.props;
        if(success){
            return <Success url="/main" />
        }
        if(waiting){
            return <Waiting/>
        }
        if(warning){
            return <Warning url="/main" text={msg}/>
        }
        return (
            <div className="transfer-money-container">
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',

                    }}
                    autoHideDuration = {10000}
                    message={<span id="message-id">{msg2}</span>}
                />
                <div className="transfer-money-inner-container">
                    {opacity ? <OperationWaiting/> : null}
                    {rem ? <RemmittanceList handler={this.remmittanceList} data = {rem}/> : null}
                    <div style={{margin : "10px 0"}}>Данные о переводе</div>
                    {country ? <CountryList handler={this.countryList} data = {country}/> : null}
                    <div className="transfer-money-form">
                        <p className="transfer-money-title1">Контрольный номер перевода</p>
                        <Cleave
                                required
                                tabIndex="-1"
                                onChange={this.handleChangeSelect}
                                name="remittance_code"
                                style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                                className = "cleave-focus"
                                onFocus = {() => this.fff("transfer-money-title1")}
                                onBlur = {() => this.ffff("transfer-money-title1","remittance_code")}

                        />
                    </div>
                    <div  className="transfer-money-form">
                        <p className="transfer-money-title1 transfer-money-title2">Имя отправителя</p>
                        <Cleave
                            required
                            tabIndex="-1"
                            onChange={this.handleChangeSelect}
                            name="first_name"
                            style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                            className = "cleave-focus"
                            onFocus = {() => this.fff("transfer-money-title2")}
                            onBlur = {() => this.ffff("transfer-money-title2","first_name")}

                        />
                    </div>
                    <div  className="transfer-money-form">
                        <p className="transfer-money-title1 transfer-money-title3">Фамилия</p>
                        <Cleave
                            tabIndex="-1"
                            onChange={this.handleChangeSelect}
                            name="last_name"
                            style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                            className = "cleave-focus"
                            onFocus = {() => this.fff("transfer-money-title3")}
                            onBlur = {() => this.ffff("transfer-money-title3","last_name")}

                        />
                    </div>
                    <div  className="transfer-money-form">
                        <p className="transfer-money-title1 transfer-money-title4">Отчество</p>
                        <Cleave
                            tabIndex="-1"
                            onChange={this.handleChangeSelect}
                            name="patronymic"
                            style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                            className = "cleave-focus"
                            onFocus = {() => this.fff("transfer-money-title4")}
                            onBlur = {() => this.ffff("transfer-money-title4","patronymic")}

                        />
                    </div>
                    {data ? <CardsList data={data.allCards.card_list} cardHandler={this.cardHandler}/> : null}
                    <div  className="transfer-money-form">
                        <p className="transfer-money-title1 transfer-money-title5">Сумма</p>
                        <Cleave
                            options={
                                {
                                    numeralThousandsGroupStyle : "thousand",
                                    numeral: true,
                                    numeralIntegerScale: 12,
                                    numeralDecimalScale: 2,
                                    numeralDecimalMark: '.',
                                    delimiter: ' ',
                                    numeralPositiveOnly: true
                                }
                            }
                            tabIndex="-1"
                            onChange={this.handleChangeSelect}
                            name="remittance_amount"
                            style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                            className = "cleave-focus"
                            onFocus = {() => this.fff("transfer-money-title5")}
                            onBlur = {() => this.ffff("transfer-money-title5","remittance_amount")}

                        />
                    </div>
                        <div style={{display :'flex',justifyContent : 'center', marginTop : '20px'}}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                onClick = {this.convert}
                            >
                                Отправить запрос в банк

                            </Button>
                        </div>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    submit: theme.submit
});


TransferMoney.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        cardsInfo: state.cardsInfo,
        language: state.menuItems.language,
        cardInfo: state.cardsInfo,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addCardInfo: info =>
            dispatch({
                type: actionTypes.cardInformation,
                info: info
            }),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(TransferMoney));



{/*<div className='transfer-money-container'>*/}



{/*    <div className='check-container'>*/}

{/*        <div className="check-title">  Чек к оплате </div>*/}

{/*        <div className="check-dashed"></div>*/}

{/*        <div className="check-section">*/}
{/*            <div className='check-section-title'>Система перевода:</div>*/}
{/*            <div className="check-section-value">Золотая корона</div>*/}
{/*        </div>*/}

{/*        <div className="check-section">*/}
{/*            <div className='check-section-title'>Получатель: </div>*/}
{/*            <div className="check-section-value">Абдуллаев Одил Шерзод угли</div>*/}
{/*        </div>*/}

{/*        <div className="check-section">*/}
{/*            <div className='check-section-title'>Страна отправителя:</div>*/}
{/*            <div className="check-section-value">Грузия</div>*/}
{/*        </div>*/}

{/*        <div className="check-section">*/}
{/*            <div className='check-section-title'>Сумма:</div>*/}
{/*            <div className="check-section-value">100 USD</div>*/}
{/*        </div>*/}

{/*        <div className="check-section">*/}
{/*            <div className='check-section-title'>Зачислить на::</div>*/}
{/*            <div className="check-section-value">AAB Uzcard</div>*/}
{/*        </div>*/}

{/*    </div>*/}
{/*</div>*/}