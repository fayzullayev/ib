import React, {Component} from "react";
import './loan-main.css';
import Api from "../../services/api";
import Waiting from "../waiting"
import Cleave from "cleave.js/react"
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import SpinnerOpacity from "../spinner-opacity";
import CardsList from "../cards-list";
import Succes from "../success"
import Translations from "../../translations/translations"
import {connect} from "react-redux";
import Warning from "../warning"
import {Link} from "react-router-dom";
import * as actionTypes from "../../store/actions/Actions";


const styles = theme => ({
    submit: theme.submit
});

class LoanMain extends Component{
    api = new Api();

    state = {
      waiting : true,
      isSuccess : false,
      response : null,
      inputs : null,
      request : null,
      params : {
          LOANS_ID :'',
          EARLY_CLOSURE : 'N',
      },
      loan : null,
      open: false,
      msg : null,
      vertical: 'top',
      horizontal: 'center',
      opacity_waiting : false,
      data: null,
      warning : false,
      text : null
    };


    componentDidMount() {

        // const requestForCards = {
        //     request: "Cards",
        //     message_type: 1
        // };
        //
        // this.api.SetAjax(requestForCards).then(data => {
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

        const request_to_loan = {
            "request": "LOAN",
            "is_web": "Y",
            "message_type": 8,
            "payment_detail_code": "LOAN",
            "curr_level_position": "0",
            "contract_id": "-2",
            "params": {
                "value": "name"
            },
        };


        this.api.SetAjax(request_to_loan).then(data => {

            if(data.result === "0" && data.level_position === "1"){
                this.setState({
                    response : data,
                    waiting : false
                })
            }

            let inputs = data.service_details.map(item => {
                this.setState({
                   params : {...this.state.params,[item.code] : item.def_value}
                });
                if(item.is_visible === "Y"){
                    if (item.code === "LOANS_ID"){
                        return (
                            <div  className="transfer-form" style={{display : 'visible'}} key={item.code}>
                                <p className="transfer-title transfer-value">{item.name}</p>
                                <Cleave options={
                                    {
                                        numeral: true,
                                        numericOnly : true,
                                        numeralIntegerScale: 20,
                                        delimiter: '',
                                        numeralPositiveOnly: true
                                    }
                                }
                                        tabIndex="-1"
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
            });

            let btn_text = data.level_position === "-1" ? Translations.Loan.transferss[this.props.language] : Translations.Loan.nextss[this.props.language];

            const {classes} = this.props;

            let loan =  (
                <div>

                    {inputs}

                    <div style={{display :'flex',justifyContent : 'center', marginTop : '20px'}}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick = {this.convert}
                            tabIndex="-1"
                        >
                            {btn_text}

                        </Button>
                    </div>
                </div>
            );

            this.setState({
                inputs,
                loan
            })

        });

    }

    handleChangeSelect = (event) => {
        if(event.target.name === "LOANS_ID"){

            this.setState({ params:{
                    ...this.state.params,
                    [event.target.name]: event.target.value.replace(/[^0-9]/g, '')
                }
            });
        }
        if(event.target.name === "AMOUNT"){

            this.setState({ params:{
                    ...this.state.params,
                    [event.target.name]: event.target.value.replace(/[^0-9]/g, '')
                }
            });
        }

        // if(event.target.name === "AMOUNT"){
        //     let amount = event.target.value.replace(/[^0-9.]/g, '');
        //
        //     if(amount.length <= 3) {
        //         this.setState((state) => {
        //             return {
        //                 amount_including_services: 0
        //             }
        //         });
        //     }
        //
        //     if(amount.length > 3){
        //         let amount_including_services = +amount + (amount * this.state.owner.percent)/100;
        //
        //         this.setState({
        //             amount,
        //             amount_including_services
        //         })
        //     }
        //
        //     this.setState({ params:{
        //             ...this.state.params,
        //             [event.target.name]: event.target.value.replace(/[^0-9]/g, '')
        //         }
        //     });
        // }


    };

    convert = () => {
        let jsons;
        if(this.state.response.level_position === "1" ){
            if(this.state.params.LOANS_ID.length > 4){

                this.setState({
                    opacity_waiting : true
                });

                jsons ={
                    "request": "LOAN",
                    "is_web": "Y",
                    "message_type": 8,
                    "payment_detail_code": "LOAN",
                    "curr_level_position": "1",
                    "contract_id": "-2",
                    "params": {...this.state.params},
                };


                this.api.SetAjax(jsons).then(data => {
                    if(data.result === '1'){
                        this.setState({
                            open : true,
                            msg : data.msg,
                            opacity_waiting : false
                        });
                    }else{

                        if(data.result === "0" && data.level_position === "2"){

                            this.setState({
                                response : data,
                            });
                            const idx = this.props.cards.findIndex((item) => item.is_default === "Y");
                            if(idx >= 0 ){
                                const currentCard = this.props.cards[idx].card_number;
                                this.setState({ params : {...this.state.params,CARD_NUMBER: currentCard}});
                            }else{
                                const currentCard = this.props.cards[0].card_number;
                                this.setState({ params : {...this.state.params,CARD_NUMBER: currentCard}});
                            }

                            this.setState({
                                data : this.props.cards,
                            });
                            let inputs = data.service_details.map(item => {
                                this.setState({
                                    params : {...this.state.params,[item.code] : item.def_value}
                                });
                                if(item.is_visible === "Y"){
                                    if (item.code === "LOANS_ID"){
                                        return (
                                            <div  className="transfer-form" style={{display : 'visible'}} key={item.code}>
                                                <p className="transfer-title transfer-value">{item.name}</p>
                                                <Cleave options={
                                                    {
                                                        numeral: true,
                                                        numericOnly : true,
                                                        numeralIntegerScale: 20,
                                                        delimiter: '',
                                                        numeralPositiveOnly: true
                                                    }
                                                }
                                                        tabIndex="-1"
                                                        name = {item.code}
                                                        value = {item.def_value}
                                                        readOnly = {item.is_read_only === "N" ? false : true}
                                                        onChange={this.handleChangeSelect}
                                                        style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                                                        className = "transfer-cleave"
                                                />
                                            </div>
                                        )
                                    }else if (item.code === "AMOUNT"){
                                        return(
                                            <div  className="transfer-form" style={{display : 'visible'}} key={item.code}>
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
                                                        tabIndex="-1"
                                                        name = {item.code}
                                                        value = {item.def_value}
                                                        readOnly = {item.is_read_only === "N" ? false : true}
                                                        onChange={this.handleChangeSelect}
                                                        style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                                                        className = "transfer-cleave"
                                                />
                                            </div>
                                        )
                                    }else if(item.code === "BALANCE"){
                                        return(
                                            <div  className="transfer-form" style={{display : 'visible'}} key={item.code}>
                                                <p className="transfer-title transfer-value">{item.name}</p>
                                                <Cleave options={
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
                                    else if(item.code === "FIO"){
                                        return(
                                            <div  className="transfer-form" style={{display : 'visible'}} key={item.code}>
                                                <p className="transfer-title transfer-value">{item.name}</p>
                                                <input
                                                        tabIndex="-1"
                                                        name = {item.code}
                                                        value = {item.def_value}
                                                        readOnly = {item.is_read_only === "N" ? false : true}
                                                        onChange={this.handleChangeSelect}
                                                        style  = {{border :"none" ,width : '100%', height: "40px",fontSize: '16px',outline : "none"}}
                                                        className = "transfer-cleave"

                                                />
                                            </div>
                                        )

                                    }else if (item.code === "EARLY_CLOSURE"){

                                       return item.values.map(a => {
                                            if(a.code === "Y"){
                                                return(

                                                    <div className='EARLY_CLOSURE'>
                                                        <div className='EARLY_CLOSURE_title'>
                                                            {Translations.Loan.earlyRepayment[this.props.language]}
                                                        </div>
                                                        <div className='loan-switch'>
                                                            <label className="switch">
                                                                <input
                                                                    type="checkbox"
                                                                    onChange={this.toggle}/>
                                                                <span className="slider"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                    }else {
                                        return (
                                            <div  className="transfer-form" style={{display : 'visible'}} key={item.code}>
                                                <p className="transfer-title transfer-value">{item.name}</p>
                                                <Cleave options={
                                                    {
                                                        numeral: true,
                                                        numericOnly : true,
                                                        numeralIntegerScale: 20,
                                                        delimiter: '',
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

                            });

                            let btn_text = data.level_position === "-1" ? Translations.Loan.transferss[this.props.language] : Translations.Loan.nextss[this.props.language];
                            const {classes} = this.props;
                            let loan =  (
                                <div key={35135135}>
                                    {inputs}
                                    <CardsList data={this.state.data} cardHandler={this.cardHandler}/>
                                    <div style={{display :'flex',justifyContent : 'center', marginTop : '20px'}}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            className={classes.submit}
                                            onClick = {this.convert}
                                        >
                                            {btn_text}

                                        </Button>
                                        <div>{this.state.json}</div>
                                    </div>
                                </div>
                            );

                            this.setState({
                                inputs,
                                loan,
                                opacity_waiting: false
                            })
                        }
                    }
                });
            }else{
                this.setState({
                    open : true,
                    msg : Translations.Loan.typeCreditId[this.props.language]
                });
            }
        }

        if(this.state.response.level_position === "2" ){
            if(this.state.params.AMOUNT.length >= 4){

                this.setState({
                    opacity_waiting : true
                });

                jsons ={
                    "request": "LOAN",
                    "is_web": "Y",
                    "message_type": 8,
                    "payment_detail_code": "LOAN",
                    "curr_level_position": "2",
                    "contract_id": "-2",
                    "params": {...this.state.params},
                };


                this.api.SetAjax(jsons).then(data => {
                      if(data.result === '1'){
                        this.setState({
                            open : true,
                            msg : data.msg,
                            opacity_waiting : false
                        });
                    }
                    else{
                        if(data.result === "0" && data.level_position === "-1"){
                            this.setState({
                                response : data,
                            });

                            let inputs = data.service_details.map(item => {

                                if(item.is_visible === "Y"){
                                    if (item.code === "LOANS_ID"){
                                        return (
                                            <div  className="transfer-form" style={{display : 'visible'}} key={item.code}>
                                                <p className="transfer-title transfer-value">{item.name}</p>
                                                <Cleave options={
                                                    {
                                                        numeral: true,
                                                        numericOnly : true,
                                                        numeralIntegerScale: 20,
                                                        delimiter: '',
                                                        numeralPositiveOnly: true
                                                    }
                                                }
                                                        tabIndex="-1"
                                                        name = {item.code}
                                                        value = {item.def_value}
                                                        readOnly = {item.is_read_only === "N" ? false : true}
                                                        onChange={this.handleChangeSelect}
                                                        style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                                                        className = "transfer-cleave"
                                                />
                                            </div>
                                        )
                                    }else if (item.code === "AMOUNT"){
                                        return(
                                            <div  className="transfer-form" style={{display : 'visible'}} key={item.code}>
                                                <p className="transfer-title transfer-value">{item.name}</p>
                                                <Cleave options={
                                                    {
                                                        numeralThousandsGroupStyle : "thousand",
                                                        numeral: true,
                                                        numeralIntegerScale: 10,
                                                        numeralDecimalScale: 2,
                                                        numeralDecimalMark: '.',
                                                        delimiter : ' ',
                                                        numeralPositiveOnly: true
                                                    }
                                                }
                                                        tabIndex="-1"
                                                        name = {item.code}
                                                        placeholder = 'Сумма на оплату'
                                                        value = {item.def_value}
                                                        readOnly = {item.is_read_only === "N" ? false : true}
                                                        onChange={this.handleChangeSelect}
                                                        style  = {{border :"none" ,height: "40px",fontSize: '16px',outline : "none"}}
                                                        className = "transfer-cleave"
                                                />
                                            </div>
                                        )
                                    }else if(item.code === "BALANCE"){
                                        return(
                                            <div  className="transfer-form" style={{display : 'visible'}} key={item.code}>
                                                <p className="transfer-title transfer-value">{item.name}</p>
                                                <Cleave options={
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
                                    else if(item.code === "FIO"){
                                        return(
                                            <div  className="transfer-form" style={{display : 'visible'}} key={item.code}>
                                                <p className="transfer-title transfer-value">{item.name}</p>
                                                <input
                                                    tabIndex="-1"
                                                    name = {item.code}
                                                    value = {item.def_value}
                                                    readOnly = {item.is_read_only === "N" ? false : true}
                                                    onChange={this.handleChangeSelect}
                                                    style  = {{border :"none" ,width : '100%', height: "40px",fontSize: '16px',outline : "none"}}
                                                    className = "transfer-cleave"

                                                />
                                            </div>
                                        )

                                    }else if (item.code === "EARLY_CLOSURE"){

                                        return item.values.map(a => {
                                            if(a.code === "Y"){
                                                return(

                                                    <div className='EARLY_CLOSURE'>
                                                        <div className='EARLY_CLOSURE_title'>
                                                            Досрочное
                                                        </div>
                                                        <div className='loan-switch'>
                                                            <label className="switch">
                                                                <input
                                                                    type="checkbox"
                                                                    onChange={this.toggle}/>
                                                                <span className="slider"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                    }else {
                                        return (
                                            <div  className="transfer-form" style={{display : 'visible'}} key={item.code}>
                                                <p className="transfer-title transfer-value">{item.name}</p>
                                                <Cleave options={
                                                    {
                                                        numeral: true,
                                                        numericOnly : true,
                                                        numeralIntegerScale: 20,
                                                        delimiter: '',
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

                            });

                            let btn_text = data.level_position === "-1" ? Translations.Loan.transferss[this.props.language] : Translations.Loan.nextss[this.props.language];
                            const {classes} = this.props;
                            let loan =  (
                                <div>

                                    {inputs}
                                    <div style={{display :'flex',justifyContent : 'center', marginTop : '20px'}}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            className={classes.submit}
                                            onClick = {this.convert}
                                        >
                                            {btn_text}

                                        </Button>
                                        <div>{this.state.json}</div>
                                    </div>
                                </div>
                            );

                            this.setState({
                                inputs,
                                loan,
                                opacity_waiting: false
                            })
                        }
                    }
                });
            }else{
                this.setState({
                    open : true,
                    msg : Translations.Loan.enterAmount[this.props.language]
                });
            }
        }

        if(this.state.response.level_position === "-1"){

            this.setState({
                opacity_waiting :true
            });


                jsons ={
                    "request": "LOAN",
                    "is_web": "Y",
                    "message_type": 9,
                    "payment_detail_code": "LOAN",
                    "curr_level_position": "-1",
                    "contract_id": -2,
                    "params": {...this.state.params},
                };

                this.api.SetAjax(jsons).then(data=> {
                    if(data.result === "1"){
                        this.setState({
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
                            isSuccess : true,
                        });
                    }
                })

        }
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    toggle = () => {

        this.setState(state =>{
            let EARLY_CLOSURE = null;

            if(state.params.EARLY_CLOSURE === 'N'){
                EARLY_CLOSURE = 'Y'
            }else{
                EARLY_CLOSURE = 'N'
            }

            return(
                {
                    params: {
                        ...state.params,
                        EARLY_CLOSURE : EARLY_CLOSURE
                    }
                }
            );
        })
    };

    cardHandler = (card) => {
        this.setState({ params : {...this.state.params,CARD_NUMBER: card}});
    };


    render(){


        if(this.state.isSuccess){
            return <Succes url='/main'/>
        }

        if(this.state.waiting){
            return <Waiting/>
        }

        if(this.state.warning){
            return <Warning url="/main" text={this.state.text}/>
        }

        const {vertical,horizontal,loan,msg,open} = this.state;
        return(
            <div className='loanc'>
                <div className="conversion-title" style={{textAlign : "right",padding  : '12px'}}>
                    <Link to='/main/conversion/history'>{Translations.Conversion.conversionHistory[this.props.language]}</Link>
                </div>
                <div className='loan'>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',

                        }}
                        autoHideDuration = {10000}
                        message={<span id="message-id">{msg}</span>}
                    />
                    <div className='loan-container'>
                        {this.state.opacity_waiting ? <SpinnerOpacity/> : null}
                    {loan}
                    </div>
                </div>
            </div>
        )
    }
}


LoanMain.propTypes = {
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


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(LoanMain));