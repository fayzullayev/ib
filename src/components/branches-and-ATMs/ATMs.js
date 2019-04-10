import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Translations from "../../translations/translations";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

class ATMs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ATMsType: "UZ",
            currentLanguage: this.props.language
        }
    }

    uzHandler = () => {
        this.setState({
            ...this.state,
            ATMsType: "UZ"
        })
    };
    foregnHandler = () => {
        this.setState({
            ...this.state,
            ATMsType: "Foregn"
        })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {
            this.setState({
                currentLanguage: this.props.language
            })
        }
    }
    iterator = 0;

    render() {
        console.log("Atms --------------- ");
        const {classes, ATMS} = this.props;
        const lan = Translations;

        const {currentLanguage} = this.state;
        let drawBranches = ATMS.filials.map(data => {
            if (this.state.ATMsType === "UZ") {
                if (data.filial_type === "E") {
                    const src = require('./atm_uzcard.png');
                    return (
                        <Grid item xs={12} md={6} key={data.filial_code + this.iterator++}>
                            <ExpansionPanel style={{
                                borderRadius: 0,
                                boxShadow: "none",
                                border: "1px solid #e3e3e3",
                            }}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Grid container spacing={16}>
                                        <Grid item>
                                            <img className={classes.img} alt="complex"
                                                 style={{
                                                     width: "100px",
                                                     height: "110px"
                                                 }}
                                                 src={src}/>
                                        </Grid>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={16}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle1">
                                                        {data.name}
                                                    </Typography>
                                                    <Typography>+998 {data.helpline}</Typography>
                                                    {/*<Typography color="textSecondary">1,2 km</Typography>*/}
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{background: "#F1F2F4"}}>
                                    <Grid container spacing={16}>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={16}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle1">
                                                    {lan.Address[currentLanguage]}<br/>
                                                        {data.address}
                                                    </Typography>
                                                    <Typography>
                                                    {lan.phoneNumber[currentLanguage]} +998 {data.phone}
                                                    </Typography>

                                                </Grid>
                                                <Grid item>
                                                    <Typography color="textSecondary">
                                                        E-mail:
                                                        info@aab.uz</Typography>
                                                    {/*<Typography color="textSecondary">*/}
                                                    {/*Покозать на карте*/}
                                                    {/*</Typography>*/}

                                                </Grid>
                                            </Grid>

                                        </Grid>

                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                    )
                }
            } else {
                if (data.filial_type === "B") {
                    const src = require('./atm_visa.png');
                    return (
                        <Grid item xs={12} md={6} key={data.filial_code + this.iterator++}>
                            <ExpansionPanel style={{
                                borderRadius: 0,
                                boxShadow: "none",
                                border: "1px solid #e3e3e3",
                            }}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Grid container spacing={16}>
                                        <Grid item>
                                            <img className={classes.img} alt="complex"
                                                 style={{
                                                     width: "100px",
                                                     height: "110px"
                                                 }}
                                                 src={src}/>
                                        </Grid>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={16}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle1">
                                                        {data.name}
                                                    </Typography>
                                                    <Typography>+998 {data.helpline}</Typography>
                                                    {/*<Typography color="textSecondary">1,2 km</Typography>*/}
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{background: "#F1F2F4"}}>
                                    <Grid container spacing={16}>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={16}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle1">
                                                        {lan.Address[currentLanguage]}{/* Адрес */}
                                                        <br/>
                                                        {data.address}
                                                    </Typography>
                                                    <Typography>
                                                        {lan.phoneNumber[currentLanguage]} {/* Контактный телефон:  */}
                                                        +998 {data.phone}
                                                    </Typography>

                                                </Grid>
                                                <Grid item>
                                                    <Typography color="textSecondary">
                                                        E-mail:
                                                        info@aab.uz</Typography>
                                                    {/*<Typography color="textSecondary">*/}
                                                    {/*Покозать на карте*/}
                                                    {/*</Typography>*/}

                                                </Grid>
                                            </Grid>

                                        </Grid>

                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                    )
                }
            }


        });

        return (
            <div>

                <Grid container>

                    <Grid container spacing={16}>
                        <Grid item>
                            <Button
                                style={{margin: "5px",marginLeft: "12px"}}
                                className={this.state.ATMsType === "UZ" ? classes.branchesLinkSelected : classes.branchesLink}
                                onClick={this.uzHandler}>
                                {lan.sum[currentLanguage]} {/*Сумовые*/}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                style={{margin: "5px"}}
                                className={this.state.ATMsType === "Foregn" ? classes.branchesLinkSelected : classes.branchesLink}
                                onClick={this.foregnHandler}>
                                {lan.foregn[currentLanguage]}{/*Валютные*/}
                            </Button>
                        </Grid>
                    </Grid>

                    {drawBranches}
                </Grid>
            </div>

        )
    };
}

const mapStateToProps = state => {
    return {
        language: state.menuItems.language,
    }
};
const mapDispatchToProps = dispatch => {
    return {}
};
ATMs.propTypes = {
    classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(ATMs)
