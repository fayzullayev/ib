import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Api from "../../services/api";
import Warning from "../warning";
import "./loan-history.css"

class LoanHistory extends Component {
    api = new Api();

    state = {
        data : null,
        warning : false,
        msg : null
    };

    componentDidMount() {
        const request = {
            request : "GET_CREDIT_REPORT",
            message_type : 118
        };


        this.api.SetAjax(request).then(data => {
                if(data.result === "0"){
                    this.setState({
                        data
                    })
                }else{
                    this.setState({
                        msg : data.msg,
                        warning : true,
                    })
                }
        }).catch(err=>{
            this.setState({
                msg : err.responseText,
                warning : true,
            })
        })
    }

    render () {

        const {warning,msg,data} = this.state;

        if(warning){
            return <Warning url="/main" text={msg}/>
        }

        return (
           <div className="loan-history-main">
               {data}
           </div>
        );
    }
}


export default withRouter(LoanHistory);