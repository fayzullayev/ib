import React, { Component } from 'react';
import "./conversion-main.css";
import en from "./assets/eng.png";
import uz from"./assets/uz.png";
import arrow from "./assets/arrow.png";
import {Button} from "@material-ui/core";
import withStyles from '@material-ui/core/styles/withStyles';
import {PropTypes} from "prop-types";
import {withRouter,Link} from "react-router-dom"
import {connect} from "react-redux"
import Cards from "../cards-list"
import Cleave from "cleave.js/react"
import Api from "../../services/api"
import Waiting from "../waiting"
import Warning from "../warning"
import Success from "../success"
import * as accounting from "accounting";
import Translations from "../../translations/translations";
import * as actionTypes from "../../store/actions/Actions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import SpinnerOpacity from "../spinner-opacity";
import withMobileDialog from "@material-ui/core/es/withMobileDialog";

const styles = theme => ({
    submit: theme.submit
});

class ConversionMain extends Component {
    api = new Api();
    lan = Translations.Conversion;

    state = {
        type : true, //uzdan  usdga o`tqizadi
        isUZS : true, //switch uz text
        isUSD : false, //switch usd text
        uzCards: null,
        usdCards : null,
        fio : null,
        uzToUsd : null,
        usdToUz : null,
        from_card : null,
        to_card : null,
        currency_code: null,
        amount : "",
        amount2 : '',
        hasCurrency : false,
        convertedAmount : null,
        currencyName : false,
        currentCurrency : null,
        toggle : true,
        waiting : true,
        success : false,
        c_switch : false,
        warning : false,
        text : null,
        open : false,
        agree : false,
        spinner_opacity : false
    };

    changeType = () => {

        // if(this.state.type){
        //
        //
        // }
        //
        // if(!this.state.c_switch){
        //     document.getElementById("checkss").checked = false;
        //     this.setState((state)=>{
        //         return{
        //             isUZS : true, //switch uz text
        //             isUSD : false, //switch usd text
        //             c_switch : true,
        //         }
        //     });
        // }else{
        //     document.getElementById("checkss").checked = true;
        //     this.setState((state)=>{
        //         return{
        //             isUZS : false, //switch uz text
        //             isUSD : true, //switch usd text
        //             c_switch : false,
        //         }
        //     });
        // }

        this.setState({
            amount : "",
            amount2 : ""
        });

        this.setState({type : !this.state.type} /*, currencyName : !this.state.currencyName,toggle : this.state.toggle}*/);


        if(this.state.type){

            const idx = this.state.usdCards.findIndex((item) => item.is_default === "Y");
            if(idx >= 0 ){
                const currentCard = this.state.usdCards[idx].card_number;
                this.setState({ from_card: currentCard});
            }else{
                const currentCard = this.state.usdCards[0].card_number;
                this.setState({ from_card: currentCard});
            }

            const idx2 = this.state.uzCards.findIndex((item) => item.is_default === "Y");
            if(idx2 >= 0 ){
                const currentCard = this.state.uzCards[idx2].card_number;
                this.setState({ to_card: currentCard});
            }else{
                const currentCard = this.state.uzCards[0].card_number;
                this.setState({ to_card: currentCard});
            }
            this.setState({
                currentCurrency : this.state.uzToUsd.rate
            })
        }else{

            const idx = this.state.uzCards.findIndex((item) => item.is_default === "Y");
            if(idx >= 0 ){
                const currentCard = this.state.uzCards[idx].card_number;
                this.setState({ from_card: currentCard});
            }else{
                const currentCard = this.state.uzCards[0].card_number;
                this.setState({ from_card: currentCard});
            }

            const idx2 = this.state.usdCards.findIndex((item) => item.is_default === "Y");
            if(idx2 >= 0 ){
                const currentCard = this.state.usdCards[idx2].card_number;
                this.setState({ to_card: currentCard});
            }else{
                const currentCard = this.state.usdCards[0].card_number;
                this.setState({ to_card: currentCard});
            }
            this.setState({
                currentCurrency : this.state.usdToUz.rate
            })
        }

    };

