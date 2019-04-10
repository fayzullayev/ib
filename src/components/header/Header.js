import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userImage: "",
            userName: ""
        }
    }
    render() {
        let currentPath = this.props.match.url;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="white">
                            <ul >
                                <li>
                                    <NavLink to={currentPath + "/Cards"}>Cards</NavLink>
                                </li>
                                <li>
                                    <NavLink to={currentPath + "/Deposit"}>Deposit</NavLink>
                                </li>
                                <li>
                                    <NavLink to={currentPath + "/Conversion"}>Conversion</NavLink>
                                </li>
                                <li>
                                    <NavLink to={currentPath + "/Credit"}>Credit</NavLink>
                                </li>
                                <li>
                                    <NavLink to={currentPath + "/Home"}>Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to={currentPath + "/Monitoring"}>Monitoring</NavLink>
                                </li>
                                <li>
                                    <NavLink to={currentPath + "/Payments"}>Payments</NavLink>
                                </li>
                            </ul>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default Header;