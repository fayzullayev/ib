import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Branch from './branches.json';
// import { sr } from 'date-fns/esm/locale';
import Translations from "../../translations/translations";
import PropTypes from 'prop-types';
import {connect} from "react-redux";


class MiniBanks extends Component {
  state = {
    currentLanguage: this.props.language
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
        console.log("MiniBanks --------------- ");
        const { classes, miniBanks } = this.props;
        const lan = Translations;

        const {currentLanguage}=this.state;
        let drawBranches = miniBanks.filials.map(data => {
            if (data.filial_type === "M") {
                let src;
                try{
                    src=require('../../../public/assets/miniBanks/' + data.filial_code + '.jpg');
                  }
                  catch(e){
                    src=require('./aab_global.jpg');
                  }
                // const src = require('../../../public/assets/miniBanks/'+ data.filial_code + '.jpg');
                //const src = require('../../../public/assets/miniBanks/' + data.filial_code + '.jpg'?'../../../public/assets/miniBanks/' + data.filial_code + '.jpg':'../../../public/assets/branches/aab_global.jpg');
                
                return (
                    <Grid item xs={12} md={6} key={data.filial_code + this.iterator++}>
                        <ExpansionPanel style={{
                            borderRadius: 0,
                            boxShadow: "none",
                            border: "1px solid #e3e3e3",
                        }}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <Grid container spacing={16}>
                                    <Grid item xs={12}>
                                        <img className={classes.img} alt="Filial"
                                             src={src} style={{
                                            width:"80%",
                                            height:"300px",
                                            objectFit : "cover"
                                        }}/>
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
                                                {lan.Address[currentLanguage]}
                                                {/* Адрес: */}
                                                <br/>
                                                    {data.address}
                                                </Typography>
                                                <Typography>
                                                {lan.phoneNumber[currentLanguage]}    {/* Контактный телефон: */}
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
    
        });
        return (
            <Grid container>
                {drawBranches}
            </Grid>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.menuItems.language,
    }
};
const mapDispatchToProps = dispatch => {
    return {}
};

MiniBanks.propTypes = {
    classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(MiniBanks)