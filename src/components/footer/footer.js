import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import uz from "./uz.png"
import ru from "./ru.png"
import gb from "./gb.png";
import * as actionTypes from '../../store/actions/Actions';
import Translation from '../../translations/translations.json';
import './footer.css';


const styles = theme => ({

    footer: {
        position: "absolute",
        zIndex: "9999",
        width: "100%",
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.secondary,
    },
    languageIcon: {
        width: "16px",
        height: "16px",
        marginRight: "5px"
    },
    fontSize12: {
        fontSize: "12px",
        marginTop: 8,
        color: "rgba(0, 0, 0, 0.5)"
    }
});


class Footer extends Component {

    languageHandle = (lang)=> {
        this.props.langInfo({
            lang: lang
        })
    };



    render() {
        let lang = this.props.currentLang.lang;
        const {classes} = this.props;
        return (
            <div>
                <Paper className={`${classes.footer} bottom-below`}>
                    <Grid container className={classes.paddingLeft30} style={{padding: "0px 0px 0px 15px"}}>
                        <Grid item xs={6} sm={3} md={3} lg={1} xl={1} >
                            <Button onClick={()=> this.languageHandle("uzl")}>
                                <Avatar alt="Asia Alliance Bank" src={uz} className={classes.languageIcon}/>
                                <Typography>
                                    O'zbek
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={6} sm={3} lg={1} md={3} xl={1} >
                            <Button onClick={()=> this.languageHandle("uzc")}>
                                <Avatar alt="Asia Alliance Bank" src={uz} className={classes.languageIcon}/>
                                <Typography>
                                    Ўзбек
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={6} sm={3} lg={1} md={3} xl={1}>
                            <Button onClick={()=> this.languageHandle("ru")}>
                                <Avatar alt="Asia Alliance Bank" src={ru} className={classes.languageIcon}/>
                                <Typography>
                                    Русский
                                </Typography>
                            </Button>

                        </Grid>
                        <Grid item xs={6} sm={3} md={3} lg={1} xl={1} >
                            <Button onClick={()=> this.languageHandle("en")}>
                                <Avatar alt="Asia Alliance Bank" src={gb} className={classes.languageIcon}/>
                                <Typography>
                                    English
                                </Typography>
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
                            <Typography className={classes.fontSize12}>
                                {Translation.lanCopyright[lang]} {/*2009 – 2018 © АКБ «Asia Alliance Bank»*/}
                            </Typography>

                        </Grid>
                        <Grid item xs={12} sm={8} md={8} lg={5} xl={5} >
                            <Typography className={classes.fontSize12}>
                                {Translation.lanLicense[lang]} {/*Лицензия ЦБ РУз на проведение банковских операций №79 от 21 октября 2017 г.*/}
                            </Typography>

                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentLang: state.setLanguage
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        langInfo: (lang) => dispatch({
            type: actionTypes.currentLanguage,
            lang: lang
        })
    }
};
Footer.propTypes = {
    classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Footer))
















