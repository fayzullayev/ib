import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Dialog from '@material-ui/core/Dialog'
import Api  from '../../services/api'
import { connect } from "react-redux"
import Translations from "../../translations/translations"

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
  button: {
    textTransform: 'capitalize',
    justify: 'right',
    marginLeft: 5,
    position: 'right',
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
  simpleDialog:{
    minHeight: 250,
    minWidth: 350,
  }
});
  

class cardDialogTemplate extends React.Component {
  api = new Api();

  constructor(props){
    super(props)
    this.state = {
        currentLanguage : this.props.language,
    }
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.cardInfo !== prevProps.cardInfo) {
        this.setState({
            currentLanguage: this.props.language
        })

    }
  }
  
  componentWillMount(){
    setTimeout(() => {
      this.setState({
          currentLanguage: this.props.language
      })
     }, 50);
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  
  handleListItemClick = value => {
    this.props.onClose(value);
  };

  handleDelete=()=>{
   this.props.menuOption('delete')
   this.props.ConfirmDelete()
  };
  //Should make it auto updateble
  handleBlock=()=>{ 
    this.props.menuOption('block')
    this.props.ConfirmBlock()
    this.handleClose() 
  }
  handleMakeDefault=()=>{
  this.props.menuOption('default')
  this.props.ConfirmDefault()  
  this.handleClose() 
  }
    render() {
      const { selectedValue, ...other } = this.props;
      const { classes } = this.props;
      const { currentLanguage } = this.state
      let lan = Translations.Cards;
    
      
      if(this.props.delete){
        return (
          <MuiThemeProvider theme={theme}>
          <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} className={classes.simpleDialog}>
             <DialogContent style={{maxWidth:350}}>
                <DialogContentText style={{marginTop:45,  textAlign:'center', marginLeft:45, marginRight:45,  color:'black'}}>
                {lan.delete_proposal[currentLanguage]}
                </DialogContentText>
              </DialogContent>
              <Divider />
              <DialogActions style={{alignContent: 'center'}}>
              <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      margin="auto"
                      className={classes.submit}
                      onClick={this.props.onClose}
                  >
                       {lan.no[currentLanguage]}
              </Button>
              <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      margin="auto"
                      className={classes.submit}
                      onClick={this.handleDelete}
                  >
                       {lan.yes[currentLanguage]}
              </Button>
            
            </DialogActions>
          </Dialog>
           </MuiThemeProvider>
        );
      
      } 
      else if(this.props.block){
        return (
          <MuiThemeProvider theme={theme}>
          <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
             <DialogContent style={{maxWidth:350}}>
                <DialogContentText style={{marginTop:45,  textAlign:'center', marginLeft:45, marginRight:45,  color:'black'}}>
                {lan.block_proposal[currentLanguage]}
                </DialogContentText>
              </DialogContent>
              <Divider />
              <DialogActions style={{alignContent: 'center'}}>
              <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      margin="auto"
                      className={classes.submit}
                      onClick={this.props.onClose}
                  >
                     {lan.no[currentLanguage]}
              </Button>
              <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      margin="auto"
                      className={classes.submit}
                      onClick={this.handleBlock}
                  >
                      {lan.yes[currentLanguage]}
              </Button>
            
            </DialogActions>
          </Dialog>
           </MuiThemeProvider>
        );
      
      }
      else if(this.props.mkdefault){
        return (
          <MuiThemeProvider theme={theme}>
          <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
             <DialogContent style={{maxWidth:350}}>
                <DialogContentText style={{marginTop:45,  textAlign:'center', marginLeft:45, marginRight:45,  color:'black'}}>
                {lan.default_proposal[currentLanguage]} 
                </DialogContentText>
              </DialogContent>
              <Divider />
              <DialogActions style={{alignContent: 'center'}}>
              <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      margin="auto"
                      className={classes.submit}
                      onClick={this.props.onClose}
                  >
                      {lan.no[currentLanguage]} 
              </Button>
              <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      margin="auto"
                      className={classes.submit}
                      onClick={this.handleMakeDefault}
                  >
                      {lan.yes[currentLanguage]} 
              </Button>
            
            </DialogActions>
          </Dialog>
           </MuiThemeProvider>
        );
      
      } 
      else{
        return ('')
      }
    }
   
       
  }
  
  cardDialogTemplate.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
  };

  const mapStateToProps = state => {
    return {
        language: state.menuItems.language,
    };
  };
  const mapDispatchToProps = dispatch => {
    return {};
  };

  const DialogTemplate =  connect( mapStateToProps, mapDispatchToProps )(withStyles(styles)(cardDialogTemplate))
  export default  connect( mapStateToProps, mapDispatchToProps)(withStyles(styles)(DialogTemplate))