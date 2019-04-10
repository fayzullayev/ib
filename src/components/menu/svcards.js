import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Translations from "../../translations/translations";
import {connect} from 'react-redux';
import * as accounting from "accounting";


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
        let defaultCard=[{
            balance: '0.00',
            currency_char:"UZS",
            card_name:"Названия карты",
            card_number:"8600000000000000",
            exp_date:"0000"
        }]
        let maxSteps=this.props.cards.length===0?1:this.props.cards.length;
        let uzcard=this.props.cards.length===0?defaultCard:this.props.cards;
        const { classes, theme } = this.props;
        return (
                <Grid container spacing={16}  style={{ margin: "auto" }}>
                    <Grid item xs={12} style={{ padding: 0 }}>
                        <Toolbar >
                            <Typography style={{ padding: 4, marginRight: 10,fontSize: 16 }}>{Translations.Main.svCards[lang]}</Typography>

                            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0} style={{ minWidth: 20 }}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            </Button>
                            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1} style={{ minWidth: 20 }}>
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        </Toolbar>
                    </Grid>
                    <Grid item xs={12} style={{ padding: 0 }}>
                        <p style={{ paddingLeft: 24, paddingRight: 24, margin: 0, color: "#183784",fontSize: 24,fontWeight: 500,}}>{accounting.formatMoney(uzcard[activeStep].balance,"","2"," ",".")} <span style={{fontSize:20,fontWeight:400 }}>{uzcard[activeStep].currency_char}</span></p>
                    </Grid>
                    <Grid item xs={12} style={{ padding: 0 }}>
                        <p style={{ paddingLeft: 24, paddingRight: 24, margin:0, fontSize: 12,paddingTop:5, color: "#9b9b9b",fontSize:12 }}>{uzcard[activeStep].card_name}</p>
                    </Grid>
                    <Grid item xs={12} style={{ padding: 0 }}>
                        <p style={{ paddingLeft: 24, paddingRight: 24, margin:0, paddingTop:5,}}>{uzcard[activeStep].card_number.slice(0, 4) + ' ' + uzcard[activeStep].card_number.slice(4, 6) + '** **** ' + uzcard[activeStep].card_number.slice(12, 16)} <span style={{fontSize: 12}}></span>{uzcard[activeStep].exp_date.slice(0, 2) + '/' + uzcard[activeStep].exp_date.slice(2, 4)}</p>
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
