import React, {Component} from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Api from '../../services/api';
import Menu from "../menu";
import Sidebar from "../sidebar";
import {connect} from "react-redux";
import * as actionTypes from "../../store/actions/Actions";
import AppBar from "../app-bar";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Cards from "../cards";
import Deposits from "../deposit";
import News from '../news';
import Bank_operation from "../bank_operation";
import Conversion from "../conversion";
import Monitoring from "../monitoring";
import Payments from "../payments";
import Filials from "../branches-and-ATMs";
import Curr_rates from "../curr_rates"
import Profile from "../profile";
import Inn from '../inn'
import SendMail from '../send-mail'
import Settings from '../settings-main'
import Bank_contacts from '../bank_contacts'
import Ui from '../ui'
import url from "../../services/url";
import User from '@material-ui/icons/VerifiedUser';
import CleanLocalStorage from './cleanLS'


const styles = theme => ({
    root: {
        display: "flex",
        height : '100vh !important',
    },

    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit*3,
        backgroundColor: "white",
        marginTop: theme.mixins.toolbar + 10,
        height : '100vh !important',
    },

});

class Main extends Component {
    api=new Api();
    state = {
        mobileOpen: false,
        clientName: "",
        allMenus: "",
        routes: null,
        menuItems: null,
        sidebarItems: null,
        components: {Settings,Payments, Cards, Monitoring, Bank_operation, Deposits, News, Conversion, Filials, Curr_rates, Inn, Bank_contacts,Ui},
        cardsInfo: "",
        clientFirst:"",
        clientSecond:"",
        clientPhoneNumber:"",
        clientGender:"",
        lang:"",
        cardsPropsAdded:false,
        deposits:"",
    };

