import React, { Component } from 'react';
import UZS from "./assets2/uz.png";
import USD from "./assets2/united-states-of-america.png";
import EUR from "./assets2/european-union.png";
import RUB from "./assets2/russia_copy.png";
import GBP from "./assets2/united-kingdom.png";
import CHF from "./assets2/switzerland.png";
import JPY from "./assets2/japan.png";
import KRW from "./assets2/south-korea.png";
import TRY from "./assets2/turkey.png";
import KZT from "./assets2/kazakhstan.png";
import AED from "./assets2/united-arab-emirates.png";
import CNY from "./assets2/china.png";
import Api from "../../services/api";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import arrow from "./assets2/arrow.png";
import Cleave from "cleave.js/react";
import Waiting from "../waiting";
import Warning from "../warning";
import * as accounting from "accounting";
import "./curr_rates.css"
import * as actionTypes from "../../store/actions/Actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import Translations from "../../translations/translations";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GoBack from "../bank_operation/go-back.png";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = () => ({
    goBack2: {
        textTransform: "capitalize",
        marginBottom : "10px",
    }
});

class Curr_rates extends Component {
    api = new Api();
    state = {
        courses : null,
        course_icons : {USD,EUR,RUB,GBP,CHF,JPY,KRW,TRY,KZT,AED,CNY},
        current: "",
        labelWidth: 0,
        from: null,
        to : {
            buying_rate: "0",
            currency_char: "UZS",
            currency_code: "000",
            difference_buying_rate: "0",
            difference_sb_course: "0",
            difference_selling_rate: "0",
            sb_course: "0",
            selling_rate: "0"
        },
        course_name : {
            "JPY" : "Иена",
            "RUB" : "Российский рубль",
            "CHF" : "Швейцарский франк",
            "GBP" : "Фунт стерлингов",
            "USD" : "Доллар США",
            "EUR" : "Евро"
        },
        course_names : {
            "JPY" : {
                "ru":  "Иена",
                "uzc": "Япония иенаси",
                "uzl": "Yaponiya iyenasi",
                "en":  "Japan Yen"
            },
            "RUB" : {
                "ru":  "Российский рубль",
                "uzc": "Россия рубли",
                "uzl": "Rossiya rubli",
                "en":  "Russian Ruble"
            },
            "CHF" : {
                "ru":  "Швейцарский франк",
                "uzc": "Швейцария франки",
                "uzl": "Shveytsariya franki",
                "en":  "Swiss Franc"
            },
            "GBP" : {
                "ru":  "Фунт стерлингов",
                "uzc": "Англия фунт стерлинги",
                "uzl": "Angliya funt sterlingi",
                "en":  "Pound Sterling"
            },
            "USD" : {
                "ru":  "Доллар США",
                "uzc": "АҚШ доллари",
                "uzl": "AQSH dollari",
                "en":  "US Dollar"
            },
            "EUR" : {
                "ru":  "Евро",
                "uzc": "EВРО",
                "uzl": "EVRO",
                "en":  "Euro"
            }
        },
        key_up : false,
        buy: null,
        sell : null,
        sb : null,
        inputValue : null,
        amount : 1,
        wait : true,
        warning : false,
        warning_text : ''
    };

    componentDidMount() {
        const request = {
            request : "get_course",
            message_type : 25,
        };

        this.api.SetAjax(request).then(data=>{
            if(data.result === "1"){
                this.setState({
                    warning : true,
                    warning_text : data.msg,
                    wait : false
                })
            }else{
                const from = data.courses.filter((item)=>{
                    return item.currency_code === "840"
                });
                this.setState({
                    courses: data,
                    from : from[0],
                    wait : false
                });
            }
        })
    }


    from_toggle = (event) => {
           const targetValue = event.target.value;
           if(targetValue === "000"){
               this.setState({
                   from: {
                       buying_rate: "0",
                       currency_char: "UZS",
                       currency_code: "000",
                       difference_buying_rate: "0",
                       difference_sb_course: "0",
                       difference_selling_rate: "0",
                       sb_course: "0",
                       selling_rate: "0",
                   },
                   amount : 0,
                   key_up : false
               })
           }else{
               const item = this.state.courses.courses.filter((value)=>{
                   return value.currency_code === targetValue
               });
               this.setState({
                  from :  item[0],
                   to : {
                       buying_rate: "0",
                       currency_char: "UZS",
                       currency_code: "000",
                       difference_buying_rate: "0",
                       difference_sb_course: "0",
                       difference_selling_rate: "0",
                       sb_course: "0",
                       selling_rate: "0"
                   },
                   amount : 1,
                   key_up : false
               })
           }
    };

