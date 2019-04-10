import React from 'react'
import {connect} from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Avatar from '@material-ui/core/Avatar';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import sendMail from "./sendmail.png";
import Line from "../line";
import Translations from "../../translations/translations";

const drawerWidth = 250;

const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {

        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        boxShadow: "none",
        borderBottom: "2px solid #E3E3E3",
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up("sm")]: {
            display: "none"
        },
        padding: 5,
        display: "inline-block"
    },
    toolbar: theme.mixins.toolbar,
    IconBank: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        },
        [theme.breakpoints.up("sm")]: {
            display: "inline-block"
        }
    },
    menuListItem: {
        width: "auto",
        textAlign: "center",
        verticalAlign: "middle"
    },
    menuListItemlast: {
        width: "auto",
        textAlign: "center",
        verticalAlign: "middle"
    }
});
const Appbar = (props) => {
    const lang = props.menuItems ? props.menuItems.language : "ru"
    const {classes} = props;
    const clientName = props.clientName;
    let V_src;
    try {
        V_src = props.clientSrc;
    } catch (e) {
        V_src = require('../profile/user.png');
    }

    return (
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            {!props.cardsPropsAdded ? <div id="preloading"><Line/></div> : ""}
            <Toolbar style={{justifyContent: "space-between"}}>
                <div style={{display: "flex"}}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={props.iconClick}
                        className={classes.menuButton}
                    >
                        <Avatar alt="Remy Sharp" src={V_src} style={{width: 40, height: 40}}/>
                        {/* <img
                            src={props.clientSrc}
                            alt="Avatar"
                            style={{width: 40, height: 40}}
                        /> */}
                    </IconButton>
                    <Avatar alt="Remy Sharp" src={V_src} className={classes.IconBank}/>
                    <Typography type="title" style={{
                        marginLeft: 10,
                        textDecoration: "none",
                        display: "inline-block",
                        marginTop: "auto",
                        marginBottom: "auto"
                    }} component={Link} to="/profile">
                        {clientName}
                    </Typography>
                </div>
                <div style={{display: "flex"}}>
                    <ListItem button className={classes.menuListItemlast} component={Link} to="/send-mail">
                        <ListItemIcon><img src={sendMail} alt="SM"/></ListItemIcon>
                        <ListItemText
                            style={{padding: 0}}
                            primary={
                                <Typography variant="inherit">
                                    {Translations.Main.sendMail[lang]}
                                </Typography>
                            }/>
                    </ListItem>
                 </div>
            </Toolbar>
        </AppBar>);
};
const mapStateToProps = state => {
    return {
        menuItems: state.menuItems
    };
};
const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Appbar));