    componentWillMount() {
        let reqMenus = {
            request: "get_menus"
        };
        CleanLocalStorage() //To clean local storage from unnecessary items
        console.log(JSON.stringify(reqMenus));
        if (!(this.state.menuItems && this.state.menuItems.length) && !(this.state.sidebarItems && this.state.sidebarItems.length)) {
            this.props.loading({
                loading:true,
            });
            this.api.SetAjax(reqMenus).then(data=>{
                let responseJson=data;
                console.log(JSON.stringify(data));
                if (data.result) {
                    let menuItems=responseJson.result.filter(item => item.grouping === "menu_content");
                    let sidebarItems= responseJson.result.filter(
                        item => item.grouping === "bar");
                    let routes=responseJson.result.filter(item => item.grouping === "bar" || item.grouping === "menu_content");
                    let allPayments=responseJson.result.filter(item => item.grouping === "payments");
                    let allBankOperations=responseJson.result.filter(item => item.grouping === "bank_operation");
                    let clientName=responseJson.client_name;
                    let clientFirst=responseJson.client_first;
                    let clientSecond=responseJson.client_second;
                    let clientPhoneNumber=responseJson.phone_number;
                    let clientGender=responseJson.gender;
                    let lang=responseJson.lang?responseJson.lang:"ru";
                    this.setState({
                        menuItems: menuItems,
                        sidebarItems:sidebarItems,
                        routes:routes,
                        allPayments: allPayments,
                        allBankOperations: allBankOperations,
                        clientName: clientName,
                        clientFirst:clientFirst,
                        clientSecond:clientSecond,
                        clientPhoneNumber:clientPhoneNumber,
                        clientGender:clientGender,
                        lang:lang,
                        clientSrc:`${url}?request_name=get_profile_img&request=get_profile_img`
                    });
                    this.props.addMenuItems({
                        menuItems: menuItems,
                        sidebarItems: sidebarItems,
                        allPayments: allPayments,
                        allBankOperations: allBankOperations,
                        currClientName:clientName,
                        clientFirst:clientFirst,
                        clientSecond:clientSecond,
                        phoneNumber:clientPhoneNumber,
                        clientGender:clientGender,
                        language:lang,
                        cardsPropsAdded:false,
                        depositsAdded:false,
                    });
                    this.props.loading({
                        loading:false,
                    });
                }
                else
                  this.setState({
                    waiting:true});
                });
            }
        if (this.state.cardsInfo === "") {
            let requestForCards = {
                request: "Cards",
                message_type: 1
            };
            console.log(JSON.stringify(requestForCards))
            this.props.loading({
                loading:true,
            });
            this.api.SetAjax(requestForCards).then(data=>{
                if (data.result==="0") {
                    this.props.cardInfo({
                        allCards: data,
                    });
                    this.props.addMenuItems({
                        cardsPropsAdded:true,
                    });
                    this.props.loading({
                        loading:false,
                    });
                    this.setState({
                        cardsInfo: data,
                        cardsPropsAdded:true,
                    });
                }
                else
                  this.setState({
                    waiting:true});
                console.log(JSON.stringify(data));
            });
        }
        if (this.state.deposits === "") {
            let requestForDep = {
                request: "dep",
                request_code: 105
            };
            console.log(JSON.stringify(requestForDep))
            this.props.loading({
                loading:true,
            });
            this.api.SetAjax(requestForDep).then(data=>{
                if (data.result==="0") {
                    this.props.depositsList({
                        depositsJson: data,
                    });
                    this.props.addMenuItems({
                        depositsAdded:true
                    });
                    this.props.loading({
                        loading:false,
                    });
                    this.setState({
                        deposits: data,
                        depositsAdded:true,
                    });
                }
                else
                  this.setState({
                    waiting:true});
                console.log(JSON.stringify(data));
            });
        }


        }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.menuItems){
            if(this.props.menuItems.language!=this.state.lang){
                let reqMenus = {
                    request: "get_menus"
                };
                this.props.loading({
                    loading:true,
                });
                this.api.SetAjax(reqMenus).then(data=>{
                    let responseJson=data;
                    console.log(JSON.stringify(data));
                    if (data.result) {
                        let menuItems=responseJson.result.filter(item => item.grouping === "menu_content");
                        let sidebarItems= responseJson.result.filter(
                            item => item.grouping === "bar");
                        let routes=responseJson.result.filter(item => item.grouping === "bar" || item.grouping === "menu_content");
                        let allPayments=responseJson.result.filter(item => item.grouping === "payments");
                        let allBankOperations=responseJson.result.filter(item => item.grouping === "bank_operation");
                        let clientName=responseJson.client_name;
                        let clientFirst=responseJson.client_first;
                        let clientSecond=responseJson.client_second;
                        let clientPhoneNumber=responseJson.phone_number;
                        let clientGender=responseJson.gender;
                        let lang=responseJson.lang?responseJson.lang:"ru";
                        this.setState({
                            menuItems: menuItems,
                            sidebarItems:sidebarItems,
                            routes:routes,
                            allPayments: allPayments,
                            allBankOperations: allBankOperations,
                            clientName: clientName,
                            clientFirst:clientFirst,
                            clientSecond:clientSecond,
                            clientPhoneNumber:clientPhoneNumber,
                            clientGender:clientGender,
                            lang:lang,
                            clientSrc:`${url}?request_name=get_profile_img&request=get_profile_img`
                        });
                        this.props.addMenuItems({
                            menuItems: menuItems,
                            sidebarItems: sidebarItems,
                            allPayments: allPayments,
                            allBankOperations: allBankOperations,
                            currClientName:clientName,
                            clientFirst:clientFirst,
                            clientSecond:clientSecond,
                            phoneNumber:clientPhoneNumber,
                            clientGender:clientGender,
                            language:lang,
                            cardsPropsAdded:true,
                            depositsAdded:true,
                        });
                        this.props.loading({
                            loading:false,
                        });
                    }
                    else
                      this.setState({
                        waiting:true});
                    });

            }
        }
    }
    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };
    listItemClicked = () => {
        this.setState(state => ({mobileOpen: false}));
    };
    ClientNameChanged = (clientName,src) => {
        if(clientName ==="")
            clientName = this.state.clientName;

        this.setState({
            clientName:clientName,
            clientSrc:src
        })
         
    };
    componentDidMount(){
        console.log(this.props.match.url);
        if(this.props.match.url==="/main/");
        document.getElementById("gotoMainLogo").click();
    }
    render() {
      
        const {classes, theme} = this.props;
        const {menuItems, sidebarItems} = this.state;
        return (
            <Router basename='/main/'>
                <div className={classes.root}>
                    <AppBar cardsPropsAdded={this.state.cardsPropsAdded} clientSrc={this.state.clientSrc} clientName={this.state.clientName} iconClick={this.handleDrawerToggle} />
                    <Sidebar mobileOpen={this.state.mobileOpen} onClose={this.handleDrawerToggle} listItemClicked={this.listItemClicked}/>
                    <main className={`${classes.content} `}>
                        <div className={classes.toolbar}/>
                        <Switch>
                            <Route exact path="/" component={Menu}/>
                            <Route  path="/send-mail" component={SendMail}/>
                            <Route  path="/profile" render={()=><Profile clientSrc={this.state.clientSrc} ClientNameChanged={this.ClientNameChanged} gender={this.state.clientGender} first_name={this.state.clientFirst} second_name={this.state.clientSecond} phone_number={this.state.clientPhoneNumber}/>}/>
                            {this.state.routes?this.state.routes.map((text) => {
                                const curr_component = this.state.components[text.target.charAt(0) + text.target.toLowerCase().slice(1)];
                                return (<Route path={`/${text.target.toLowerCase()}`} component={curr_component}
                                               key={text.target}/>)
                            }) : ""}
                        </Switch>
                        
                    </main>


                </div>
            </Router>
        );
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        menuItems:state.menuItems
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addMenuItems: info =>
            dispatch({
                type: actionTypes.menuItems,
                info: info
            }),
        cardInfo: info =>
            dispatch({
                type: actionTypes.cardInformation,
                info: info
            }),
        depositsList: info =>
            dispatch({
                type: actionTypes.deposits,
                info: info
            }),
        loading: info =>
            dispatch({
                type: actionTypes.loadingHandler,
                info: info
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(Main));