import React,{Component} from 'react';
import { connect } from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import {  Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';
// import CardsSelection from '../cards/cardForPayment'
import Translation from '../../translations/translations.json';

const styles = theme => ({
  submit:theme.submit,
});

class PaymentsCheck extends Component {
  render(){
    let lang = this.props.currentLang?this.props.currentLang.language:"ru";;
    const {classes}=this.props;
    const checkContent=this.props.inputBlock;
    const card_options=this.props.card_options;
    return(
      <Grid container spacing={32}  style={{margin:0,marginTop:20}}>
        {/* <CardsSelection cards={this.props.cardInfo.allCards}/> */}
        {card_options}
        <Grid item xs={12}  style={{width:"auto",padding:10,backgroundColor:"#F3F4F8",borderRadius:10}}>
          <div style={{margin:5,padding:5}}>
            <p style={{fontWeight:"bold"}}>{Translation.Payments.paymentChequeforPayment[lang]}</p>
            <div style={{display:'flex',width:"100%",alignContent:"center",margin:"auto"}}>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",marginRight:"2%",display:"inline-block"}}></div>
              <div style={{width:"3%",border:"1px solid #C2C2C5",display:"inline-block"}}></div>
            </div>
          </div>
          <div style={{margin:5,padding:5,}}>
          <form style={{maxHeight:400,overflowY:"auto"}} >
          {checkContent}
          </form>
          </div>
        </Grid>
        <Grid container justify="center" alignItems="center">
            <Button
                onClick={this.props.onSubmit}
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.submit}
              style={{marginTop:15}}
              >
              {Translation.Payments.paymentPay[lang]}
            </Button>
        </Grid>
      </Grid>);
  }
}
const mapStateToProps = state => {
  return {
    allPayments : state.menuItems.allPayments,
    cardInfo: state.cardsInfo,
    currentLang: state.menuItems
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(PaymentsCheck));