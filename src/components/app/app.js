import React, {Component} from 'react';
import Login from '../login';
import Main from '../main';
import Registartion from '../registration';
import ForgotPassword from "../forgot-password"
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import store from '../../store/store';
import {Provider} from 'react-redux';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from "../../theme/theme";
import Snackbar from "@material-ui/core/Snackbar";

// import Branches


class App extends Component {

    render() {
        let {store} = this.props;
        return (
                <MuiThemeProvider theme={theme}>
                    <Router basename='/aab'>
                        <Switch>
                            <Route exact path="/" component={Login}/>
                            <Route path="/main/" component={Main}/>
                            <Route path="/registration/" component={Registartion}/>
                            <Route path="/forgotPassword/" component={ForgotPassword}/>
                        </Switch>
                    </Router>
                </MuiThemeProvider>
        );
    }
}

export default App;