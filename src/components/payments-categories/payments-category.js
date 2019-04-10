import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import {  Grid } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
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
    }
  },
  menuListItem:{
    padding: "15px",
    '&:hover':{
      backgroundColor:"rgba(10, 38, 108, 0.005);",
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

const paymentsCategories=(props)=>{
  const {classes} = props;
  const paymentTypes=props.allPayments;
  return(paymentTypes?paymentTypes.map((text)=>{
    let src;
    try{
      src=require('../../../public/assets/payment-icons/'+text.src+'.png');
    }
    catch(e){
      src=require('./AABIcon.png');
    }
    if(props.definitionList){
        return(<Grid item xs={12} sm={12} md={6} lg={4} className={classes.menuSubContent}  key={text.target} style={{textDecoration:"none",color:"black"}}>
        <ListItem component={Link} to={`/main/payments/categories/${text.target.toLowerCase()}`} className={classes.menuListItem} onClick={()=>props.handleCategoryClick(text.label,text.target)}>
            <ListItemIcon><img src={src} alt={text.src} style={{width:40,height:40}}/></ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant="inherit" style={{color:"black"}}>
                        {text.label}
                    </Typography>
                }/>
        </ListItem>
      </Grid>);
    }
    else{
        return(<Grid item xs={6} sm={6} md={4} lg={3} xl={3} className={classes.menuSubContent} key={text.target} style={{textDecoration:"none",color:"black"}}>
        <Link style={{ textAlign: "center",margin:0, textDecoration:"none",color:"black"}}  to={`/main/payments/categories/${text.target.toLowerCase()}`} onClick={()=>props.handleCategoryClick(text.label,text.target)}>
            <img src={src} alt={text.src} style={{width:40,height:40,display:"block",margin:"auto"}}/><br></br>
                    <p style={{ textAlign: "center",margin:0}}>
                        {text.label}
                    </p>
        </Link>
      </Grid>);
      }
    }
      ):"");
}
const mapStateToProps = state => {
  return {
    allPayments : state.menuItems.allPayments,
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(paymentsCategories));