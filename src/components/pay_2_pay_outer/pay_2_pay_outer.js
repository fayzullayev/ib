import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid"
import "./pay_2_pay_outer.css"
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
import Snackbar from "@material-ui/core/Snackbar";
import * as accounting from "accounting";
import Translations from "../../translations/translations"
import * as actionTypes from "../../store/actions/Actions";
import OpacityWaiting from "../spinner-opacity"

const styles = theme => ({
    submit: theme.submit
});


class Pay2PayOuter extends Component {
    api = new Api();

    state = {
        data : [],
        request_1 :  null,
        open: false,
        vertical: 'top',
        horizontal: 'center',
        msg : null,
        card_n : true,
        params : {
            AMOUNT : "",
            CARD_NUMBER : ""
        },
        owner : null,
        amount_including_services : null,
        opacityWaiting : false,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.cards !== this.props.cards){
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
        }
    }

    componentWillMount() {

        if(this.props.cards.length > 0){

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

        }

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

    componentDidMount() {
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
                });
            }
        });
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    amountHandler = () => {
        if(this.state.card_n === true){
            this.setState({
                open: true,
                msg : 'Сначала введите номер карты'
            });
        }

    };
    cardNoHandler = (event) => {
        let cardNo = event.target.value.replace(/[^0-9]/g, '');
        if(cardNo.length < 16){
            this.setState({
                card_n : true
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
                        card_n : false
                    })
                }
            });
            this.setState({
                params : {...this.state.params,CARD_RECEIVER: cardNo}
            })
        }
    };
    cardHandler = (card) => {
        this.setState({ params : {...this.state.params,CARD_NUMBER: card}});
    };

    handleChangeSelect = (event) => {

        if(event.target.name === "AMOUNT"){
            let amount = event.target.value.replace(/[^0-9.]/g, '');

            if(amount.length <= 3) {
                this.setState((state) => {
                    return {
                        amount_including_services: null
                    }
                });
            }

            if(amount >= 500){
                let amount_including_services = +amount + (amount * this.state.owner.percent)/100;

                this.setState({
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
                data.service_details.map(item=>{
                    this.setState({
                        ...this.state,
                        params : {...this.state.params,[item.code] : item.def_value}
                    });
                });
                this.setState({
                    request_1 : data,
                })
            });
        }else{
            this.setState({
                open : true,
                msg : "Минимальная сумма 500 сум",
                opacityWaiting : false
            })
        }
    };

    render () {
        console.log("OUTER ---------------- ", this.state.params);
        console.log("Owner ---------------- ", this.state.owner);
        const cardInput = this.state.request_1 ? this.state.request_1.service_details.map(item=> {
                if (item.is_visible === "Y" && item.param_type === "N") {

                    if (item.code === "CARD_RECEIVER"){
                        return (
                            <div  className="transfer-form" key={item.code}>
                                <p style={{color: '#4a4a4a',fontSize: '12px',margin : 0,marginTop: '30px'}}>Номер карты</p>
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
                                        onChange={this.cardNoHandler}
                                        style  = {{border :"none" ,height: "40px",fontSize: '24px',outline : "none"}}
                                        className = "transfer-cleave"
                                        autoComplete = "off"
                                />
                            </div>
                        )
                    }
                    // if (item.code === "AMOUNT"){
                    //     return (
                    //         <div  className="transfer-form" style={{display : visible}} key={item.code}>
                    //             <p className="transfer-title transfer-value">{item.name}</p>
                    //             <Cleave options={
                    //                 {
                    //                     numeralThousandsGroupStyle : "thousand",
                    //                     numeral: true,
                    //                     numeralIntegerScale: 10,
                    //                     numeralDecimalScale: 2,
                    //                     numeralDecimalMark: '.',
                    //                     delimiter: ' ',
                    //                     numeralPositiveOnly: true
                    //                 }
                    //             }
                    //                     name = {item.code}
                    //                     value = {item.def_value}
                    //                     readOnly = {item.is_read_only === "N" ? false : true}
                    //                     onChange={this.handleChangeSelect}
                    //                     style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                    //                     className = "transfer-cleave"
                    //             />
                    //         </div>
                    //     )
                    // }
                }
            }
        ) : null;

        const amountInput = this.state.request_1 ? this.state.request_1.service_details.map(item=> {
                if (item.is_visible === "Y" && item.param_type === "N") {
                    if (item.code === "AMOUNT"){
                        return (
                            <div  className="transfer-form" key={item.code} onClick ={this.amountHandler}>
                                <p style={{color: '#4a4a4a',fontSize: '12px',margin : 0}}>Сумма платежа</p>
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
                                        disabled = {this.state.card_n}
                                        value = {item.def_value}
                                        readOnly = {item.is_read_only === "N" ? false : true}
                                        onChange={this.handleChangeSelect}
                                        className = "transfer-cleave"
                                        style  = {{fontWeight : 100,width : '100%',marginTop : '14px' ,border :"none" ,height: "80px",fontSize: '50px',outline : "none",color : "#787993"}}
                                />
                            </div>
                        )
                    }
                }
            }
        ) : null;

        const { classes } = this.props;
        const {vertical,horizontal,msg,open} = this.state
        return (
            this.props.cards.length > 0 ? <div className='potransfer'>
                {this.state.opacityWaiting ? <OpacityWaiting/> : null}
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',

                    }}
                    autoHideDuration = {4000}
                    message={<span id="message-id">{msg}</span>}
                />
                <div>
                    <p className="otransfer-title">Переводы с карты на карту</p>
                </div>
                <div className="otransfer">
                    <Grid container spacing={16}>
                        <Grid className="otransfer-grid2" item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <p style={{color: '#4a4a4a',fontSize: '12px',margin : 0}}>Выбрат карту</p>
                            {this.state.data.length > 0  ? <CardsList data={this.state.data} cardHandler = {this.cardHandler}/> : null}
                            {cardInput}
                            <p style={{color: '#4a4a4a',fontSize: '14px',margin : 0,marginTop: '10px'}}>{this.state.owner  ? `Владелец: ${this.state.owner.fio}` : null }</p>
                        </Grid>
                        <Grid className="otransfer-grid3" item xl={6} lg={6} md={6} sm={12} xs={12}>
                            {amountInput}
                            <p style={{color: '#4a4a4a', fontWeight : 500,  fontSize: '14px',margin : 0,marginTop: '20px'}}>{this.state.owner  ? `Комиссия банка: ${this.state.owner.percent} %` : null }</p>
                            <div className="transfer-button" style={{display : "block"}}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                    onClick = {this.convert}
                                    disabled={this.state.card_n}
                                >
                                    {Translations.CardToCard.transferss[this.props.language]}

                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div> : null
        );
    }
}


Pay2PayOuter.propTypes = {
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

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Pay2PayOuter));