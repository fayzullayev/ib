import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid"
import "./pay_2_pay.css"
import  {connect}from "react-redux"
import Button from "@material-ui/core/Button";
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import CardsList from "../cards-list"
import Api from "../../services/api";
import Cleave from "cleave.js/react"
import Waiting from "../waiting"
import Warning from "../warning"
import Success from "../success"
import OpacityWaiting from "../spinner-opacity"
import Snackbar from "@material-ui/core/Snackbar";
import * as accounting from "accounting";
import Translations from "../../translations/translations"
import * as actionTypes from "../../store/actions/Actions";

const styles = theme => ({
    submit: theme.submit
});

class Pay2Pay extends Component {
    api = new Api();
    state ={
        card_num: null,
        data : {},
        staticJson : {
            "interbank":"Y",
            "limit":"10000000.00",
            "fio":"TOXIROV SHAXBOZ",
            "result":"0",
            "percent":"0.5",
            "CARD_RECEIVER_EXPIRE":"202305",
            "msg":""
        },
        msg : null,
        owner : null,
        haveOwner : false,
        waiting : true,
        open: false,
        vertical: 'top',
        horizontal: 'center',
        amount : null,
        amount_including_services: 0,
        curr_level_position_0 : null,
        params : {AMOUNT : 0},
        current : null,
        opacityWaiting : false,
        warning : false,
        text : null,
        success : false
    };

    cardNoHandler = (event) => {
        let cardNo = event.target.value.replace(/[^0-9]/g, '');
        if(cardNo.length < 16){
            this.setState({
                haveOwner : false
            });
            return
        }
        if(cardNo.length === 16){
            const request = {
                request : "some_thing",
                "message_type":11,
                "action":"CARD_TO_CARD",
                "card_number":cardNo
            };
            this.api.SetAjax(request).then(data => {
                if(data.result === "1"){
                    this.setState({
                        open : true,
                        msg : data.msg
                    })
                } else if(data.result === "0"){
                        this.setState({
                            owner : data,
                            haveOwner : true
                        })
                }
            });
            this.setState({
                card_num : cardNo
            })
        }
    };


    componentWillMount() {

        this.setState({
            data : this.props.cards
        });

        const idx = this.props.cards.findIndex((item) => item.is_default === "Y");
        if(idx >= 0 ){
            const currentCard = this.props.cards[idx].card_number;
            this.setState({ params : {...this.state.params,CARD_NUMBER: currentCard}});
        }else{
            const currentCard = this.props.cards[0].card_number;
            this.setState({ params : {...this.state.params,CARD_NUMBER: currentCard}});
        }

        // const requestForCards = {
        //     request: "Cards",
        //     message_type: 1
        // };


        // this.api.SetAjax(requestForCards).then(data => {
        //     console.log("Cards ------------------ ",data);
        //     if (data.result === "0") {
        //         let uzCard = [];
        //         for (let i = 0; i < data.card_list.length; i++) {
        //             let cards = data.card_list[i];
        //             if (cards.card_type === "SV") {
        //                 cards["active"] = true;
        //                 uzCard.push(cards);
        //             }
        //         }
        //         const idx = uzCard.findIndex((item) => item.is_default === "Y");
        //         if(idx >= 0 ){
        //             const currentCard = uzCard[idx].card_number;
        //             this.setState({ params : {...this.state.params,CARD_NUMBER: currentCard}});
        //         }else{
        //             const currentCard = uzCard[0].card_number;
        //             this.setState({ params : {...this.state.params,CARD_NUMBER: currentCard}});
        //         }
        //
        //         this.setState({
        //             data : uzCard,
        //             waiting: false
        //         })
        //     }
        // });

        // const data = SetAjax(requestCardToCard);
        // console.log("kelgan data ------------ ",data);
        // if(data.result === "0" && data.level_position === "1"){
        //     data.service_details.map(item=>{
        //         console.log(item.code,item.def_value);
        //         this.setState({
        //             ...this.state,
        //             params : {...this.state.params,[item.code] : item.def_value}
        //         });
        //     });
        //     this.setState({
        //         request_1 : data,
        //         waiting : false
        //     });
        // }

        const requestCardToCard = {
            "request": "CARD_TO_CARD",
            "is_web": "Y",
            "message_type": 8,
            "payment_detail_code": "CARD_TO_CARD",
            "PAY_FORM_PATTERN_CODE": "CARD_TO_CARD",
            "curr_level_position": "0",
            "params": {
                "value": "name"
            },
            "contract_id": "-1"
        };

       this.api.SetAjax(requestCardToCard).then(data=>{
           if(data.result === "0" && data.level_position === "1"){
               data.service_details.map(item=>{
                   this.setState({
                       ...this.state,
                       params : {...this.state.params,[item.code] : item.def_value}
                   });
               });
               this.setState({
                   request_1 : data,
                   waiting : false
               });
           }
       });

    }

