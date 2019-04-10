import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconBank from "./aab.png";
import logOut from "./log-out.png";
import Home from "./home2.png";
import SideBackground from "./sidebar-background.png";
import Timer from "../../services/setTimerSidebar";
import Api from "../../services/api";
import Translation from '../../translations/translations.json';

const drawerWidth = 250;
const styles = theme => ({
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundImage: `url(${SideBackground})`,
        backgroundColor:theme.sideBarDrawerBack,
        backgroundRepeat: "no-repeat",
        // backgroundSize: "cover"
    },
    toolbar: theme.mixins.toolbar,
    divider: {
        height: 2,
        backgroundColor: "#344989",
        marginBottom: 15
    },
});

class Sidebar extends Component {
    api=new Api();
    state = {redirect:false};
    killSession=()=>{
        if (window.confirm(Translation.Main.doYouWantToLeave[this.props.menuItems?this.props.menuItems.language:"ru"])) {
            let reqKillSession={
                request:"sign_out"
            };
            this.api.SetAjax(reqKillSession).then(data=>{
                window.location.href = '/ib_web/ib/';//выйти bilan 
            });
        } else {
            console.log("// Do nothing!");
        }
    };
    render() {
        const {classes, theme} = this.props;
        const lang=this.props.menuItems?this.props.menuItems.language:"ru"
        const sidebarItems = this.props.menuItems.sidebarItems;
        const drawer = (
            <div>
                <div className={classes.toolbar} onClick={this.props.listItemClicked}>
                    <Link to="/" id="gotoMainLogo">
                        <img
                            src={IconBank}
                            style={{
                                width: 200,
                                paddingLeft: 16,
                                paddingTop: 11
                            }}
                            alt="Brand bank"
                        />
                    </Link>
                </div>
                <Divider className={classes.divider}/>
                <List>
                   <Link to="/" style={{textDecoration: "none"}}>
                        <ListItem button onClick={this.props.listItemClicked}>
                            <ListItemIcon><img src={Home} alt="log-out" style={{width:24,height:24}}/></ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography type="body" style={{color: "white",justifyContent:"space-around"}}>
                                        <span style={{display:"inline-block"}}>{Translation.Main.homePage[lang]}</span>
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </Link>
                    {sidebarItems ? sidebarItems.map((text) => {
                        const src = require('../../../public/assets/menu-icons/' + text.src + '.png');
                         
                    //     if (text.src === "ic_ui" ){
                    //         return (<a  href="../ib/main/ui" key={text.target}
                    //                 style={{textDecoration: "none"}}>
                    //         <ListItem button onClick={this.props.listItemClicked}>
                    //             <ListItemIcon><img src={src} alt={text.src}/></ListItemIcon>
                    //             <ListItemText
                    //                 primary={
                    //                     <Typography type="body" style={{color: "white"}}>
                    //                         {text.label}
                    //                     </Typography>
                    //                 }
                    //             />
                    //         </ListItem>
                    //     </a>
                    // )}
                    // else{
                    return (<Link to={`/${text.target.toLowerCase()}`} key={text.target}
                                    style={{textDecoration: "none"}}>
                            <ListItem button onClick={this.props.listItemClicked}>
                                <ListItemIcon><img src={src} alt={text.src}/></ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography type="body" style={{color: "white"}}>
                                            {text.label}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </Link>
                    )
                //}
                    }) : ""}
                    <div onClick={this.killSession} style={{textDecoration: "none"}}>
                     <ListItem button onClick={this.props.listItemClicked}>
                        <ListItemIcon><img src={logOut} alt="log-out" style={{width:24,height:24}}/></ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography type="body" style={{color: "white",justifyContent:"space-around"}}>
                                    <span style={{display:"inline-block"}}>{Translation.Main.sideBarLogOut[lang]}</span><Timer inner style={{display:"inline-block"}} forSidebar={true} refresh={false} path={"/"} minutes={10} seconds={0}/>
                                </Typography>
                            }
                        />
                     </ListItem>
                     </div>
                </List>
            </div>
        );
        return (<nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    container={this.props.container}
                    variant="temporary"
                    anchor={theme.direction === "rtl" ? "right" : "left"}
                    open={this.props.mobileOpen}
                    onClose={this.props.onClose}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>);
    }
}

const mapStateToProps = state => {
    return {
        menuItems: state.menuItems
    };
};
const mapDispatchToProps = dispatch => {
    return {};
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Sidebar)));
