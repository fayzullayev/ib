import React, { Component } from 'react';
import {Link, withRouter} from "react-router-dom"
import {connect} from "react-redux";
import ConversionHistoryItems from "./conversion-history-items";
import Grid from '@material-ui/core/Grid';
import SetAjax from "../../services/SetAjax";
import "./conversion-history.css";
import Warning from "../warning";
import Waiting from "../waiting";
import Api from "../../services/api"
import Translations from "../../translations/translations";


class ConversionHistory extends Component {
    api = new Api();

    lan = Translations.Conversion;

    state = {
        historyList : null,
        waiting : true,
        text : null,
        warning : false,
    };

    componentDidMount() {
        const request = {
            request : "conversion_history",
            message_type : 42
        };
        this.api.SetAjax(request).then(data => {

            if(data.result === "0"){
                if(data.conversion_histories > 0){
                    this.setState({
                        historyList : data.conversion_histories,
                        waiting : false
                    })
                }else{
                    this.setState({
                        waiting : false,
                        warning : true,
                        text : Translations.Conversion.noDataFound[this.props.language]
                    })
                }

            }else{
                this.setState({
                    warning : true,
                    waiting : false,
                    text : data.msg
                })
            }
        });
    }

    render () {

        if(this.state.waiting){
            return (
                <Waiting/>
            )
        }

        if(this.state.warning){
            return (
                <Warning url = "/main" text={this.state.text}/>
            )
        }

        const { historyList } = this.state;

        const items = historyList.map((item)=>{
            return <ConversionHistoryItems {...item}/>
        });

        return (
            <div>
                <Grid container className='history-container'>
                    {items}
                </Grid>
            </div>

        )
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

export default connect(mapStateToProps,mapDispatchToProps)(ConversionHistory);