    to_toggle = (event) => {
        const targetValue = event.target.value;
        if(targetValue === "000"){
            this.setState({
                to: {
                    buying_rate: "0",
                    currency_char: "UZS",
                    currency_code: "000",
                    difference_buying_rate: "0",
                    difference_sb_course: "0",
                    difference_selling_rate: "0",
                    sb_course: "0",
                    selling_rate: "0",
                },
                key_up : false,
                amount : 1
            })
        }else{
            const item = this.state.courses.courses.filter((value)=>{
                return value.currency_code === targetValue
            });
            this.setState({
                to :  item[0],
                from : {
                    buying_rate: "0",
                    currency_char: "UZS",
                    currency_code: "000",
                    difference_buying_rate: "0",
                    difference_sb_course: "0",
                    difference_selling_rate: "0",
                    sb_course: "0",
                    selling_rate: "0"
                },
                key_up : false,
                amount : 0
            })
        }
    };

    changeType = () => {
        if(this.state.to.currency_code === "000"){
            this.setState((state)=>{
                return{
                    from : state.to,
                    to : state.from,
                    amount : 0,
                    key_up : state.key_up ? false : state.key_up
                }
            });
        }else{
            this.setState((state)=>{
                return{
                    from : state.to,
                    to : state.from,
                    amount : 1,
                    key_up : state.key_up ? false : state.key_up
                }
            });
        }

    };

    amountHandler = (event) => {
        let value = event.target.value.replace(/[^0-9.]/g, '');
        let buy;
        let sell;
        let sb;

        if(this.state.from.currency_char === "UZS"){
            buy = accounting.formatMoney(value / this.state.to.buying_rate);
            sell = accounting.formatMoney(value / this.state.to.selling_rate);
            sb = accounting.formatMoney(value / (this.state.to.sb_course).replace(/,/g, '.'));
        }else{
            buy = accounting.formatMoney(value * this.state.from.buying_rate);
            sell = accounting.formatMoney(value * this.state.from.selling_rate);
            sb = accounting.formatMoney(value * (this.state.from.sb_course).replace(/,/g, '.'));
        }

        this.setState({
            key_up : true,
            buy,
            sell,
            sb,
            amount : value
        })
    };

    currencyHandler = (code) =>{
        const from  = this.state.courses.courses.filter((value)=> {
            return value.currency_code === code;
        });
        this.setState({
            from : from[0],
            to : {
                buying_rate: "0",
                currency_char: "UZS",
                currency_code: "000",
                difference_buying_rate: "0",
                difference_sb_course: "0",
                difference_selling_rate: "0",
                sb_course: "0",
                selling_rate: "0"
            },
            amount : 1,
            key_up : false
        })
    };

    handleBack = () => {
        this.props.history.goBack();
    };

