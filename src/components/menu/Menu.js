import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {  Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SvCards from './svcards'
import TetCards from './tetcards'
import Deposits from './depositsForMenu'
import './menu.css';
import InnerWaiting from "../spinner-opacity";
const styles = theme => ({
content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    backgroundColor: "white",
    marginTop: theme.mixins.toolbar + 10
  },
  menuContent: {
    marginBottom:15,
    borderRadius: 6,
    border: "1px solid #e3e3e3",
    alignItems: "center",
    position:"relative"
  },
  menuSubContent: {
    borderRight: "1px solid #e3e3e3",
    borderBottom: "1px solid #e3e3e3",
    '&:hover':{
      backgroundColor: "rgba(10, 38, 108, 0.03);",
      cursor:"pointer"
    },
    margin : 0
  },
  menuListItem:{
      padding: "15px",
    '&:hover':{
      backgroundColor:"rgba(10, 38, 108, 0.005);",
      fontWeight:500
    }
  },
  menuCards:{
    '&:hover':{
      backgroundColor: "rgba(10, 38, 108, 0.03);",
      cursor:"pointer"
    }
  }
});
class Menu extends Component {
    state = {
      uzCards:[],
      valCards:[],
      depositsList:"",
      innerWaiting: this.props.cardInfo.allCards?false:true,
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.cardInfo !== prevProps.cardInfo)
        {
            let uzCards=this.props.cardInfo.allCards.card_list.filter(card=>card.card_type==="SV" || card.card_type==='GL');
            let valCards=this.props.cardInfo.allCards.card_list.filter(card=>card.card_type==="TET");
            this.setState({
              uzCards:uzCards,
              valCards:valCards,
              innerWaiting: false,
            });
        }
       
        if(this.props.depositsList !== prevProps.depositsList)
        {
            this.setState({
             depositsList: this.props.depositsList
            });
        }
    }
    componentDidMount(){
      if(this.props.menuItems.cardsPropsAdded)
      {
        if(this.props.cardInfo.allCards){
          let uzCards=this.props.cardInfo.allCards.card_list.filter(card=>card.card_type==="SV" || card.card_type==='GL');
            let valCards=this.props.cardInfo.allCards.card_list.filter(card=>card.card_type==="TET");
            this.setState({
              uzCards:uzCards,
              valCards:valCards,
            depositsList: this.props.depositsList
            });
        }
      }
    }

    render() {
      if(this.state.valCards.length)
      localStorage.setItem('hasVal','&rts#@Wfrs');
        const { classes } = this.props;
        const menuItems=this.props.menuItems.menuItems;
        const menu_content=menuItems?menuItems.map((text)=>{
          const src=require('../../../public/assets/menu-icons/'+text.src+'.png');
        return(<Grid item xs={12} sm={12} md={6} lg={4} className={classes.menuSubContent} key={text.target} component={Link} to={`/${text.target.toLowerCase()}`} style={{textDecoration:"none",color:"black"}}>
              
              <ListItem  button className={classes.menuListItem}>
                                <ListItemIcon><img style={{width : '45px', height : '45px'}} src={src} alt={text.src} /></ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography variant="inherit" >
                                            {text.label}
                                        </Typography>
                                    }/>
                            </ListItem>
            </Grid>)}
            ):"";
        return (<div className='menu-list-item'>
                <Grid container className={classes.menuContent}>
                  <Grid className={classes.menuCards} item xs={12} sm={12} md={6} lg={4} style={{ borderRight: "1px solid #e3e3e3",borderBottom: "1px solid #e3e3e3",}}><SvCards cards={this.state.uzCards} lang={this.props.menuItems?this.props.menuItems.language:"ru"}/></Grid>
                  {this.state.uzCards.length?this.state.valCards.length?<Grid className={classes.menuCards} item xs={12} sm={12} md={6} lg={4} style={{ borderRight: "1px solid #e3e3e3",borderBottom: "1px solid #e3e3e3",}}><TetCards cards={this.state.valCards} lang={this.props.menuItems?this.props.menuItems.language:"ru"}/></Grid>:"":""}
                  {this.state.depositsList!==""?this.state.depositsList.depositsJson && this.state.depositsList.depositsJson.deposits.length?<Grid  className={classes.menuCards}item xs={12} sm={12} md={6} lg={4} style={{ borderRight: "1px solid #e3e3e3",borderBottom: "1px solid #e3e3e3"}}><Deposits cards={this.state.valCards} deposits={this.state.depositsList}  depositsAdded={this.props.menuItems.depositsAdded} lang={this.props.menuItems?this.props.menuItems.language:"ru"}/></Grid>:"":""}
                </Grid>
                <Grid container className={classes.menuContent}>
                {this.state.innerWaiting ? <InnerWaiting/> : ""}
                    {menu_content}
                </Grid>
          </div> );
    }
}
const mapStateToProps = state => {
    return {
      cardInfo: state.cardsInfo,
      menuItems : state.menuItems,
      depositsList:state.deposits
    };
  };
  const mapDispatchToProps = dispatch => {
    return {};
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(Menu));