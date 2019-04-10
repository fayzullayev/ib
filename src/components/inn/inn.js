import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import Debt from "./debt"
import Info from './info'
import Waiting from '../waiting/index'
import GoBack from "./back.png";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { HashRouter as Router, Route, Link,withRouter,Switch} from "react-router-dom";
import Translations from "../../translations/translations";
import {connect} from 'react-redux';




const styles = theme => ({
    menuContent: {
        borderRadius: 6,
        border: "1px solid #e3e3e3",
        alignItems: "center"
    },
    menuSubContent: {
        borderRight: "1px solid #e3e3e3",
        borderBottom: "1px solid #e3e3e3",
        '&:hover': {
            backgroundColor: "rgba(10, 38, 108, 0.03);",
            cursor: "pointer"
        }
    },
    menuListItem: {
        '&:hover': {
            backgroundColor: "rgba(10, 38, 108, 0.005);",
            fontWeight: 600
        }
    },
    goBack: {
        textTransform: "capitalize",
        marginBottom: "10px"
    },
    header: {
        display: "flex",
        width: "100%",
        borderBottom: "1px solid #e3e3e3",
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: "space-between"
    },
    blockList: {
        marginLeft: 10,
        marginTop: 6,
        '&:hover': {
            cursor: "pointer"
        }
    },
    defList: {
        marginRight: 10,
        marginTop: 6,
        '&:hover': {
            cursor: "pointer"
        }
    },
    tabActive: {
        textTransform: "capitalize",
    },
    disableTab: {
        textTransform: "capitalize",
        color: "#9b9b9b"
    }
});

class Inn extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentLanguage: this.props.language,
            InnInfo: true,
            DebtInfo: false,
            DebtState: false,
            waiting: false,
    
        };
        
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.cardInfo !== prevProps.cardInfo) {
            this.setState({
                currentLanguage: this.props.language
            })

        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                currentLanguage: this.props.language
            })
        }, 50);
    }
    handleBack = () => {
        localStorage.removeItem('inn')
        this.props.history.push("/");
    }
    handleDebtClick = () => {
        this.setState({
                        DebtInfo : true,
                        InnInfo  : false })
    }
    handleInnClick = () => {
        this.setState({
                        DebtInfo : false,
                        InnInfo  : true })
    }
   
    render() {
        const { classes } = this.props;
        let lan = Translations.SSN;
        const {
            waiting,
            InnInfo,
            DebtInfo,
            currentLanguage,
        } = this.state;
        
        if (waiting) {
            return (
                <Waiting />
            );
        }
        else
            return (
                <Router >
                <div>
                    <Button className={classes.goBack} onClick={this.handleBack} >
                        <ListItemIcon style={{ marginRight: 0 }}><img src={GoBack} alt="goBack" /></ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="inherit" >
                                   {lan.back[currentLanguage]}
                    </Typography>
                            } />
                    </Button>
                    <Grid container  className={classes.menuContent}>
                        <div className={classes.header}>
                            <div style={{ display: "inline-block" }}>
                                <Button onClick={this.handleInnClick}  component={Link} to="/main/inn/info" className={InnInfo     ?  classes.tabActive    :   classes.disableTab}> {lan.ssn[currentLanguage]}</Button>
                                <Button onClick={this.handleDebtClick}   component={Link} to="/main/inn/debt" className={DebtInfo    ? classes.tabActive     :   classes.disableTab}>{lan.debt[currentLanguage]}</Button>
                            </div>
                        </div>
                        <Switch>   
                        <Route exact path="/main/inn/"       render={()=><Info goDebt={this.handleDebtClick} />} />
                        <Route exact path="/main/inn/info"   render={()=><Info goDebt={this.handleDebtClick} />} />
                        <Route exact path="/main/inn/debt"   component={Debt} />
                        </Switch>    
                    </Grid>
                </div>
                </Router >
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

Inn.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Inn)));
