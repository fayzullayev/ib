import React, { Component } from 'react'
import Api from "../../services/api"
import Warning from "../warning"
import Waiting from "../waiting"
import SpinnerOpacity from "../spinner-opacity"
import "./account_transfer.css"
import Success from "../success"
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Cleave from "cleave.js/dist/cleave-react-node";
import {connect} from "react-redux";
import CardsList from "../cards-list"
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import * as actionTypes from "../../store/actions/Actions";

class AccountTransfer extends Component {
    api = new Api();

    state = {
        waiting : true,
        warning : false,
        success : false,
        innerOpacity : false,
        cards : null,
        inputs : null,
        text : null,
        params : {},
        default_card : null,
        open: false,
        msg : null,
        vertical: 'top',
        horizontal: 'center',
        isCard : false,
    };
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.uzCards !== prevProps.uzCards) {
            const idx = this.props.uzCards.findIndex((item) => item.is_default === "Y");
            if (idx >= 0) {
                const currentCard = this.props.uzCards[idx].card_number;
                this.setState({
                    ...this.state,
                    params: {...this.state.params, CARD_NUMBER : currentCard}
                })
            } else {
                const currentCard = this.props.uzCards[0].card_number;
                this.setState({
                    ...this.state,
                    params: {...this.state.params, CARD_NUMBER : currentCard}
                })
            }
            this.setState({
                cards : this.props.uzCards,
                waiting: false,
            })
        }
    }

    componentWillMount() {
        console.log("Cards ---------------------",this.props.uzCards);
        if(this.props.uzCards.length > 0){
            const idx = this.props.uzCards.findIndex((item) => item.is_default === "Y");
            if (idx >= 0) {
                const currentCard = this.props.uzCards[idx].card_number;
                this.setState({
                    ...this.state,
                    params: {...this.state.params, CARD_NUMBER : currentCard}
                })
            } else {
                const currentCard = this.props.uzCards[0].card_number;
                this.setState({
                    ...this.state,
                    params: {...this.state.params, CARD_NUMBER : currentCard}
                })
            }
            this.setState({
                cards : this.props.uzCards,
            })
        }
    }

    componentDidMount() {

         const req = {
             "request": "ONE_TIME_PAY",
             "is_web": "Y",
             "message_type": 8,
             "payment_detail_code": "ONE_TIME_PAY",
             "pay_form_pattern": "ONE_TIME_PAY",
             "curr_level_position": "0",
             "contract_id": "-7",
             "params": {
                 "value": "name"
             },
         };


         this.api.SetAjax(req).then(data=>{
              console.log("ACCOUNT_TRANSFER -------------- ", data);
             if(data.result === "0"){
                 data.service_details.map(item => {
                     this.setState({
                         ...this.state,
                         params: {...this.state.params,[item.code] : item.def_value}
                     })
                 });
                this.setState({
                    waiting : false,
                    inputs : data
                })
             }else {
                 this.setState({
                     warning : true,
                     waiting : false,
                     text : data.msg
                 })
             }
         }).catch(err =>{
             this.setState({
                 waiting : false,
                 warning : true,
                 text : err.responseText
             })
         })
     }

     handleChangeSelect = (e) => {
        if(e.target.name === "AMOUNT"){
            this.setState({
                ...this.state,
                params : {
                    ...this.state.params,
                    [e.target.name] : e.target.value.replace(/[^0-9.]/g, '')
                }
            })
        }else{
            this.setState({
                ...this.state,
                params : {
                    ...this.state.params,
                    [e.target.name] : e.target.value
                }
            })
        }
    };

    fff = (e) =>{
        let el = document.getElementsByClassName(e)[0];
        el.style.top = "-3px";
        el.style.left = "0";
        el.style.fontSize = "12px";
        el.style.color = "#0A266C"
    };

    ffff = (e,inut_name) =>{
        if(this.state.params[inut_name] === null ||this.state.params[inut_name] === "" ){
            let el = document.getElementsByClassName(e)[0];
            el.style.top = "16px";
            el.style.left = "3px";
            el.style.fontSize = "14px";
            el.style.color = "#5A5A5A"
        }
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    convert = () =>{
        this.setState({
            innerOpacity : true
        });
        if(this.state.params.RECEIVER_NAME.length > 0 && this.state.params.RECEIVER_ACCOUNT.length > 0 && this.state.params.RECEIVER_FILLIAL_CODE.length > 0 && this.state.params.RECEIVER_INN.length > 0 && this.state.params.PAYMENT_PURPOSE.length > 0 && this.state.params.AMOUNT.length > 0){
            if(this.state.inputs.level_position === "1"){
                const req = {
                    "request": "ONE_TIME_PAY",
                    "is_web": "Y",
                    "message_type": 8,
                    "payment_detail_code": "ONE_TIME_PAY",
                    "pay_form_pattern": "ONE_TIME_PAY",
                    "curr_level_position": "1",
                    "contract_id": "-7",
                    "params": {
                        ...this.state.params
                    },
                };
                this.api.SetAjax(req).then(data => {
                    console.log("level_position1 response -------------- ",JSON.stringify(data))
                    if(data.result === "0"){
                        data.service_details.map(item => {
                            this.setState({
                                ...this.state,
                                params: {...this.state.params,[item.code] : item.def_value},
                                isCard : true,
                            })
                        });
                        this.setState({
                            ...this.state,
                            inputs : data,
                            innerOpacity : false,
                        })
                    }
                    else{
                        this.setState({
                            open : true,
                            msg : data.msg,
                            innerOpacity : false
                        })
                    }
                })
            }
            if(this.state.inputs.level_position === "-1"){
                const req = {
                    "request": "ONE_TIME_PAY",
                    "is_web": "Y",
                    "message_type": 9,
                    "payment_detail_code": "ONE_TIME_PAY",
                    "pay_form_pattern": "ONE_TIME_PAY",
                    "curr_level_position": "-1",
                    "contract_id": "-7",
                    "params": {
                        ...this.state.params
                    },
                };
                this.api.SetAjax(req).then(data => {
                    if(data.result === "0"){

                        let currCardsInfo=this.props.cardInfo.allCards;
                        if(currCardsInfo && currCardsInfo.card_list.length)
                            for( var i = 0; i < currCardsInfo.card_list.length; i++){
                                if ( currCardsInfo.card_list[i].card_number === this.state.params.CARD_NUMBER) {
                                    currCardsInfo.card_list[i].balance=currCardsInfo.card_list[i].balance-this.state.params.AMOUNT;
                                }
                            }

                        this.props.addCardInfo({
                            allCards: currCardsInfo,
                        });


                        this.setState({
                            success : true
                        })
                    }else{
                        this.setState({
                            open : true,
                            msg : data.msg,
                            innerOpacity : false
                        })
                    }

                })
            }
        }else {
            this.setState({
                innerOpacity : false,
                open : true,
                msg : "Заполните все поля"
            })
        }

    };

    cardHandler = (card) => {
        this.setState({
            ...this.state,
            params : {
                ...this.state.params,
                CARD_NUMBER: card
            }
        });
    };

    render () {
        const {warning,waiting,text,success,innerOpacity,inputs,msg,vertical,horizontal,open} = this.state;
        const {classes} = this.props;
        if(success){
            return <Success url="/main"/>
        }
        if(waiting){
            return <Waiting/>
        }
        if(warning){
            return <Warning url="/main" text={text}/>
        }

        const inputss =  inputs ? inputs.service_details.map(item =>{
            if(item.is_visible === "Y" && item.is_required === "Y" ){
                if(item.code === "RECEIVER_FILLIAL_CODE"){
                    return(
                        <div  className="account-transfer-form" key={item.code}>
                            <p className={`account-transfer-title1 ${item.code}`}>{item.name}</p>
                            <Cleave
                                options={
                                    {
                                        numericOnly : true,
                                        numeralIntegerScale: 5,
                                        delimiter: '',
                                        numeralPositiveOnly: true
                                    }
                                }
                                value = {item.def_value}
                                readOnly = {item.is_read_only === "N" ? false : true}
                                tabIndex="-1"
                                onChange={this.handleChangeSelect}
                                name={item.code}
                                style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                                className = "account-transfer-cleave-focus"
                                onFocus = {() => this.fff(item.code)}
                                onBlur = {() => this.ffff(item.code,item.code)}

                            />
                        </div>
                    )
                }else if(item.code === "RECEIVER_ACCOUNT"){
                    return(
                        <div  className="account-transfer-form" key={item.code}>
                            <p className={`account-transfer-title1 ${item.code}`}>{item.name}</p>
                            <Cleave
                                options={
                                    {
                                        numericOnly : true,
                                        numeralIntegerScale: 20,
                                        delimiter: '',
                                        numeralPositiveOnly: true
                                    }
                                }
                                value = {item.def_value}
                                readOnly = {item.is_read_only === "N" ? false : true}
                                tabIndex="-1"
                                onChange={this.handleChangeSelect}
                                name={item.code}
                                style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                                className = "account-transfer-cleave-focus"
                                onFocus = {() => this.fff(item.code)}
                                onBlur = {() => this.ffff(item.code,item.code)}

                            />
                        </div>
                    )
                }else if(item.code === "RECEIVER_INN"){
                    return(
                        <div  className="account-transfer-form" key={item.code}>
                            <p className={`account-transfer-title1 ${item.code}`}>{item.name}</p>
                            <Cleave
                                options={
                                    {
                                        numericOnly : true,
                                        numeralIntegerScale: 9,
                                        delimiter: '',
                                        numeralPositiveOnly: true
                                    }
                                }
                                value = {item.def_value}
                                readOnly = {item.is_read_only === "N" ? false : true}
                                tabIndex="-1"
                                onChange={this.handleChangeSelect}
                                name={item.code}
                                style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                                className = "account-transfer-cleave-focus"
                                onFocus = {() => this.fff(item.code)}
                                onBlur = {() => this.ffff(item.code,item.code)}

                            />
                        </div>
                    )
                }else if(item.code === "PAYMENT_PURPOSE_CODE"){
                    return(
                        <div  className="account-transfer-form" key={item.code}>
                            <p className={`account-transfer-title1 ${item.code}`}>{item.name}</p>
                            <Cleave
                                options={
                                    {
                                        numericOnly : true,
                                        numeralIntegerScale: 5,
                                        delimiter: '',
                                        numeralPositiveOnly: true
                                    }
                                }
                                value = {item.def_value}
                                readOnly = {item.is_read_only === "N" ? false : true}
                                tabIndex="-1"
                                onChange={this.handleChangeSelect}
                                name={item.code}
                                style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                                className = "account-transfer-cleave-focus"
                                onFocus = {() => this.fff(item.code)}
                                onBlur = {() => this.ffff(item.code,item.code)}

                            />
                        </div>
                    )
                }else if(item.code === "AMOUNT"){
                    return(
                        <div  className="account-transfer-form" key={item.code}>
                            <p className={`account-transfer-title1 ${item.code}`}>{item.name}</p>
                            <Cleave
                                options={
                                    {

                                        numeralThousandsGroupStyle : "thousand",
                                        numeral: true,
                                        numeralIntegerScale: 20,
                                        numeralDecimalScale: 2,
                                        numeralDecimalMark: '.',
                                        delimiter: ' ',
                                        numeralPositiveOnly: true
                                    }
                                }
                                tabIndex="-1"
                                value = {item.def_value}
                                readOnly = {item.is_read_only === "N" ? false : true}
                                onChange={this.handleChangeSelect}
                                name={item.code}
                                style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                                className = "account-transfer-cleave-focus"
                                onFocus = {() => this.fff(item.code)}
                                onBlur = {() => this.ffff(item.code,item.code)}

                            />
                        </div>
                    )
                }
                else if(item.code === "CARD_NUMBER"){

                    return null;

                }else if(item.code === "PAYMENT_PURPOSE"){

                    return (
                        <div className="account-transfer-form" key={item.code}>
                            <p className={`account-transfer-title1 ${item.code}`}>{item.name}</p>
                            <input
                                maxLength={item.param_length}
                                type="text"
                                value = {this.state.params.PAYMENT_PURPOSE.length > 0 ? this.state.params.PAYMENT_PURPOSE : item.def_value}
                                readOnly = {item.is_read_only === "N" ? false : true}
                                tabIndex="-1"
                                onChange={this.handleChangeSelect}
                                name={item.code}
                                style={{border: "none", height: "40px", fontSize: '16px', outline: "none"}}
                                className="account-transfer-cleave-focus"
                                onFocus={() => this.fff(item.code)}
                                onBlur={() => this.ffff(item.code, item.code)}

                            />
                        </div>
                    )

                }else if(item.code === "RECEIVER_NAME"){

                    return (
                        <div className="account-transfer-form" key={item.code}>
                            <p className={`account-transfer-title1 ${item.code}`}>{item.name}</p>
                            <input
                                maxLength={item.param_length}
                                type="text"
                                value = {this.state.params.RECEIVER_NAME.length > 0 ? this.state.params.RECEIVER_NAME : item.def_value}
                                readOnly = {item.is_read_only === "N" ? false : true}
                                tabIndex="-1"
                                onChange={this.handleChangeSelect}
                                name={item.code}
                                style={{border: "none", height: "40px", fontSize: '16px', outline: "none"}}
                                className="account-transfer-cleave-focus"
                                onFocus={() => this.fff(item.code)}
                                onBlur={() => this.ffff(item.code, item.code)}

                            />
                        </div>
                    )

                }else {
                    return (
                        <div className="account-transfer-form" key={item.code}>
                            <p className={`account-transfer-title1 ${item.code}`}>{item.name}</p>
                            <Cleave

                                value = {item.def_value}
                                readOnly = {item.is_read_only === "N" ? false : true}
                                tabIndex="-1"
                                onChange={this.handleChangeSelect}
                                name={item.code}
                                style={{border: "none", height: "40px", fontSize: '16px', outline: "none"}}
                                className="account-transfer-cleave-focus"
                                onFocus={() => this.fff(item.code)}
                                onBlur={() => this.ffff(item.code, item.code)}

                            />
                        </div>
                    )
                }
            }
        }) : null;
        console.log(this.state.params);
        return (
            <div className="account-transfer">
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',

                    }}
                    autoHideDuration = {3000}
                    message={<span id="message-id">{msg}</span>}
                />
                  <div className="account-transfer-container">
                      {innerOpacity ? <SpinnerOpacity/> : null}
                        {inputss}
                      {this.state.isCard  ? <CardsList data={this.state.cards} cardHandler={this.cardHandler}/> : null}
                      <div style={{display :'flex',justifyContent : 'center', marginTop : '20px'}}>
                          <Button
                              type="submit"
                              variant="contained"
                              color="secondary"
                              className={classes.submit}
                              onClick = {this.convert}
                              tabIndex="-1"
                          >
                              {this.state.inputs ? this.state.inputs.level_position === "-1" ? "Перевести" : "Далее" : null}

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


AccountTransfer.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
    return {
        uzCards: state.cardsInfo.uzCards,
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

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AccountTransfer));
