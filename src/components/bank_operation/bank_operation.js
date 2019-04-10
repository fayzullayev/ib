import React, { Component } from 'react';
import BankOperationMain from "../bank-operations-main"
import {HashRouter as Router,Route,withRouter} from "react-router-dom"
import Pay2Pay from "../pay_2_pay"
import Loan from "../loan"
import Transfer from "../transfer"
import AccountTransfer from "../account_transfer"
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GoBack from "./go-back.png";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core";
import "./bank_operation.css"
import {connect} from "react-redux";
import Translations from "../../translations/translations"

const styles = theme => ({
    goBack: {
        textTransform: "capitalize",
        marginBottom: "10px",
    }
});

class BankOperation extends Component {

    handleBack = () => {
        this.props.history.goBack();
    };

    render () {

    const  { classes } = this.props;

    return (
        <Router>
            <div className="bank-operation">
                <Button className={`${classes.goBack} bank-operation-go-back`} onClick={this.handleBack}>
                    <ListItemIcon style={{marginRight: 0}}><img src={GoBack} alt="goBack"/></ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="inherit">
                                 {Translations.Monitoring.toMain[this.props.language]}
                            </Typography>
                        }/>
                </Button>
                <div className="bank-operation-itemssss">
                     <Route exact path='/main/bank_operation' component={BankOperationMain}/>
                     <Route path='/main/bank_operation/card_to_card' component={Pay2Pay}/>
                     <Route path='/main/bank_operation/loan' component={Loan}/>
                     <Route path='/main/bank_operation/transfer' component={Transfer}/>
                    <Route path='/main/bank_operation/account_transfer' component={AccountTransfer}/>
                </div>
                </div>
        </Router>
      );
  }
}

const mapStateToProps = state => {
    return {
        language: state.menuItems.language,
    };
  };
  const mapDispatchToProps = dispatch => {
    return {};
  };



export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles)(BankOperation)));
