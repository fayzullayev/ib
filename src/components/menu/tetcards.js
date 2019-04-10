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
import * as accounting from "accounting";

const styles = theme => ({
    root: {
        maxWidth: 250,
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
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
});

class TetCards extends React.Component {
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
        const lang=this.props.lang;
        let defaultCard=[{
            balance:"0.00",
            currency_char:"USD",
            card_name:"Названия карты",
            card_number:"1234560000000000",
            exp_date:""
        }]
        let maxSteps=this.props.cards.length===0?1:this.props.cards.length;
        let tetcard=this.props.cards
        const { classes, theme } = this.props;
        const {activeStep}=this.state;
        let temp = this.props.cards.length===0?defaultCard[activeStep]:tetcard[activeStep];
        return (
                <Grid container spacing={16} style={{ margin: "auto" }}>
                    <Grid item xs={12} style={{ padding: 0 }}>
                        <Toolbar >
                            <Typography style={{ padding: 4, marginRight: 10,fontSize: 16 }}>{Translations.Main.tetCards[lang]}</Typography>

                            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0} style={{ minWidth: 20 }}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            </Button>
                            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1} style={{ minWidth: 20 }}>
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        </Toolbar>
                    </Grid>
                    <Grid item xs={12} style={{ padding: 0 }}>
                        <p style={{ paddingLeft: 24, paddingRight: 24, margin: 0, color: "#183784",fontSize: 24,fontWeight: 500,}}>{accounting.formatMoney(temp.balance,"","2"," ",".")} <span style={{fontSize:20,fontWeight:400 }}>{temp.currency_char}</span></p>
                    </Grid>
                    <Grid item xs={12} style={{ padding: 0 }}>
                        <p style={{ paddingLeft: 24, paddingRight: 24, margin:0, fontSize: 12,paddingTop:5, color: 'silver' }}>{temp.card_name}</p>
                    </Grid>
                    <Grid item xs={12} style={{ padding: 0 }}>
                        <p style={{ paddingLeft: 24, paddingRight: 24, margin:0, fontSize: 15, paddingTop:5,}}>{temp.card_number.slice(0, 4) + ' ' + temp.card_number.slice(4, 6) + '** **** ' + temp.card_number.slice(12, 16)} {temp.exp_date}</p>
                    </Grid>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        style={{ paddingLeft: 24, paddingRight: 24,background: "none", }}
                        className={classes.mobileStepper}
                    />
                </Grid>
        )
    }
}
TetCards.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TetCards);
