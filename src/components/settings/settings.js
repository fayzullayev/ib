import React, {Component} from "react";
import './settings.css';
import {HashRouter as Router,Route,Link, withRouter} from "react-router-dom";
import SettingsMain from  "../settings-main";
import ChangePassword from "../change-password"
import ChangeLanguage from "../change-language"



class Settings extends Component{

    render(){

        return(
            <Router>
                <div>
                    <Route exact path='/main/settings' component={SettingsMain}/>
                    <Route exact path='/main/settings/change-password' component={ChangePassword}/>
                    <Route exact path='/main/settings/change-language' component={ChangeLanguage}/>
                </div>
            </Router>
        )
    }
}




export default withRouter(Settings);