    handleClose = () => {
        this.setState({ open: false });
    };

    amountHandler = (event) =>{
        let amount = event.target.value.replace(/[^0-9.]/g, '');
        this.setState({
            amount,
        });

        if(amount.length <= 3) {
            this.setState((state) => {
                return {
                    amount_including_services: 0
                }
            });
        }

        if(amount.length > 3){
            let amount_including_services = +amount + (amount * this.state.owner.percent)/100;

            this.setState({
                amount,
                amount_including_services
            })
        }
    };

    handleChangeSelect = (event) => {

        if(event.target.name === "CARD_RECEIVER"){

            let cardNo = event.target.value.replace(/[^0-9]/g, '');

            if(cardNo.length < 16){
                this.setState({
                    haveOwner : false,
                });
            }
            if(cardNo.length === 16){

                this.setState({
                    opacityWaiting :true
                });

                const request = {
                    request : "some_thing",
                    "message_type":11,
                    "action":"CARD_TO_CARD",
                    "card_number":cardNo
                };
                this.api.SetAjax(request).then(data => {
                    if(data.result === "1"){
                        this.setState({
                            open : true,
                            msg : data.msg,
                            opacityWaiting : false
                        })
                    } else if(data.result === "0"){
                        this.setState({
                            owner : data,
                            haveOwner : true,
                            opacityWaiting : false
                        })
                    }
                });
            }
            this.setState({ params:{
                    ...this.state.params,
                    [event.target.name]: event.target.value.replace(/[^0-9]/g, '')
                }
            });

        }

        if(event.target.name === "AMOUNT"){
            let amount = event.target.value.replace(/[^0-9.]/g, '');

            if(amount.length <= 3) {
                this.setState((state) => {
                    return {
                        amount_including_services: 0
                    }
                });
            }

            if(amount >= 500){
                let amount_including_services = +amount + (amount * this.state.owner.percent)/100;

                this.setState({
                    amount,
                    amount_including_services
                })
            }

            this.setState({ params:{
                    ...this.state.params,
                    [event.target.name]: event.target.value.replace(/[^0-9]/g, '')
                }
            });
        }


    };

