import React, { Component } from 'react';
import ConversionMain from "../conversion-main"
import ConversionHistory from "../conversion-history"
import {HashRouter as Router,Route,withRouter} from "react-router-dom"
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GoBack from "../bank_operation/go-back.png";
import {withStyles} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {connect} from "react-redux";
import Translations from "../../translations/translations"


const styles = theme => ({
    goBack: {
        textTransform: "capitalize",
        marginBottom: "10px",
    }
});

class Conversion extends Component {

    handleBack = () => {
        this.props.history.goBack();
    };

    render () {

        const  { classes } = this.props;

         return (
             <Router>
                 <div>
                     <Button className={classes.goBack} onClick={this.handleBack}>
                         <ListItemIcon style={{marginRight: 0}}><img src={GoBack} alt="goBack"/></ListItemIcon>
                         <ListItemText
                             primary={
                                 <Typography variant="inherit">
                                     {Translations.Monitoring.toMain[this.props.language]}
                                 </Typography>
                             }/>
                     </Button>
                     <Route exact path='/main/conversion' component={ConversionMain}/>
                     <Route path='/main/conversion/:id' component={ConversionHistory}/>
                 </div>
            </Router>
         );
      }
}


const mapStateToProps = state => {
    return {
        language: state.menuItems.language,
    };
  };
  const mapDispatchToProps = dispatch => {
    return {};
  };



export default connect(mapStateToProps,mapDispatchToProps)(withRouter(withStyles(styles)(Conversion)));