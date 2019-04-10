import React, { Component } from 'react';
import LoanMain from "../loan-main"
import LoanHistory from "../loan-history"
import {HashRouter as Router,Route,withRouter} from "react-router-dom"

class Loan extends Component {

    render () {

        const  { classes } = this.props;

        return (
            <Router>
                <div>
                    <Route exact path='/main/bank_operation/loan' component={LoanMain}/>
                    <Route path='/main/bank_operation/loan/:id' component={LoanHistory}/>
                </div>
            </Router>
        );
    }
}


export default withRouter(Loan);