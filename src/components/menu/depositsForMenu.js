import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Translations from "../../translations/translations";


const styles = theme => ({
    root: {
        width: '100%',
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing.unit * 4,
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
});

class SvCards extends React.Component {
    state = {
        activeStep: 0,

    };
    formatCurrency  = (balance) =>{
        let bal =  balance.substring(0, balance.indexOf('.'))
        let bal2 = balance.substring(balance.indexOf('.'))
        let res = '';
        let fin ='';
        let ret = [];
        let i = bal.length
        for(i; i>-3; i-=3 ){
              if(i===-1){
                res+=bal.substr(0, 2)
                  
              }
              else if(i===-2){
                res+=bal.substr(0, 1)
              }
              else
            res+=bal.substr(i, 3)
              
        }
        for(i=0; i<res.length; i+=3){
            ret.push(res.substr(i, 3))
        }
        for(i=ret.length-1; i>=0; i--){
            if(i===0)
            fin+=ret[i];
            else
            fin+=ret[i]+' ' 
          }
        return fin+bal2;
     }
    handleNext = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };

    render() {
        const {activeStep}=this.state;
        const lang=this.props.lang;
        let defaultDeposit=[{
            current_amount: '0.00',
            currency_name:"UZS",
            name:"Названия депозита",
        }]
        let maxSteps=this.props.deposits.depositsJson?this.props.deposits.depositsJson.deposits.length?this.props.deposits.depositsJson.deposits.length:1:1;
        let deposit=this.props.deposits.depositsJson?this.props.deposits.depositsJson.deposits.length?this.props.deposits.depositsJson.deposits:defaultDeposit:defaultDeposit;
        const { classes, theme } = this.props;
        return (
                <Grid container spacing={16}  style={{ margin: "auto" }}>
                    <Grid item xs={12} style={{ padding: 0 }}>
                        <Toolbar >
                            <Typography style={{ padding: 4, marginRight: 10,fontSize: 16 }}>{Translations.Main.deposits[lang]}</Typography>
                            <div>
                            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0} style={{ minWidth: 20 }}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            </Button>
                            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1} style={{ minWidth: 20 }}>
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                            </div>
                        </Toolbar>
                    </Grid>
                    <Grid item xs={12} style={{ padding: 0 }}>
                        <p style={{ paddingLeft: 24, paddingRight: 24, margin: 0, color: "#183784",fontSize: 24,fontWeight: 500,}}>{deposit[activeStep].current_amount} <span style={{fontSize:20,fontWeight:400 }}>{deposit[activeStep].currency_name}</span></p>
                    </Grid>
                    <Grid item xs={12} style={{ padding: 0 }}>
                        <p style={{ paddingLeft: 24, paddingRight: 24, margin:0, fontSize: 12,paddingTop:5, color: "#9b9b9b",fontSize:12 }}>{deposit[activeStep].name}</p>
                    </Grid>
                    <Grid item xs={12} style={{ padding: 0 }}>
                        <p style={{ paddingLeft: 24, paddingRight: 24, margin:0, paddingTop:5,height:24}}></p>
                    </Grid>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        style={{ paddingLeft: 24, paddingRight: 24 ,background: "none",}}
                        className={classes.mobileStepper}
                    />
                </Grid>
        );
    }
}
SvCards.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SvCards);
