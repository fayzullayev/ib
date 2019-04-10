import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Branch from './branches.json';
import Translations from "../../translations/translations";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
// import Button from "@material-ui/core/Button";
// import {Map} from '@material-ui/icons';
// import CustomDialog from "./dialog";


class Branches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            close: true,
            data: {},
            branch: null,
            currentLanguage: this.props.language
        }
    }

    handleClickOpen = (index) => {
        console.log(index);
        const data = Branch.filials.filter((item) => {
            return item.filial_code === index
        });
        console.log(data);
        this.setState({
            open: true,
            data: data
        })
    };

    handleClose = () => {
        this.setState({open: false});
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
        console.log("Branches --------------- ");
        const lan = Translations;

        const {currentLanguage} = this.state;
        const {classes, branches} = this.props;
        let drawBranches = branches.filials.map((data, index) => {
            if (data.filial_type === "F") {
                let src;
                try{
                    src=require('../../../public/assets/branches/' + data.filial_code + '.jpg');
                  }
                  catch(e){
                    src=require('./aab_global.jpg');
                  }
                //const src = require('../../../public/assets/branches/' + data.filial_code + '.jpg'?'../../../public/assets/branches/' + data.filial_code + '.jpg':'../../../public/assets/branches/aab_global.jpg');
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
                                            width: "80%",
                                            height: "300px",
                                            objectFit: "cover"
                                        }}/>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={16}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1">
                                                     {data.name}
                                                </Typography>
                                                <Typography> +998 {data.helpline}</Typography>
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
                                                    {/* Адрес */}
                                                    {lan.Address[currentLanguage]}
                                                    <br/>
                                                    {data.address}
                                                </Typography>
                                                <Typography>
                                                    {lan.phoneNumber[currentLanguage]}
                                                    {/* Контактный телефон: */}
                                                    +998 {data.phone}
                                                </Typography>

                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography color="textSecondary" style={{marginLeft: "8px"}}>
                                                        E-mail:
                                                        info@aab.uz</Typography>
                                                </Grid>
                                                <Grid item xs={6}>

                                                    {/*<div>*/}
                                                    {/*<Button key={data.filial_code}*/}
                                                    {/*style={{*/}
                                                    {/*alignSelf: "flex-end",*/}
                                                    {/*marginTop: "-7px",*/}
                                                    {/*border: "none"*/}
                                                    {/*}} variant="outlined" color="primary"*/}
                                                    {/*onClick={() => {this.handleClickOpen(data.filial_code)}}>*/}
                                                    {/*<Map style={{color: "#183784"}}/>*/}
                                                    {/*<Typography color="textSecondary">*/}
                                                    {/*Покозать на карте*/}
                                                    {/*</Typography>*/}
                                                    {/*</Button>*/}
                                                    {/*</div>*/}
                                                </Grid>
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
                {/*<CustomDialog open={this.state.open} data = {this.state.data[0]} handleClose={this.handleClose}/>*/}
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
Branches.propTypes = {
    classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(Branches)