    cardRequest(){

        if(this.props.uzCards.length === 0 || this.props.valCards.length === 0){
            this.setState({
                warning : true,
                text : this.lan.haveNotCard[this.props.language]
            })
        }else{
            const idx = this.props.uzCards.findIndex((item) => item.is_default === "Y");
            if(idx >= 0 ){
                const currentCard = this.props.uzCards[idx].card_number;
                this.setState({ from_card: currentCard});
            }else{
                const currentCard = this.props.uzCards[0].card_number;
                this.setState({ from_card: currentCard});
            }

            const idx2 = this.props.valCards.findIndex((item) => item.is_default === "Y");
            if(idx2 >= 0 ){
                const currentCard = this.props.valCards[idx2].card_number;
                this.setState({ to_card: currentCard});
            }else{
                const currentCard = this.props.valCards[0].card_number;
                this.setState({ to_card: currentCard});
            }

            this.setState(({uzCards,usdCards})=>{
                return {
                    uzCards : this.props.uzCards,
                    usdCards : this.props.valCards,
                }
            });
        }
    }

    conversionRequest(){
        let requestForConversion = {
            request: "request_for_conversion",
            message_type: 41
        };
        this.api.SetAjax(requestForConversion).then(data=>{
            if(data.result === "0"){
                this.setState(({uzToUsd,usdToUz})=>{
                    return{
                        uzToUsd : data.currency_rates[0],
                        usdToUz : data.currency_rates[1],
                        currentCurrency : data.currency_rates[1].rate,
                        waiting: false
                    }
                });
            }
        });
    }

    componentWillMount() {
        this.cardRequest();
    }

    componentDidMount() {
        this.conversionRequest();
        this.cardRequest();
    }

    currencyToggle = () =>{
        this.setState((state)=>{
                return{
                    currencyName : !state.currencyName,
                    isUZS : !state.isUZS,
                    isUSD : !state.isUSD,
                    c_switch : !state.c_switch,
                    amount : state.amount2,
                    amount2 : state.amount
                }
            }
        );
    };

    convert = () => {
        this.handleClickOpen();

       //  const currency_code = this.state.type ? "000" : "840";
       //
       //  let convertRequest = '';
       //
       // if(this.state.type === true){
       //     if(this.state.c_switch === false){
       //         convertRequest = {
       //             request : "exec_currency_rates",
       //             message_type : 43,
       //             from_card : this.state.from_card,
       //             to_card : this.state.to_card,
       //             currency_code : '000',
       //             amount : this.state.amount2
       //         };
       //     }
       //     else{
       //         convertRequest = {
       //             request : "exec_currency_rates",
       //             message_type : 43,
       //             from_card : this.state.from_card,
       //             to_card : this.state.to_card,
       //             currency_code : '000',
       //             amount : this.state.amount
       //         };
       //     }
       // }else{
       //     if(this.state.c_switch === false){
       //        convertRequest = {
       //             request : "exec_currency_rates",
       //             message_type : 43,
       //             from_card : this.state.from_card,
       //             to_card : this.state.to_card,
       //             currency_code : '840',
       //             amount : this.state.amount
       //         };
       //     }
       //     else{
       //       convertRequest = {
       //             request : "exec_currency_rates",
       //             message_type : 43,
       //             from_card : this.state.from_card,
       //             to_card : this.state.to_card,
       //             currency_code : '840',
       //             amount : this.state.amount2
       //         };
       //
       //     }
       // }
       //
       // this.api.SetAjax(convertRequest).then(data => {
       //     if(data.result === "1"){
       //         this.setState({
       //             warning : true,
       //             text : data.msg
       //         })
       //     }else if(data.result === "0"){
       //
       //         let currCardsInfo=this.props.cardInfo.allCards;
       //         if(currCardsInfo && currCardsInfo.card_list.length)
       //             for( var i = 0; i < currCardsInfo.card_list.length; i++){
       //                 if ( currCardsInfo.card_list[i].card_number === convertRequest.from_card) {
       //                     currCardsInfo.card_list[i].balance=currCardsInfo.card_list[i].balance-convertRequest.amount;
       //                 }
       //             }
       //
       //         this.props.addCardInfo({
       //             allCards: currCardsInfo,
       //         });
       //
       //         this.setState({
       //             waiting: false,
       //             warning : false,
       //             success : true,
       //         });
       //     }
       // });


    };

