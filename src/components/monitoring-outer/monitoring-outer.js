import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from '@date-io/date-fns';
import {DatePicker, MuiPickersUtilsProvider} from 'material-ui-pickers';
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import {CalendarToday} from '@material-ui/icons';
import Chip from "@material-ui/core/Chip";
import {connect} from 'react-redux';
import DoneIcon from '@material-ui/icons/Done';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Income from './income';
import Outcome from './outcome';
import Waiting from '../waiting';
import Api from '../../services/api';
import CardIcon from '@material-ui/icons/CreditCard';
import Warning from "../warning";
import {Divider} from "@material-ui/core";
import InnerWaiting from "../spinner-opacity";
import Translations from "../../translations/translations";
import Error from "../error";
import './monitoring.css';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';
import {withRouter} from "react-router-dom";

const styles = theme => ({
    main: {
        [theme.breakpoints.up(400 + theme.spacing.unit * 10)]: {
            maxWidth: 375,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: "32px",
            borderRadius: "6px",
            border: "1px solid #e3e3e3",
            padding: "20px 0 25px 0",
            height: "100% !important"
        },
    },
    goBack: {
        textTransform: "capitalize",
        marginBottom: "4px",
    },
    paper: {
        padding: "24px",
    },
    dateFilterButton: {
        borderRadius: "16px",
        border: "1px solid rgba(120, 121, 147, 0.4)",
        fontSize: "11px",
        color: "#B0B0B0",
        marginRight: "12px",
        padding: "7px 24px"
    },
    dateFilterSelectedButton: {
        borderRadius: "16px",
        border: "2px solid #ffc004",
        fontSize: "11px",
        color: "#000000",
        marginRight: "12px",
        padding: "7px 24px"
    },
    selectCalendar: {
        borderRadius: "5px",
        border: "1px solid #e3e3e3",
        width: "80%"
    },
    submit: theme.submit,
    chip: {
        margin: "10px 20px 15px",
        opacity: 0.7,
        padding: "3px",
        paddingRight: 0
    },
    branchesLinkSelected: {

        fontSize: "14px",
        fontWeight: 600,
        color: "#000000"
    },
    branchesLink: {
        fontSize: "14px",
        color: "#9B9B9B"
    },
});

const localeMap = {
    en: enLocale,
    ru: ruLocale,
    uzc: ruLocale,
    uzl: ruLocale,
};

class Monitoring extends Component {
    api = new Api();

    constructor(props) {
        super(props);
        let now = Date();
        let momentTime = moment(now);
        let momentToday = momentTime.format('YYYYMMDD');
        let momentTodayWithDots = momentTime.format('DD.MM.YYYY');
        this.state = {
            requestUZS: "GET_SV_GATE_HISTORIES ",
            requestUSD: "GET_VAL_CARD_MONITORING",
            message_typeUZS: 122,
            message_typeUSD: 85,
            card_number: this.props.cardInfo.valCards.length ? this.props.cardInfo.valCards[0].card_number : null,
            page_number: 0,
            page_item_size: "20",
            start_date: momentToday,
            end_date: momentToday,
            date_begin: momentTodayWithDots,
            date_end: momentTodayWithDots,
            selectedDateFromToday: false,
            selectedDateFromYesterday: false,
            selectedDateFromLastMonth: false,
            selectedDateFromCurrentMonth: true,
            selectedDateFrom: new Date(),
            selectedDateTo: new Date(),
            cardTypeToMonitorUZ: true,
            uzCards: this.props.cardInfo.uzCards,
            valCards: this.props.cardInfo.valCards,
            atFilter: true,
            monitoringType: "outcome",
            incomeData: null,
            outcomeData: null,
            historyType: "uz",
            isWaiting: false,
            noData: false,
            uzCardsFiltered: null,
            lastPage: false,
            innerWaiting: !this.props.cardInfo.uzCards.length,
            innerWaitingForTable: false,
            currentLanguage: this.props.language,
            hasError: false,
            errorMessage: "",
            switchDisable: true,
            visible : false,
        }
    }

