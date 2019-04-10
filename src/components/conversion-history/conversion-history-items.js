import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import "./conversion-history.css"
import Translations from "../../translations/translations";
import {connect} from "react-redux";

class ConversionHistoryItems extends Component {

    lan = Translations.Conversion;

    render () {
        const {froms,tos,status,dates} = this.lan;
        let { from_card, to_card, val_amount, sum_amount,date, state, message,language } = this.props;
        let succesClass;
        if(message){
            succesClass = "h-red"
        }else{
            succesClass = "h-green"
        }
        date = date.replace('_',' ');
        return (
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12} className='history-item'>
                <div className="history-from"> <p className='from-title'>{froms[language]} :</p> <p className="sv-card-number">{from_card}</p> <p className='from-curreny'>{sum_amount}</p> </div>
                <div className="history-from"> <p className='from-title'>{tos[language]} :</p> <p className="sv-card-number">{to_card}</p> <p className='from-curreny'>{val_amount}</p> </div>
                <div className="history-from"> <p className='from-title h-date'>{dates[language]} :</p> <p className='from-curreny h-bold'>{date}</p> </div>
                <div className="history-from"> <p className='from-title h-date'>{status[language]} :</p> <p className={`from-curreny ${succesClass}`}>{state}</p> </div>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.menuItems.language,
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps,mapDispatchToProps)(ConversionHistoryItems);