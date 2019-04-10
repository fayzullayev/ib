import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import Branches from './branches';
import MiniBanks from './miniBanks';
import ATMs from './ATMs';
import Divider from "@material-ui/core/Divider";
import Waiting from "../waiting";
import Api from "../../services/api";
import Translations from "../../translations/translations";
import url from "../../services/url";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GoBack from "../bank_operation/go-back.png";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    menuContent: {
        borderRadius: 6,
        border: "1px solid #e3e3e3",
        alignItems: "center"
    },
    linksParent: {
        padding: "8px"
    },
    branchesLinkSelected: {
        fontSize: "14px",
        fontWeight: 600,
        color: "#000000"
    },
    branchesLink: {
        fontSize: "14px",
        color: "#9B9B9B"
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
        maxWidth: "50%",
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    branchItem: {
        borderRadius: 0
    },
    goBackssss: {
        textTransform: "capitalize",
        marginBottom : "10px",
    }
});

class BranchesAndATMs extends Component {
    api = new Api();
    state = {
        request: "BranchesAndATMs",
        message_type: 44,
        selectedMenu: "Branch",
        branches: null,
        isWaiting: true,
        currentLanguage: this.props.language
    };


    branchHandler = () => {
        this.setState({
            ...this.state,
            selectedMenu: "Branch"
        })
    };
    miniBankHandler = () => {
        this.setState({
            ...this.state,
            selectedMenu: "MiniBank"
        })
    };
    ATMsHandler = () => {
        this.setState({
            ...this.state,
            selectedMenu: "ATM"
        })
    };

    componentWillMount() {
        let request = {
            request: this.state.request,
            message_type: this.state.message_type
        };
        this.api.SetAjax(request).then(data => {
            this.setState({
                ...this.state,
                branches: data,
                isWaiting: false
            });
            console.log(data);
        });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
     
        if (this.props.language !== prevProps.language) {
            this.setState({
                currentLanguage: this.props.language
            })
        }
    }

    handleBack = () => {
        this.props.history.goBack();
    };

    render() {
        if (this.state.isWaiting) {
            return <Waiting/>
        }
        const {classes} = this.props;
        const lan = Translations.Branches;

        const {currentLanguage}=this.state;
        let draw;
        if (this.state.selectedMenu === "Branch") {
            draw = <Branches classes={classes} branches={this.state.branches}/>
        } else if (this.state.selectedMenu === "MiniBank") {
            draw = <MiniBanks classes={classes} miniBanks={this.state.branches}/>
        } else {
            draw = <ATMs classes={classes} ATMS={this.state.branches}/>
        }
        return (<div>
             <Button className={`${classes.goBackssss} goBacksssssss`} onClick={this.handleBack}>
                            <ListItemIcon style={{marginRight: 0}}><img src={GoBack} alt="goBack"/></ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="inherit">
                                        {lan.back[currentLanguage]}
                                    </Typography>
                                }/>
                        </Button>
                <Grid container className={classes.menuContent}>
                    <Grid item>
                        <Button style={{margin: "5px"}}
                            className={this.state.selectedMenu === "Branch" ? classes.branchesLinkSelected : classes.branchesLink}
                            onClick={this.branchHandler}>
                           {lan.branches[currentLanguage]} {/* Отделение банка */}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            className={this.state.selectedMenu === "MiniBank" ? classes.branchesLinkSelected : classes.branchesLink}
                            onClick={this.miniBankHandler}>
                           {lan.miniBanks[currentLanguage]} {/* Мини банки */}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            className={this.state.selectedMenu === "ATM" ? classes.branchesLinkSelected : classes.branchesLink}
                            onClick={this.ATMsHandler}>
                            {lan.ATMs[currentLanguage]}{/* Банкоматы */}
                        </Button>
                    </Grid>

                    <Grid container>
                        <Divider style={{width: "100%"}}/>
                        {draw}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cardInfo: state.cardsInfo,
        language: state.menuItems.language,
        menuItems: state.menuItems
    }
};
const mapDispatchToProps = dispatch => {
    return {}
};

BranchesAndATMs.propTypes = {
    classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BranchesAndATMs))