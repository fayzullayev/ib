import React, { Component } from 'react';
import { connect } from "react-redux";
import {  Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {withRouter,Link} from "react-router-dom";
import "./bank-operation-main.css"

const styles = theme => ({
      menuContent: {
        borderRadius: 6,
        border: "1px solid #e3e3e3",
        alignItems: "center"
      },
      menuSubContent: {
        borderRight: "1px solid #e3e3e3",
        borderBottom: "1px solid #e3e3e3",
        '&:hover':{
          backgroundColor: "rgba(10, 38, 108, 0.03);",
          cursor:"pointer"
        },
          margin : "0 !important"
      },
      menuListItem:{
        '&:hover':{
          backgroundColor:"rgba(10, 38, 108, 0.005);",
          textDecoration:"none",
          fontWeight:500
        }
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

class BankOperationMain extends Component {
  render () {
    const { classes } = this.props;
    const operationTypes=this.props.allBankOperations;
    const operation_content=operationTypes?operationTypes.map((text)=>{
          const src=require('../../../public/assets/bank-operation/'+text.src+'.png');
              return(
                  <Grid item xs={12} sm={12} md={6} lg={6} className={classes.menuSubContent}  key={text.target} style={{textDecoration:"none",color:"black"}}>
                      <Link style={{textDecoration: 'none', color: 'black'}} to={`/main/bank_operation/${text.target.toLowerCase()}`}>
                            <ListItem  className={classes.menuListItem} >
                              <ListItemIcon><img src={src} alt={text.src} style={{width:40,height:40}}/></ListItemIcon>
                              <ListItemText
                                  primary={
                                      <Typography variant="inherit" >
                                          {text.label}
                                      </Typography>
                                  }/>
                            </ListItem>
                      </Link>
                 </Grid>
                );
          }
            ):"";

        return (
            <div className='bank-operation-main-item'>
              <Grid container className={classes.menuContent}>
                {operation_content}
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
export default connect(
  mapStateToProps
)(withRouter(withStyles(styles, { withTheme: true })(BankOperationMain)));