    convert = () => {
        let jsons;

        if(this.state.request_1.level_position === "1" ){
            if(this.state.params.AMOUNT >= 500){
                this.setState({
                    opacityWaiting : true
                });
                jsons = {
                    "request": "CARD_TO_CARD",
                    "is_web": "Y",
                    "message_type": 8,
                    "contract_id": "-1",
                    "payment_detail_code": "CARD_TO_CARD",
                    "PAY_FORM_PATTERN_CODE": "CARD_TO_CARD",
                    "curr_level_position": "1",
                    "params": {...this.state.params}
                };
                this.api.SetAjax(jsons).then(data => {
                    // this.setState({
                    //     data : this.props.cards
                    // });
                    //
                    // const idx = this.props.cards.findIndex((item) => item.is_default === "Y");
                    // if(idx >= 0 ){
                    //     const currentCard = this.props.cards[idx].card_number;
                    //     this.setState({
                    //         ...this.state,
                    //         params : {...this.state.params,CARD_NUMBER: currentCard}
                    //     });
                    // }else{
                    //     const currentCard = this.props.cards[0].card_number;
                    //     this.setState({
                    //         ...this.state,
                    //         params : {...this.state.params,CARD_NUMBER: currentCard}
                    //     });
                    // }
                    data.service_details.map(item=>{
                        this.setState({
                            ...this.state,
                            params : {...this.state.params,[item.code] : item.def_value}
                        });
                    });
                    this.setState({
                        request_1 : data,
                        opacityWaiting : false
                    })
                });
            }else{
                this.setState({
                    open : true,
                    msg : "Минимальная сумма 500 сум",
                    opacityWaiting : false
                })
            }
        }

        if(this.state.request_1.level_position === "-1"){
             jsons = {
                "request": "CARD_TO_CARD",
                "message_type": 9,
                "contract_id": "-1",
                "payment_detail_code": "CARD_TO_CARD",
                "PAY_FORM_PATTERN_CODE": "CARD_TO_CARD",
                "curr_level_position": "-1",
                "params": {...this.state.params}
            };
             this.setState({
                 waiting : true
             });
            this.api.SetAjax(jsons).then(data=>{
                if(data.result === '1'){
                    this.setState({
                        waiting : false,
                        warning : true,
                        text : data.msg
                    });
                }else if(data.result === "0"){

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
                        waiting : false,
                        warning : false,
                        success : true,
                    });
                }
            })
        }


    };

    cardHandler = (card) => {
        this.setState({ params : {...this.state.params,CARD_NUMBER: card}});
    };


    render () {
        const {owner,chooseCurrency,transferss,nextss,serviceCost,totalWithServicefee} = Translations.CardToCard;
        const lang = this.props.language;
        if(this.state.success){
            return <Success url="/main"/>
        }
        if(this.state.waiting){
            return <Waiting/>
        }
        if(this.state.warning){
            return <Warning url ="/main" text = {this.state.text}/>
        }

        console.log("params----------------",this.state.params);
        console.log("cards----------------",this.props.cards);

        const { vertical, horizontal, open,msg,haveOwner,waiting,amount,amount_including_services } = this.state;
        const {classes} = this.props;
        const visible = haveOwner ? "block" : 'none';

        const inputs = this.state.request_1.service_details.map(item=> {
                if (item.is_visible === "Y" && item.param_type === "N") {

                    if (item.code === "CARD_RECEIVER"){
                        return (
                            <div  className="transfer-form" key={item.code}>
                                <p className="transfer-title transfer-value">{item.name}</p>
                                <Cleave options={
                                        {
                                            creditCard: true,
                                            delimiter: ' '
                                        }
                                    }
                                        placeholder = {item.hint}
                                        name = {item.code}
                                        value = {item.def_value}
                                        readOnly = {item.is_read_only === "N" ? false : true}
                                        onChange={this.handleChangeSelect}
                                        style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                                        className = "transfer-cleave"
                                        autoComplete = "off"
                                />
                            </div>
                        )
                    }
                    if (item.code === "AMOUNT"){
                        return (
                            <div  className="transfer-form" style={{display : visible}} key={item.code}>
                                <p className="transfer-title transfer-value">{item.name}</p>
                                <Cleave options={
                                            {
                                                numeralThousandsGroupStyle : "thousand",
                                                numeral: true,
                                                numeralIntegerScale: 10,
                                                numeralDecimalScale: 2,
                                                numeralDecimalMark: '.',
                                                delimiter: ' ',
                                                numeralPositiveOnly: true
                                            }
                                        }
                                        name = {item.code}
                                        value = {item.def_value}
                                        readOnly = {item.is_read_only === "N" ? false : true}
                                        onChange={this.handleChangeSelect}
                                        style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                                        className = "transfer-cleave"
                                />
                            </div>
                        )
                    }
                }
            }
        );


        let cards;
        let ownerName = haveOwner ? <span className='owner-name2'>{owner[lang]} : <span className='owner-name'>{ this.state.owner.fio  }</span></span>  : null;
       // let btn_text = this.state.request_1.level_position === "-1" ? Translations.CardToCard.transfers[lang]  :  Translations.CardToCard.next[lang];
        let crd = this.state.request_1.level_position === "-1" ?<div> <p className='transfer-conversion-current-course-title2'>{chooseCurrency[lang]}</p>
            <CardsList data={this.state.data} cardHandler = {this.cardHandler}/></div> : null;
        if(haveOwner){
            cards = (<div>
                        <div className="transfer-values-container">
                            <div className="transfer-values-inner-container">
                                <p className='transfer-conversion-current-course-title'>{serviceCost[lang]}:</p>
                                <p className='transfer-conversion-current-course'> {this.state.owner.percent}%</p>
                            </div>
                            <div className="transfer-values-inner-container">
                                <p className='transfer-conversion-current-course-title'> {totalWithServicefee[lang]}:</p>
                                <p className='transfer-conversion-current-course'> {accounting.formatMoney(amount_including_services,"","2"," ",".")}</p>
                            </div>
                        </div>
                        {crd}
                        <div className="transfer-button">
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                onClick = {this.convert}
                            >
                                {this.state.request_1.level_position === "-1" ? Translations.CardToCard.transferss[lang]  :  Translations.CardToCard.nextss[lang]}

                            </Button>
                        </div>
                    </div>);
        }

        return (
          <Grid container className="transfer" justify="center">
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',

                    }}
                    autoHideDuration = {4000}
                    message={<span id="message-id">{this.state.msg}</span>}
                />
                <div className='transfer-content'>
                    {this.state.opacityWaiting ? <OpacityWaiting/> : null}
                    <div className="transfer-title-back">
                        Вы можете перевести Ваши денежные средства с карты на карту UZCARD или VISA нашего банка
                    </div>
                    {inputs}
                    <p className="transfer-owner-name">
                        {ownerName}
                    </p>
                    <div className='transfer-action'>
                        {cards}
                    </div>
                </div>
          </Grid>
        );
    }
}


Pay2Pay.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        cards: state.cardsInfo.uzCards,
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

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Pay2Pay));