    render () {
        if(this.state.wait){
            return <Waiting/>
        }
        const {classes} = this.props;
        if(this.state.warning){
            return <Warning text={this.state.warning_text} url='/' error = 'Ошибка'/>
        }
        const {currency,chooseCurrency,CBExchange,purchase,sale,cardReceiver} = Translations.CurrencyRates
        const { language } = this.props
        const {currency_char,currency_code} = this.state.to;
        const courses = this.state.courses.courses.map((item)=>{
            const icon = this.state.course_icons[item.currency_char];
            return(
                <div key={item.currency_code} className="current-row" onClick={()=> this.currencyHandler(item.currency_code)}>
                    <div className="current-currency-table-cell first-row">
                        <img className="current-currency-image" src={icon} alt={item.currency_char}/>
                        <div className="current-currency-title">
                            <div className="current-currency">1 {item.currency_char}</div>
                            <div className="current-currency-name current-white-space">{this.state.course_names[item.currency_char][language]}</div>
                        </div>
                    </div>
                        <div className="current-currency-table-cell">
                            <div className="current-currency-title">
                                <div className="current-currency no-bold">{item.sb_course}</div>
                                <div className="current-currency-name">UZS</div>
                            </div>
                        </div>
                        <div className="current-currency-table-cell">
                            <div className="current-currency-title">
                                <div className="current-currency no-bold">{item.buying_rate}</div>
                                <div className="current-currency-name">UZS</div>
                            </div>
                        </div>
                        <div className="current-currency-table-cell">
                            <div className="current-currency-title">
                                <div className="current-currency no-bold">{item.selling_rate}</div>
                                <div className="current-currency-name">UZS</div>
                            </div>
                        </div>
                </div>
            )
        });

        const first = this.state.courses.courses.map((item)=> {
            return(
                <MenuItem key={item.currency_code} value={item.currency_code} >
                    <div>
                        <div className="conversion-cards">
                            <img alt='flag' src={this.state.course_icons[item.currency_char]} className='conversion-cards-image' style={{display : "block"}}/>
                            <div className="conversion-cards-info">
                                <p className="conversion-cards-name">{item.currency_char}</p>
                            </div>
                        </div>
                    </div>
                </MenuItem>
            )
        });

        const second = this.state.courses.courses.map((item)=> {
            return(
                <MenuItem key={item.currency_code} value={item.currency_code} >
                    <div>
                        <div className="conversion-cards">
                            <img alt='flag' src={this.state.course_icons[item.currency_char]} className='conversion-cards-image' style={{display : "block"}}/>
                            <div className="conversion-cards-info">
                                <p className="conversion-cards-name">{item.currency_char}</p>
                            </div>
                        </div>
                    </div>
                </MenuItem>
            )
        });

        return (
            <div className='cccc'>
                <Button className={`${classes.goBack2}`} onClick={this.handleBack}>
                    <ListItemIcon style={{marginRight: 0}}><img src={GoBack} alt="goBack"/></ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="inherit">
                            {Translations.Monitoring.toMain[this.props.language]}
                            </Typography>
                        }/>
                </Button>
            <div className="current-curreny-container">
                <Grid container>
                    <Grid item xs={12} sm={12} xl={6} lg={6} md={6} style={{borderRight : "1px solid  #e3e3e3",boxSizing : "border-box"}} className="ccc">
                        <div className='current-currency-inner-container'>
                            <div className="current-currency-header">
                                <div className="current-currency-table-row first-row">{currency[language]}</div>
                                <div className="current-currency-table-row">{CBExchange[language]}</div>
                                <div className="current-currency-table-row">{purchase[language]}</div>
                                <div className="current-currency-table-row">{sale[language]}</div>
                            </div>
                            <div className="current-currency-body">
                                {courses}
                            </div>
                        </div>
                    </Grid>

                    <Grid  item xs={12} sm={12} xl={6} lg={6}  md={6} style={{padding : '20px',boxSizing : "border-box"}} className="type-container">
                        <div className = "conversion-type">

                            <form  autoComplete="off" >
                                <p className="current-type-name">{chooseCurrency[language]}</p>
                                <FormControl variant="outlined"  >
                                    <Select
                                        value={this.state.from.currency_code}
                                        onChange={this.from_toggle}
                                        input={
                                            <OutlinedInput
                                                labelWidth={this.state.labelWidth}
                                                name="age"
                                                id="outlined-age-simple"
                                            />
                                        }
                                         style={{width: "100px"}}
                                        className='currency-select'
                                    >
                                        <MenuItem  value="000" >
                                            <div>
                                                <div className="conversion-cards">
                                                    <img alt='flag' src={UZS} className='conversion-cards-image' style={{width : '22px'}}/>
                                                    <div className="conversion-cards-info">
                                                        <p className="conversion-cards-name">UZS</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </MenuItem>
                                       {first}
                                    </Select>
                                </FormControl>
                            </form>

                            <img
                                alt='flag'
                                src={arrow}
                                className="conversion-btn"
                                onClick={this.changeType}/>

                             <form  autoComplete="off" >
                                 <p className="current-type-name">{chooseCurrency[language]}</p>
                                 <FormControl style={{float : 'right'}}>
                                    <Select
                                    value={currency_code}
                                    onChange={this.to_toggle}
                                    input={
                                        <OutlinedInput
                                            labelWidth={this.state.labelWidth}
                                            name="age"
                                            id="outlined-age-simple"
                                        />

                                    }
                                     style={{width: "100px"}}
                                    className='currency-select'
                                >
                                        <MenuItem  value="000" >
                                            <div>
                                                <div className="conversion-cards">
                                                    <img src={UZS} className='conversion-cards-image' style={{width : '22px'}}/>
                                                    <div className="conversion-cards-info">
                                                        <p className="conversion-cards-name">UZS</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </MenuItem>
                                        {second}
                                </Select>
                            </FormControl>
                        </form>

                        </div>
                        <div className='rate-in'>
                            <div className='rate-currency'>{this.state.from.currency_char}</div>
                            <div className='rate-input'>
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
                                        onChange={this.amountHandler}
                                        value = {this.state.amount}
                                        style  = {{border :"none" ,width : '100%', height: "40px",fontSize: '18px',outline : "none"}}

                                />
                            </div>
                        </div>
                        <div className='rate'>
                           <div className='rate-container'>
                               <div className="rate-buy">{purchase[language]}</div>
                               <div className="rate-buy-count">{this.state.key_up ? this.state.buy : accounting.formatMoney(this.state.from.buying_rate,"","2"," ",".")} {currency_char}</div>
                           </div>
                            <div className='rate-container'>
                                <div className="rate-buy">{sale[language]}</div>
                                <div className="rate-buy-count">{this.state.key_up ? this.state.sell : accounting.formatMoney(this.state.from. selling_rate,"","2"," ",".")} {currency_char}</div>
                            </div>
                            <div className='rate-container'>
                                <div className="rate-buy">{CBExchange[language]}</div>
                                <div className="rate-buy-count">{this.state.key_up ? this.state.sb : accounting.formatMoney(this.state.from.sb_course,"","2"," ",".")} {currency_char}</div>
                            </div>
                        </div>
                </Grid>
            </Grid>
        </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        language: state.menuItems.language,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles())(Curr_rates)));