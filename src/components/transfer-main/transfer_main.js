import React, { Component } from 'react';
import SetAjax from "../../services/SetAjax";
import { connect } from "react-redux";
import {  Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {BrowserRouter as Router,Route,withRouter,Link} from "react-router-dom"
import Button from "@material-ui/core/Button";
import GoBack from "./go-back.png";
import src1 from "./assets/ic_pay.png"
import src2 from "./assets/ic_main_operations.png"
import "./transfer-mains.css"


const styles = theme => ({
      menuContent: {
        borderRadius: 6,
        border: "1px solid #e3e3e3",
        alignItems: "center",
      },
      menuSubContent: {
        borderRight: "1px solid #e3e3e3",
        borderBottom: "1px solid #e3e3e3",
        '&:hover':{
          backgroundColor: "rgba(10, 38, 108, 0.03);",
          cursor:"pointer"
        },
        margin: 0
      },
      menuListItem:{
        '&:hover':{
          backgroundColor:"rgba(10, 38, 108, 0.005);",
          textDecoration:"none",
          fontWeight:500
        }
      },
      goBack:{
        textTransform: "capitalize",
        marginBottom:15
      },
      header:{
        display:"flex",
        width:"100%",
        borderBottom:"1px solid #e3e3e3",
        paddingLeft:16,
        paddingRight:16,
        paddingTop:10,
        paddingBottom:10,
        justifyContent:"space-between"
      },
      blockList:{
        marginLeft:10,
        marginTop:6,
        '&:hover':{
          cursor:"pointer"
        }
      },
      defList:{
        marginRight:10,
        marginTop:6,
        '&:hover':{
          cursor:"pointer"
        }
      },
      tabPayments:{
        textTransform: "capitalize",
      },
      disableTabPay:{
        textTransform: "capitalize",
        color:"#9b9b9b"
      }
    });

class TransferMain extends Component {
   render () {
    const { classes } = this.props;
        return (
            <div className="transfer-main">
              <Grid container className={classes.menuContent}>
                  <Grid item xs={12} sm={12} md={6} lg={6} className={classes.menuSubContent} style={{textDecoration:"none",color:"black"}}>
                      <Link style={{textDecoration: 'none', color: 'black'}} to='/main/bank_operation/transfer/transfer_money'>
                          <ListItem  className={classes.menuListItem} >
                              <ListItemIcon><img src={src1} alt='Получить денежный перевод' style={{width:40,height:40}}/></ListItemIcon>
                              <ListItemText
                                  primary={
                                      <Typography variant="inherit" >
                                          Получить денежный перевод
                                      </Typography>
                                  }/>
                          </ListItem>
                      </Link>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} className={classes.menuSubContent} style={{textDecoration:"none",color:"black"}}>
                      <Link style={{textDecoration: 'none', color: 'black'}}  to='/main/bank_operation/transfer/transfer_list'>
                          <ListItem  className={classes.menuListItem} >
                              <ListItemIcon><img src={src2} alt='Список операций' style={{width:40,height:40}}/></ListItemIcon>
                              <ListItemText
                                  primary={
                                      <Typography variant="inherit" >
                                          Список операций
                                      </Typography>
                                  }/>
                          </ListItem>
                      </Link>
                  </Grid>
              </Grid>
            </div>
          );
  }
}


const mapStateToProps = state => {
  return {
    allBankOperations : state.menuItems.allBankOperations,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles, { withTheme: true })(TransferMain)));