    iterator = 0;


    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Cards info from Redux for uzCards --------------", this.props.cardInfo.uzCards);
        console.log("Cards info from Redux for foregnCards --------------", this.props.cardInfo.valCards);
        if (this.props.language !== prevProps.language) {
            this.setState({
                isWaiting: false,
                currentLanguage: this.props.language
            })
        }

        if (this.props.cardInfo !== prevProps.cardInfo) {
            this.setState({
                uzCards: this.props.cardInfo.uzCards,
                valCards: this.props.cardInfo.valCards,
                isWaiting: false,
                card_number: this.props.cardInfo.valCards[0].card_number,
                innerWaiting: false,
                switchDisable: this.props.cardInfo.valCards.length ? false : true
            });
            setTimeout(()=>{
                this.dateHandlerForCurrentMonth();
                this.monitoringHandler();
                },0)

        }

    }

    componentWillMount() {
        if(this.props.cardInfo.uzCards.length > 0){
            this.dateHandlerForCurrentMonth();
            this.monitoringHandler();
        }
    }

    monitoringHandler = () => {
        this.setState({
            ...this.state,
            innerWaiting: true
        });
        console.log('isWaiting ---- ', this.state.isWaiting);
        let uzCards = this.state.uzCards;
        let uzCardsFiltered = [];
        uzCards.map(data => {
            if (data.active) {
                uzCardsFiltered.push(data.card_number);
            }
        });
        let foregnCards = this.state.valCards;
        let foregnCardsFiltered = [];
        foregnCards.map(data => {
            if (data.active) {
                foregnCardsFiltered.push(data.card_number);
            }
        });

        let requestForUZSCards = {
            request: this.state.requestUZS,
            message_type: this.state.message_typeUZS,
            card_numbers: uzCardsFiltered,
            page_number: this.state.page_number,
            page_item_size: this.state.page_item_size,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        };
        let requestForUSDCards = {
            request: this.state.requestUSD,
            message_type: this.state.message_typeUSD,
            card_number: this.state.card_number,
            date_begin: this.state.date_begin,
            date_end: this.state.date_end,
            locking_flag: "1"
        };

        if (this.state.cardTypeToMonitorUZ) {
            console.log(requestForUZSCards);
            this.api.SetAjax(requestForUZSCards).then(responseJsonUZS => {
                if (responseJsonUZS.result === "0" && responseJsonUZS.msg === "") {
                    if (responseJsonUZS.content.length > 0) {
                        let incomeJSON = responseJsonUZS.content.filter(result => result.credit === "true");
                        let outcomeJSON = responseJsonUZS.content.filter(result => result.credit === "false");
                        this.setState((prevState, props) => {
                            return {
                                incomeData: incomeJSON,
                                outcomeData: outcomeJSON,
                                historyType: "uz",
                                atFilter: false,
                                noData: false,
                                uzCardsFiltered: uzCardsFiltered,
                                page_number: prevState.page_number + 1,
                                lastPage: JSON.parse(responseJsonUZS.last),
                                innerWaiting: false,
                                visible : true,
                            }
                        })
                    } else {
                        this.setState({
                            ...this.state,
                            atFilter: false,
                            noData: true,
                            innerWaiting: false
                        })
                    }

                } else {
                    this.setState({
                        ...this.state,
                        hasError: true,
                        errorMessage: responseJsonUZS.msg,
                        innerWaiting: false
                    })
                }
                console.log(responseJsonUZS);
            });

        } else {
            console.log(requestForUSDCards);
            this.api.SetAjax(requestForUSDCards).then(responseJsonUSD => {
                if (responseJsonUSD.result === "0" && responseJsonUSD.msg === "") {
                    if (responseJsonUSD.histories.length > 0) {
                        let incomeJSON = responseJsonUSD.histories.filter(result => result.op_dc === "C");
                        let outcomeJSON = responseJsonUSD.histories.filter(result => result.op_dc === "D");
                        this.setState({
                            ...this.state,
                            incomeData: incomeJSON,
                            outcomeData: outcomeJSON,
                            historyType: "foregn",
                            atFilter: false,
                            noData: false,
                            innerWaiting: false
                        })
                    } else {
                        this.setState({
                            ...this.state,
                            atFilter: false,
                            noData: true,
                            innerWaiting: false
                        })
                    }

                }
                console.log(responseJsonUSD);
            });
        }
    };
    dateHandlerForToday = () => {
        let now = Date();
        let momentTime = moment(now);
        let momentDate = momentTime.date();
        let momentMonth = momentTime.month();
        let momentYear = momentTime.year();
        let today2 = momentTime.format('YYYYMMDD');
        let todayWithDots2 = moment(now).format('DD.MM.YYYY');

        this.setState({
            ...this.state,
            selectedDateFromToday: true,
            selectedDateFromYesterday: false,
            selectedDateFromLastMonth: false,
            selectedDateFromCurrentMonth: false,
            selectedDateFrom: new Date(momentYear, (momentMonth), momentDate),
            selectedDateTo: new Date(momentYear, (momentMonth), momentDate),
            start_date: today2,
            end_date: today2,
            date_begin: todayWithDots2,
            date_end: todayWithDots2
        })

    };
    dateHandlerForYesterday = () => {
        let now = Date();
        let momentTime = moment(now).subtract(1, 'days');
        let momentDate = momentTime.date();
        let momentMonth = momentTime.month();
        let momentYear = momentTime.year();
        let yesterday = momentTime.format('YYYYMMDD')
        let yesterdayWithDots = moment(now).subtract(1, 'days').format('DD.MM.YYYY');
        this.setState({
            ...this.state,
            selectedDateFromToday: false,
            selectedDateFromYesterday: true,
            selectedDateFromLastMonth: false,
            selectedDateFromCurrentMonth: false,
            selectedDateFrom: new Date(momentYear, (momentMonth), momentDate),
            selectedDateTo: new Date(momentYear, (momentMonth), momentDate),
            start_date: yesterday,
            end_date: yesterday,
            date_begin: yesterdayWithDots,
            date_end: yesterdayWithDots
        })
    };
    dateHandlerForLastMonth = () => {
        let now = Date();
        let lastDayOfPreviousMonth = moment(now).subtract(1, 'months').endOf('month').format('YYYYMMDD');
        let firstDayOfPreviousMonth = moment(now).subtract(1, 'months').startOf('month').format('YYYYMMDD');
        let momentDateTo = moment(now).subtract(1, 'months').endOf('month').date();
        let momentMonthTo = moment(now).subtract(1, 'months').endOf('month').month();
        let momentYearTo = moment(now).subtract(1, 'months').endOf('month').year();
        let momentDateFrom = moment(now).subtract(1, 'months').startOf('month').date();
        let momentMonthFrom = moment(now).subtract(1, 'months').startOf('month').month();
        let momentYearFrom = moment(now).subtract(1, 'months').startOf('month').year();
        let firstDayOfPreviousMonthWithDots = moment(now).subtract(1, 'months').startOf('month').format('DD.MM.YYYY');
        let lastDayOfPreviousMonthWithDots = moment(now).subtract(1, 'months').endOf('month').format('DD.MM.YYYY');
        this.setState({
            ...this.state,
            selectedDateFromToday: false,
            selectedDateFromYesterday: false,
            selectedDateFromLastMonth: true,
            selectedDateFromCurrentMonth: false,
            selectedDateTo: new Date(momentYearTo, (momentMonthTo), momentDateTo),
            selectedDateFrom: new Date(momentYearFrom, (momentMonthFrom), momentDateFrom),
            date_begin: firstDayOfPreviousMonthWithDots,
            date_end: lastDayOfPreviousMonthWithDots,
            start_date: firstDayOfPreviousMonth,
            end_date: lastDayOfPreviousMonth
        })
    };
    dateHandlerForCurrentMonth = () => {
        let now = Date();
        let today1 = moment(now).format('YYYYMMDD');
        let firstDayOfCurrentMonth = moment(now).startOf('month').format('YYYYMMDD');
        let momentDateFrom = moment(now).startOf('month').date();
        let momentMonthFrom = moment(now).startOf('month').month();
        let momentYearFrom = moment(now).startOf('month').year();
        let momentDateTo = moment(now).date();
        let momentMonthTo = moment(now).month();
        let momentYearTo = moment(now).year();
        let todayWithDots = moment(now).format('DD.MM.YYYY');
        let firstDayOfCurrentMonthWithDots = moment(now).startOf('month').format('DD.MM.YYYY');
        this.setState({
            ...this.state,
            selectedDateFromToday: false,
            selectedDateFromYesterday: false,
            selectedDateFromLastMonth: false,
            selectedDateFromCurrentMonth: true,
            selectedDateTo: new Date(momentYearTo, (momentMonthTo), momentDateTo),
            selectedDateFrom: new Date(momentYearFrom, (momentMonthFrom), momentDateFrom),
            start_date: firstDayOfCurrentMonth,
            end_date: today1,
            date_begin: firstDayOfCurrentMonthWithDots,
            date_end: todayWithDots
        })
    };
    startDateChangeHandler = date => {
        let momentDate = moment(date);
        let selectedYear = momentDate.year();
        let selectedMonth = (momentDate.month() < 10) ? "0" + (momentDate.month() + 1) : (momentDate.month() + 1);
        let selectedDate = (momentDate.date() < 10) ? "0" + momentDate.date() : momentDate.date();
        let startDate = (" " + selectedYear + selectedMonth + selectedDate);
        let startDateWithDots = momentDate.format('DD.MM.YYYY');
        this.setState({
            ...this.state,
            start_date: startDate,
            date_begin: startDateWithDots,
            selectedDateFrom: date,
            selectedDateFromToday: false,
            selectedDateFromYesterday: false,
            selectedDateFromLastMonth: false,
            selectedDateFromCurrentMonth: false,
        });
    };
    endDateChangeHandler = date => {
        let momentDate = moment(date);
        let selectedYear = momentDate.year();
        let selectedMonth = (momentDate.month() < 10) ? "0" + (momentDate.month() + 1) : (momentDate.month() + 1);
        let selectedDate = (momentDate.date() < 10) ? "0" + momentDate.date() : momentDate.date();
        let endDate = (" " + selectedYear + selectedMonth + selectedDate);
        let endDateWithDots = momentDate.format('DD.MM.YYYY');
        this.setState({
            ...this.state,
            end_date: endDate,
            date_end: endDateWithDots,
            selectedDateTo: date,
            selectedDateFromToday: false,
            selectedDateFromYesterday: false,
            selectedDateFromLastMonth: false,
            selectedDateFromCurrentMonth: false,
        });
    };
    handleDeleteForUzCards = (cardIndex) => {
        let filteredCards = this.state.uzCards;
        filteredCards[cardIndex].active = !filteredCards[cardIndex].active;
        this.setState({
            ...this.state,
            uzCards: filteredCards
        })
    };
    handleDeleteForForegnCards = (cardIndex) => {
        let valCardsForFilter = this.state.valCards;
        valCardsForFilter.map((data, index) => {
            data.active = index === cardIndex;
            return true;
        });
        this.setState({
            ...this.state,
            card_number: this.state.valCards[cardIndex].card_number,
            valCards: valCardsForFilter
        })
    };
    handleChange = () => {
        this.setState({
            ...this.state,
            cardTypeToMonitorUZ: !this.state.cardTypeToMonitorUZ
        })
    };
    outcomeHandler = () => {
        if (this.state.outcomeData !== null && this.state.outcomeData.length > 0) {
            this.setState({
                ...this.state,
                noData: false,
                monitoringType: "outcome"
            })
        } else {
            this.setState({
                ...this.state,
                noData: true,
                monitoringType: "outcome"
            })
        }

    };
    incomeHandler = () => {
        if (this.state.incomeData !== null && this.state.incomeData.length > 0) {
            this.setState({
                ...this.state,
                noData: false,
                monitoringType: "income"
            })
        } else {
            this.setState({
                ...this.state,
                noData: true,
                monitoringType: "income"
            })
        }
    };

    showMoreHandler = () => {
        this.setState({
            ...this.state,
            innerWaitingForTable: true
        });
        let requestForUZSCards = {
            request: this.state.requestUZS,
            message_type: this.state.message_typeUZS,
            card_numbers: this.state.uzCardsFiltered,
            page_number: this.state.page_number,
            page_item_size: this.state.page_item_size,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        };
        console.log(requestForUZSCards);
        this.api.SetAjax(requestForUZSCards).then(responseJsonUZS => {
            if (responseJsonUZS.result === "0" && responseJsonUZS.msg === "") {
                if (responseJsonUZS.content.length > 0) {
                    let incomeJSON = responseJsonUZS.content.filter(result => result.credit === "true");
                    let outcomeJSON = responseJsonUZS.content.filter(result => result.credit === "false");
                    this.setState((prevState, props) => {
                        return {
                            ...this.state,
                            incomeData: this.state.incomeData.concat(incomeJSON),
                            outcomeData: this.state.outcomeData.concat(outcomeJSON),
                            historyType: "uz",
                            atFilter: false,
                            noData: false,
                            page_number: prevState.page_number + 1,
                            lastPage: JSON.parse(responseJsonUZS.last),
                            innerWaitingForTable: false
                        }
                    })
                }

            }
            console.log(responseJsonUZS);
        });

    };

    render() {
        if (this.state.isWaiting) {
            return <Waiting/>
        } else if (this.state.hasError) {
            return <Error/>
            //return <Error text = {this.state.errorMessage}/>
        }
        let lan = Translations.Monitoring;
        console.log(this.state.uzCards);
        console.log(this.state.valCards);
        let {classes} = this.props;
        const {selectedDateFrom, selectedDateTo, currentLanguage} = this.state;
        const locale = localeMap[currentLanguage];
        // cards are drawn here in order to select some of them from all
        let cardsToDraw;
        if (this.state.cardTypeToMonitorUZ) {//if selected card type is UZ cards
            console.log(this.state.uzCards);
            cardsToDraw = this.state.uzCards ? this.state.uzCards.map((data, index) => {
                if (data.active) {
                    return <Chip
                        icon={
                            <CardIcon/>
                        }
                        key={this.iterator++}
                        className={classes.chip}
                        label={data.card_name.slice(0, 20)}
                        onDelete={() => this.handleDeleteForUzCards(index)}
                        color="secondary"
                    />
                } else {
                    return (<Chip
                        icon={
                            <CardIcon/>
                        }
                        key={this.iterator++}
                        label={data.card_name.slice(0, 20)}
                        onDelete={() => this.handleDeleteForUzCards(index)}
                        className={classes.chip}
                        deleteIcon={<DoneIcon/>}
                        variant="outlined"
                    />)
                }
            }) : "";
        } else { //if selected card type is foreign cards
            cardsToDraw = this.state.valCards.map((data, index) => {
                if (data.active) {
                    return <Chip
                        icon={
                            <CardIcon/>
                        }
                        key={this.iterator++}
                        className={classes.chip}
                        label={data.card_name}
                        color="secondary"
                    />
                } else {
                    return (<Chip
                        icon={
                            <CardIcon/>
                        }
                        key={this.iterator++}
                        label={data.card_name}
                        onDelete={() => this.handleDeleteForForegnCards(index)}
                        className={classes.chip}
                        deleteIcon={<DoneIcon/>}
                        variant="outlined"
                    />)
                }
            })
        }
        return (
           this.state.visible ? this.props.cardInfo.uzCards.length > 0 ? <div style={{position: 'relative'}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                    <div style={{
                        borderRadius: "6px",
                        border: "1px solid #e3e3e3",
                        height: "100%",
                        marginTop: "8px"
                    }}>
                        {this.state.innerWaiting ? <InnerWaiting/> : null}
                        {this.state.atFilter ? <div className={classes.paper}>
                                <Grid container justify="space-between">
                                    <Grid item>
                                        <Button onClick={this.dateHandlerForToday}
                                                style={{marginTop: "6.5px", marginLeft: "6px"}}
                                                className={`${this.state.selectedDateFromToday ? classes.dateFilterSelectedButton : classes.dateFilterButton} dateFilters`}>
                                            {lan.forToday[currentLanguage]}{/*?? ???????*/}
                                        </Button>
                                        <Button onClick={this.dateHandlerForYesterday}
                                                style={{marginTop: "6.5px", marginLeft: "6px"}}
                                                className={`${this.state.selectedDateFromYesterday ? classes.dateFilterSelectedButton : classes.dateFilterButton} dateFilters`}>
                                            {lan.forYesterday[currentLanguage]}{/*?? ?????*/}
                                        </Button>
                                        <Button onClick={this.dateHandlerForLastMonth}
                                                style={{marginTop: "6.5px", marginLeft: "6px"}}
                                                className={`${this.state.selectedDateFromLastMonth ? classes.dateFilterSelectedButton : classes.dateFilterButton} dateFilters`}>
                                            {lan.forLastMonth[currentLanguage]}{/*?? ??????? ?????*/}
                                        </Button>
                                        <Button onClick={this.dateHandlerForCurrentMonth}
                                                style={{marginTop: "6.5px", marginLeft: "6px"}}
                                                className={`${this.state.selectedDateFromCurrentMonth ? classes.dateFilterSelectedButton : classes.dateFilterButton} dateFilters`}>
                                            {lan.forCurrentMonth[currentLanguage]}{/*?? ?????? ??????*/}
                                        </Button>
                                    </Grid>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Switch checked={this.state.cardTypeToMonitorUZ}
                                                             onChange={this.handleChange}
                                                             color="secondary"
                                                             disabled={this.state.valCards.length ? false : true}
                                            />}
                                            label={this.state.cardTypeToMonitorUZ ? <p>{lan.uzFilter[currentLanguage]}</p> :
                                                <p>{lan.foregnFilter[currentLanguage]}</p>}
                                            style={{marginLeft: "-6px"}}
                                        />
                                    </FormGroup>
                                </Grid>

                                <div className={classes.main}>
                                    <Grid container justify="center" alignContent="center" alignItems="center">
                                        <Typography style={{marginRight: "24px", fontSize: "13px", width: "10px"}}>
                                            {lan.from[currentLanguage]} {/*C*/}
                                        </Typography>
                                        <div className={classes.selectCalendar}>
                                            <Grid container alignContent="center" alignItems="center"
                                                  style={{marginLeft: "15px"}}>
                                                <CalendarToday style={{color: "#B0B0B0"}}/>
                                                <DatePicker
                                                    InputProps={{
                                                        disableUnderline: true,
                                                    }}
                                                    margin="normal"
                                                    // label="Start date"
                                                    value={selectedDateFrom}
                                                    onChange={this.startDateChangeHandler}
                                                    maxDate={new Date()}
                                                    style={{
                                                        marginTop: "8px",
                                                        marginLeft: "15px",
                                                        minWidth: "65px",
                                                        maxWidth: "120px"
                                                    }}
                                                />
                                            </Grid>
                                        </div>

                                    </Grid>
                                    <Grid container justify="center" alignContent="center" alignItems="center"
                                          style={{margin: " 16px 0"}}>
                                        <Typography style={{marginRight: "17px", fontSize: "13px", width: "15px"}}>
                                            {lan.to[currentLanguage]}{/*??*/}
                                        </Typography>
                                        <div className={classes.selectCalendar}>
                                            <Grid container alignContent="center" alignItems="center"
                                                  style={{marginLeft: "15px"}}>
                                                <CalendarToday style={{color: "#B0B0B0"}}/>
                                                <DatePicker
                                                    InputProps={{
                                                        disableUnderline: true,
                                                    }}
                                                    margin="normal"
                                                    // label="End date"
                                                    value={selectedDateTo}
                                                    onChange={this.endDateChangeHandler}
                                                    maxDate={new Date()}
                                                    style={{
                                                        marginTop: "8px",
                                                        marginLeft: "15px",
                                                        minWidth: "65px",
                                                        maxWidth: "120px"
                                                    }}
                                                />
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <div>
                                        <Grid container alignContent="center" alignItems="center">
                                            <Typography style={{marginLeft: "20px"}}>
                                                {lan.filterCards[currentLanguage]}{/*?????? ?? ??????:*/}
                                            </Typography>

                                        </Grid>
                                        <Grid container alignContent="center" alignItems="center">
                                            {cardsToDraw}
                                        </Grid>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <Button onClick={this.monitoringHandler}
                                                id='showDetailsButton'
                                                style={{margin: "auto"}}
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                className={`${classes.submit} showDetailsButton`}>
                                            {lan.showDetails[currentLanguage]}{/*???????? ??????*/}
                                        </Button>
                                    </div>
                                </div>
                                <Grid>
                                </Grid>
                            </div> :
                            <Grid container style={{position: "relative"}}>
                                {this.state.innerWaitingForTable ? <InnerWaiting/> : null}
                                <Grid container spacing={16} style={{marginTop: "10px", marginLeft: "10px"}}>
                                    <Button
                                        style={{marginLeft: "12px"}}
                                        className={this.state.monitoringType === "outcome" ? classes.branchesLinkSelected : classes.branchesLink}
                                        onClick={this.outcomeHandler}>
                                        {lan.outcome[currentLanguage]} {/*??????*/}
                                    </Button>
                                    <Button
                                        className={this.state.monitoringType === "income" ? classes.branchesLinkSelected : classes.branchesLink}
                                        onClick={this.incomeHandler}>
                                        {lan.income[currentLanguage]}{/*??????*/}
                                    </Button>
                                </Grid>
                                {!this.state.noData ? <Grid style={{width: "100%"}}>
                                        {this.state.monitoringType === "income" ?
                                            <Income incomeData={this.state.incomeData}
                                                    historyType={this.state.historyType}
                                                    lastPage={this.state.lastPage}
                                                    currentLanguage={this.state.currentLanguage}
                                            /> :
                                            <Outcome outcomeData={this.state.outcomeData}
                                                     historyType={this.state.historyType}
                                                     lastPage={this.state.lastPage}
                                                     currentLanguage={this.state.currentLanguage}
                                            />}
                                        <Divider style={{width: "100%"}}/>
                                        {(this.state.historyType === "uz" && !this.state.lastPage) ? <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            width: "100%",
                                            alignItems: "center",
                                        }}>
                                            <Button
                                                onClick={this.showMoreHandler}
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                className={`${classes.submit} showDetailsButton`}
                                                style={{margin: "15px 0"}}
                                            >
                                                {lan.showMore[currentLanguage]} {/*Show more*/}
                                            </Button>
                                        </div> : <div></div>}
                                    </Grid> :
                                    <div style={{width: "100%"}}>
                                        <Warning text={lan.noDataFound[currentLanguage]} url="/"/>
                                    </div>

                                }

                            </Grid>
                        }
                    </div>
                </MuiPickersUtilsProvider>
            </div> : null : null
        );
    }
}

const mapStateToProps = state => {
    return {
        cardInfo: state.cardsInfo,
        language: state.menuItems.language,
        menuItems: state.menuItems
    }
};
const mapDispatchToProps = dispatch => {
    return {}
};

Monitoring.propTypes = {
    classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Monitoring)));