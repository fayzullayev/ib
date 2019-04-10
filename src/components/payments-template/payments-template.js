import React,{Component} from 'react';
import { connect } from "react-redux";
import { Link,Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import {  Grid } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import red from '@material-ui/core/colors/red';
import Translation from '../../translations/translations.json';
const styles = theme => ({
  
  menuSubContent: {
    borderRight: "1px solid #e3e3e3",
    borderBottom: "1px solid #e3e3e3",
    '&:hover':{
      cursor:"pointer"
    }
  },
  menuListItem:{
    color:"black",
    '&:hover':{
      backgroundColor:"rgba(10, 38, 108, 0.005);",
      fontWeight:500
    }
  },
  iconHover: {
    '&:hover': {
      color: red[800],
    },
  },
  deleteInBlock:{
    height:25,
    font:'inherit',
    width:'100%',
    backgroundColor:"rgba(10, 38, 108, 0.005);",
    color:'black',
    textAlign:'center',
    marginTop:20,
    transition:'all 1s',
    paddingTop: 4,
    borderTop: "1px solid #e3e3e3",
    '&:hover': {
      backgroundColor: red[800],
      color:'white',
    },
  }
});

class PaymentsTemplates extends Component{
  state={
    dialogOpen:false,
  }
  handleTemplateDelete=(event,temp_id)=>{
    event.preventDefault();
    event.stopPropagation();
    this.props.dialog(temp_id,true);
  }
  render(){
    let lang = this.props.currentLang?this.props.currentLang.language:"ru";
    if(!this.props.savedTemplates){
      return(<Redirect to="/main/payments/categories"/>);
    }
  else{
    const {classes} = this.props;
  const savedTemplateList=this.props.savedTemplateList.filter(template=>template.detail_code!=="LOAN" && template.detail_code!=="CARD_TO_CARD" && template.detail_code!=="BUDGET_PAYMENT");
  let src;
  return(savedTemplateList?savedTemplateList.map((text)=>{
    try{
      src=require('../../../public/assets/payment-icons/providers/'+text.icon_name);
    }
    catch(e){
      src=require('./AABIcon.png');
    }
    if(this.props.definitionList){
        return(<Grid item xs={12} sm={12} md={6} lg={4} className={classes.menuSubContent}  key={text.temp_id} style={{textDecoration:"none",color:"black"}}>
        <ListItem  className={classes.menuListItem} component={Link} to="/main/payments/templates/paymentForm" onClick={()=>this.props.handleTemplateClick(text,text.name,text.icon_name)}>
            <ListItemIcon><img src={src} alt={text.name} style={{width:40,height:40}}/></ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant="inherit">
                        {text.name}
                    </Typography>
                }/>
          <ListItemIcon style={{}} onClick={(e)=>this.handleTemplateDelete(e,text.temp_id)}>
            <Fab aria-label="Delete" className={classes.fab} style={{width:40,height:40,boxShadow:"none",backgroundColor:"none"}} >
              <DeleteIcon color="disabled" className={classes.iconHover}/>
            </Fab>
          </ListItemIcon>
        </ListItem>
          
      </Grid>);
    }
    else{
        return(<Grid item xs={6} sm={6} md={4} lg={3} xl={3} className={classes.menuSubContent} key={text.temp_id} style={{textDecoration:"none",color:"black",paddingBottom:0,paddingRight:0,paddingLeft:0,paddingTop:15}}>
        <Link style={{ textAlign: "center",margin:0,textDecoration:"none",color:"black"}} to="/main/payments/templates/paymentForm" onClick={()=>this.props.handleTemplateClick(text,text.name,text.icon_name)}>
            <img src={src} alt={text.name} style={{width:40,height:40,display:"block",margin:"auto"}}/>
                    <p style={{ textAlign: "center",margin:0}}>
                        {text.name}
                    </p>
            
        </Link>
        <div className={classes.deleteInBlock} onClick={(e)=>this.handleTemplateDelete(e,text.temp_id)}><span style={{marginTop:5}}>Удалить</span></div>
      </Grid>);
      }
    }
      ):<div>{Translation.Payments.paymentNoTemplate[lang]}</div>);
     }
  }
}
const mapStateToProps = state => {
  return {
    currentLang: state.menuItems
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(PaymentsTemplates));