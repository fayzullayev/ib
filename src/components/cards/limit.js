import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { ArrowBack } from "@material-ui/icons/";
import Toolbar from "@material-ui/core/Toolbar";
import Card from "@material-ui/core/Card";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#25265E'
        },
        secondary: {
            main: '#ffc004'
        }
    },

    typography: { useNextVariants: true }
})

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit
    },
    card: {
        
         minWidth:'100%'
    },
    button: {
        textTransform: "capitalize",
        justify: "right",
        // marginLeft: 5,
        position: "right"
    },
    paper: {
        borderRadius: '15px!important',
        backgroundPosition: 'center',
        // marginLeft: 24,
        width: 220,
        height: 125,
        backgroundSize: 'cover',
        marginTop: 25,
        '&:hover:before': {
            backgroundColor: 'rgba(0, 0, 0, 0.42)'
        }
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "100%",
    },
    submit: {
        marginTop: theme.spacing.unit * 2,
        borderRadius: "23px",
        boxShadow: "4px 5px 9px rgba(255, 192, 4, 0.19);",
        margin: "auto",
        fontSize: "14px",
        padding: "10px 60px",
        marginBottom: 16,
        textTransform: "capitalize",
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        /* Handle */
        overflow: 'hidden',
        scrollButtons: "on"
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    carousel: {
        width: '800px !important ',
    },
    colorSwitchBase: {
       
      },
      colorBar: {},
      colorChecked: {},

});

class Limit extends Component {
    
    state = {
       
        activeIndex :   1,
        nextIndex   :   2, 
        prevIndex   :   0, 
        submit      :   false,
        req         :   null,
        checkedA    :   true,
        checkedB    :   true,
    }
    
    static defaultProps = {
        during: 600,
        color: 'red',
    }

    nextSlideHandler(e) {
        if(e.currentTarget.dataset.direction === 'next'){
            this.setState({prevIndex: this.state.activeIndex})
            this.setState({activeIndex: this.state.nextIndex})
            if((this.state.nextIndex + 1) > 9)
                this.setState({nextIndex: 0})
            else 
                this.setState({nextIndex: this.state.nextIndex+1})
        } else {
            this.setState({nextIndex: this.state.activeIndex})
            this.setState({activeIndex: this.state.prevIndex})
            if((this.state.prevIndex -1) < 0)
                this.setState({prevIndex:9})
            else
                this.setState({prevIndex: this.state.prevIndex-1})
        }
    }
    handleChange =  name => event => {
        this.setState({[name]: event.target.checked})
    }
    submitHandle(){
        console.log(document.getElementById('cardNumber').value)
        console.log(document.getElementById('cardExp').value)
        console.log(document.getElementById('cardName').value)
    
    }
    
    render() {
       const { classes } = this.props
            return (
                <MuiThemeProvider theme={theme}>
                    <Grid>
                            <Toolbar style={{ paddingLeft: 0 ,  minHeight:45 }} >
                                <Grid xs={12}>
                                    <Button className={classes.button} onClick={this.props.toCards}>
                                        <ArrowBack className={classes.extendedIcon} />
                                        Назад
                                    </Button>
                                </Grid>
                            </Toolbar>

                            <Grid justify="space-between" container style={{ paddingTop: 5 }}>
                                <Card className={classes.card}>
                                    <CardContent>
                                    

                                    </CardContent>
                                </Card>
                            </Grid>
                    </Grid>
                </MuiThemeProvider>)
        }
};

Limit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Limit)

class Error extends Component {
    render() {
        return(
            <FormHelperText id="component-error-text" style={{color:'red', marginLeft:20}}>{localStorage.getItem("error")}</FormHelperText>
        )
    }
}


            