import React, { Component } from 'react'
import {HashRouter as Router,Route,withRouter} from "react-router-dom";
import TransferMain from "../transfer-main";
import TransferMoney from "../transfer_money";
import TransferList from "../transfer_list";



class Transfer extends Component {
    render () {
        return (
            <Router>
                <div>
                    <Route exact path='/main/bank_operation/transfer' component={TransferMain}/>
                    <Route path='/main/bank_operation/transfer/transfer_money' component={TransferMoney}/>
                    <Route path='/main/bank_operation/transfer/transfer_list' component={TransferList}/>
                </div>
            </Router>
        );
    }
}

export default withRouter(Transfer);