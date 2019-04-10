import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Monday from './images/Mon.png'
import Tuesday from './images/Tue.png'
import Wednesday from './images/Wed.png'
import Thursday from './images/Thur.png'
import Friday from './images/Fri.png'
import Saturday from './images/Sat.png'
import Sunday from './images/Sun.png'
import Location from './images/map.jpg'
import Translations from "../../translations/translations";
import {connect} from 'react-redux';
import {Avatar} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GoBack from "../bank_operation/go-back.png";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

  
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
 goBack: {
        textTransform: "capitalize",
        marginBottom: "22px",
    },
    h10: {
        fontSize: 12,
        marginLeft: 25,
        marginTop: -35,
        color: 'black',
        fontWeight: 'bold'
    },
    details: {
        marginLeft: 25,
        marginTop: 0,
        fontWeight: 'bold'
    },
    workingDay: {

    },
    boxImgTemplate: {
        marginTop: 15,
        marginLeft: 5,
        zIndex: -999,
        marginBottom: 25,
    },
    Location: {
        width: '90%',
        height: '50%'
    }
});

class bankDetails extends Component {
    constructor(props){
        super(props)    
        this.state={
            currentLanguage: this.props.language
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.cardInfo !== prevProps.cardInfo) {
            this.setState({
                currentLanguage: this.props.language
            })

        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                currentLanguage: this.props.language
            })
        }, 50);
    }
  handleBack = () => {
        this.props.history.goBack();
    };
  
    render() {
        let lan = Translations.Bank_Contacts;
        const {currentLanguage} = this.state
        const { classes } = this.props;
        return (
            <Grid key={123} item xs={'auto'} xl={'auto'} sm={'auto'} mg={'auto'} lg={'auto'} >
 <Button className={`${classes.goBack}`} onClick={this.handleBack}>
                    <ListItemIcon style={{marginRight: 0}}><img src={GoBack} alt="goBack"/></ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="inherit">
                                 {Translations.Monitoring.toMain[this.props.language]}
                            </Typography>
                        }/>
                </Button>
                <Paper spacing={24} xs={4} sm={4} className={classes.paper} id="card_container" style = {{borderRadius : "6px"}}>
                    <Grid container item xs={12} spacing={24} >
                        <Grid item xs={12} md={4} style={{ paddingBottom: 0 }}>
                            <span className={classes.h10}>{lan.address[currentLanguage]}:</span>
                            <p className={classes.details}>{lan.location[currentLanguage]}</p>
                        </Grid>
                        <Grid item xs={12} md={4} style={{ paddingBottom: 0 }}>
                            <span className={classes.h10}>{lan.contact_number[currentLanguage]}:</span>
                            <p className={classes.details}>+998 71 231-60-00</p>
                        </Grid>
                        <Grid item xs={12} md={4} style={{ paddingBottom: 5 }}>
                            <span className={classes.h10}>{lan.fax[currentLanguage]}:</span>
                            <p className={classes.details}>+998 71 289-64-44</p>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container item xs={12} spacing={24}>
                        <Grid item xs={12} md={4} style={{ paddingBottom: 0 }}>
                            <span className={classes.h10}>E-mail:</span>
                            <p className={classes.details}><a href={"mailto:info@aab.uz"}>info@aab.uz</a></p>

                        </Grid>
                        <Grid item xs={12} md={4} style={{ paddingBottom: 0 }}>
                            <span className={classes.h10}>{lan.site[currentLanguage]}:</span>
                            <p className={classes.details}><a href={"http://www.aab.uz"}>http://www.aab.uz</a></p>

                        </Grid>
                        <Grid item xs={12} md={4} style={{ paddingBottom: 5 }}>
                            <span className={classes.h10}>{lan.helpline[currentLanguage]}:</span>
                            <p className={classes.details}>+998 71 231-60-00</p>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid className={classes.workingDays} item xs={12} spacing={12}>
                        <img src={Monday} className={classes.boxImgTemplate} style={{ marginLeft: 20 }} alt={"Mon"} />
                        <img src={Tuesday} className={classes.boxImgTemplate} alt={"Tue"} />
                        <img src={Wednesday} className={classes.boxImgTemplate} alt={"Wed"} />
                        <img src={Thursday} className={classes.boxImgTemplate} alt={"Thur"} />
                        <img src={Friday} className={classes.boxImgTemplate} alt={"Fri"} />
                        <img src={Saturday} className={classes.boxImgTemplate} alt={"Sat"} />
                        <img src={Sunday} className={classes.boxImgTemplate} alt={"Sun"} />
                    </Grid>
                    <Grid item xs={12} style={{ marginRight: 20, marginLeft: 20, marginBottom: 20 }}>
                        <img src={Location} className={classes.Location} alt={"Location"} style={{maxHeight: "500px", maxWidth: "1000px"}} />
                    </Grid>
                    <Grid container item xs={12} spacing={24} style={{ marginBottom: 20 }}>
                        <Grid item xs={12} md={8}>
                            <span className={classes.h10}>{lan.transport[currentLanguage]}:</span>
                            <p className={classes.details} style={{ marginBottom: 5 }}>{lan.bus_stop[currentLanguage]}</p>
                            <p className={classes.details} style={{ marginBottom: 5 }}>{lan.bus[currentLanguage]}: 1, 10, 14, 16, 18, 21, 28, 30, 44, 72, 80, 96, 148, 155 </p>
                            <p className={classes.details} style={{ marginBottom: 5 }}>{lan.route_taxi[currentLanguage]}: 30м, 88м, 95м</p>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <span className={classes.h10}>{lan.social_acc[currentLanguage]}:</span>
                            <Grid container spacing={12} style={{marginLeft:25, marginBottom:5, marginTop:5}}>
                                <Grid item xs={2} >
                                    <a href={'https://t.me/asiaalliancebank'}>
                                            {/*<TwitterIcon size={32} round={true}  />*/}
                                        <Avatar src="assets/telegram.png" style={{height: "30px", width: "30px", marginTop: "5px"}} />
                                    </a>
                                </Grid>
                                <Grid item xs={2}>
                                    <a href={'https://www.facebook.com/AsiaAllianceBank'}>
                                        {/*<FacebookIcon item size={32} round={true} />*/}
                                        <Avatar src="assets/fb.png" tyle={{height: "30px", width: "30px"}}/>
                                    </a>
                                </Grid>
                                <Grid item xs={2}>
                                    <a href={'http://www.instagram.com/asia_alliance_bank'}>
                                        {/*<VKIcon  item size={32} round={true}/>*/}
                                        <Avatar src="assets/insta.png" tyle={{height: "30px", width: "30px"}}/>
                                    </a>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>);

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

bankDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(bankDetails))