    cardHandler = (cardNumber) =>{
        if(this.state.type){
            if(cardNumber.slice(0,4)=== "8600"){
                this.setState({
                    from_card : cardNumber
                })
            }else{
                this.setState({
                    to_card : cardNumber
                })
            }
        }else{
            if(cardNumber.slice(0,4)=== "8600"){
                this.setState({
                    to_card : cardNumber
                })
            }else{
                this.setState({
                    from_card : cardNumber
                })
            }
        }
    };

    amountHandler = (event) => {

        const value = event.target.value.replace(/[^0-9.]/g, '');
            if(this.state.c_switch === false){
                this.setState({
                    amount : value,
                    amount2 : (value * this.state.currentCurrency).toFixed(3)
                })
            }
            else{
                this.setState({
                    amount : value,
                    amount2 : (value / this.state.currentCurrency).toFixed(3)
                })
            }
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    agree = () => {
        this.handleClose();
        this.setState({
            spinner_opacity : true,
        });
         const currency_code = this.state.type ? "000" : "840";

         let convertRequest = '';

        if(this.state.type === true){
            if(this.state.c_switch === false){
                convertRequest = {
                    request : "exec_currency_rates",
                    message_type : 43,
                    from_card : this.state.from_card,
                    to_card : this.state.to_card,
                    currency_code : '000',
                    amount : this.state.amount2
                };
            }
            else{
                convertRequest = {
                    request : "exec_currency_rates",
                    message_type : 43,
                    from_card : this.state.from_card,
                    to_card : this.state.to_card,
                    currency_code : '000',
                    amount : this.state.amount
                };
            }
        }else{
            if(this.state.c_switch === false){
               convertRequest = {
                    request : "exec_currency_rates",
                    message_type : 43,
                    from_card : this.state.from_card,
                    to_card : this.state.to_card,
                    currency_code : '840',
                    amount : this.state.amount
                };
            }
            else{
              convertRequest = {
                    request : "exec_currency_rates",
                    message_type : 43,
                    from_card : this.state.from_card,
                    to_card : this.state.to_card,
                    currency_code : '840',
                    amount : this.state.amount2
                };

            }
        }

        this.api.SetAjax(convertRequest).then(data => {
            if(data.result === "1"){
                this.setState({
                    warning : true,
                    text : data.msg,
                    spinner_opacity : false,
                })
            }else if(data.result === "0"){

                let currCardsInfo=this.props.cardInfo.allCards;
                if(currCardsInfo && currCardsInfo.card_list.length)
                    for( var i = 0; i < currCardsInfo.card_list.length; i++){
                        if ( currCardsInfo.card_list[i].card_number === convertRequest.from_card) {
                            currCardsInfo.card_list[i].balance=currCardsInfo.card_list[i].balance-convertRequest.amount;
                        }
                    }

                this.props.addCardInfo({
                    allCards: currCardsInfo,
                });

                this.setState({
                    waiting: false,
                    warning : false,
                    success : true,
                    spinner_opacity : false,
                });
            }
        });
    };

    disagree = () => {
        this.handleClose();
    };

    render () {
        if(this.state.waiting){
            return <Waiting/>
        }
        if(this.state.success){
            return <Success url="/main" />
        }
        if(this.state.warning){
            return <Warning url="/main" text={this.state.text}/>
        }

        const {
            type,
            isUSD,
            isUZS,
            uzCards,
            usdCards,
            fio,
            hasCurrency,
            from_card,
            to_card,
            currentCurrency,
            currencyName,
            amount,
        } = this.state;
        const currentLanguage = this.props.language;

        if(hasCurrency){
            return(
                <h1>Сегодняшний курс валют не введен для для интернет банкинга</h1>
            )
        }

        const conAmount = currencyName ? (amount / currentCurrency).toFixed(2) : (amount * currentCurrency).toFixed(2);
        const currencyN = currencyName ? "USD" : "UZS";

        let uzsTextClass = isUZS ? "uzsTextClass" : null;
        let usdTextClass = isUSD ? "usdTextClass" : null;


        const uzCardSelect = <Cards data = {uzCards}  cardHandler = {this.cardHandler} active = {from_card}/>;
        const usdCardSelect = <Cards data = {usdCards} cardHandler = {this.cardHandler} active = {to_card}/>;

        let  primary_icon;
        let  secondary_icon;
        let  fromCard;
        let  toCard;


        if(type){
            primary_icon = uz;
            secondary_icon = en;
            fromCard = uzCardSelect;
            toCard = usdCardSelect;
        }else {
            primary_icon = en;
            secondary_icon = uz;
            fromCard = usdCardSelect;
            toCard = uzCardSelect;
        }
        const { classes } = this.props;
        const { fullScreen } = this.props;
        const {agree,disagree,conversionHistory,fromCards,toCards,amounts,сurrentСourses,convert,conversionAmount} = this.lan;
        return (
            <div className="conversion-container">
                {this.state.spinner_opacity ? <SpinnerOpacity/> : null}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth = 'xs'
                    fullWidth={true}
                >
                    <DialogContent>
                        <DialogContentText>
                            Вы действительно хотите сконвертировать
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className={`${classes.submit} conversion-buttons`}
                            onClick = {this.agree}
                            style={{margin : "0px 15px"}}
                        >
                            {agree[currentLanguage]}

                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className={`${classes.submit} conversion-buttons`}
                            onClick = {this.disagree}
                            style={{margin : "0px 15px"}}
                        >
                            {disagree[currentLanguage]}

                        </Button>
                    </DialogActions>
                </Dialog>

                <div className="conversion-title" style={{textAlign : "right"}}>
                    <Link to='/main/conversion/history'>{conversionHistory[currentLanguage]}</Link>
                </div>
                <div className = "conversion-content">

                    <div className = "conversion-inner-content">
                        <div className = "conversion-type">
                            <img src={primary_icon}/>

                            <img
                                src={arrow}
                                className="conversion-btns"
                                onClick={this.changeType}/>

                            <img src={secondary_icon}/>
                        </div>

                        <div>
                            <p className="action-title action-title2">{fromCards[currentLanguage]}:</p>
                            {fromCard}
                        </div>

                        <div>
                            <p className="action-title action-title2">{toCards[currentLanguage]}:</p>
                            {toCard}
                        </div>


                        <div className='conversion-input-container'>
                            <p className="action-title currency-value">{amounts[currentLanguage]}</p>
                            <div className='conversion-input-inner-container'>

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
                                        }
                                    }
                                            onChange={this.amountHandler}
                                            value = {this.state.amount}
                                            style  = {{border :"none" ,height: "40px",fontSize: '18px',outline : "none"}}

                                    />
                                    <div className='currency-switch'>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                id='checkss'
                                                onChange={this.currencyToggle}/>
                                            <span className="slider"></span>
                                            <span className={`uz ${uzsTextClass}`}>UZS</span>
                                            <span className={`usd ${usdTextClass}`}>USD</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="values-container">
                            <div className="values-inner-container">
                                <p className='conversion-current-course-title'>Минимальная сумма обмена :</p>
                                <p className='conversion-current-course'> 1 $</p>
                            </div>
                            <div className="values-inner-container">
                                <p className='conversion-current-course-title'>{сurrentСourses[currentLanguage]}:</p>
                                <p className='conversion-current-course'> 1$ = {currentCurrency} UZS</p>
                            </div>
                            <div className="values-inner-container">
                                <p className='conversion-current-course-title'>{conversionAmount[currentLanguage]}:</p>
                                <p className='conversion-current-course'> {accounting.formatMoney(this.state.amount2,"","3"," ",".")} {currencyN}</p>
                            </div>
                        </div>

                        <div className="conversion-button">
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                className={`${classes.submit} conversion-buttons`}
                                onClick = {this.convert}
                            >
                                {convert[currentLanguage]}

                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


const mapStateToProps = state => {
    return {
        uzCards: state.cardsInfo.uzCards,
        valCards: state.cardsInfo.valCards,
        cardInfo: state.cardsInfo,
        language: state.menuItems.language,
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


ConversionMain.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles)(withMobileDialog()(ConversionMain))));