import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import InnerWaiting from "../spinner-opacity";
import Api from "../../services/api";
import {connect} from 'react-redux';
import Translation from '../../translations/translations.json';
import "../error/error.css"

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
});

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
    },
    succesContainer:{
    height:"auto !important",
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection : "column",
    padding: "36px",
    opacity: 1,
    }
  });

class TemplateDialog extends Component {
  api = new Api();    
    state = {
        newTempName:"",
        spinnerWaiting:false,
        error:"",
        saveTemplate:false
    };
    handleChangeSelect=(e)=>{
        this.setState({
          newTempName:e.target.value,
        });
    }
    handleClose = (state) => {
        if(state)
        {
            if(this.props.saveTemplateBegin && this.state.newTempName===""){
              alert("Введите название для шаблона");
              return;
            }
            else if(this.props.saveTemplateBegin  && this.state.newTempName!==""){
              const reqSaveTemp={
                request:"SAVE_NEW_TEMPLATE",
                message_type:110,
                contract_id:this.props.fullSaveTemplate.contract_id,
                detail_code:this.props.fullSaveTemplate.detail_code,
                name:this.state.newTempName,
                template_type:"D",
                payment_details:this.props.fullSaveTemplate.payment_details
                }
                console.log(reqSaveTemp);
                this.setState({spinnerWaiting:true});
                this.api.SetAjax(reqSaveTemp).then(data=>{
                if (data.result==="0") {
                  this.props.dialog(false,false);
                  setTimeout(()=>{
                    this.setState({spinnerWaiting : false});
                  },1000);
                }
                else
                  {
                      this.setState({
                          error:data.msg,
                          spinnerWaiting : false
                      });
                  }
                console.log(data);
                });
            }
       if(this.props.temp_id!==""){
              const reqDeleteTemplate={
                request:"Deleting template",
                message_type:113,
                temp_id:this.props.temp_id,
                }
                console.log(reqDeleteTemplate);
                this.setState({spinnerWaiting:true});
                this.api.SetAjax(reqDeleteTemplate).then(data=>{
                if (data.result==="0") {
                  this.props.templatesUpdated();
                  this.props.dialog(false,false);
                  setTimeout(()=>{
                    this.setState({spinnerWaiting : false});
                  },1000);
                }
                else
                  {
                      this.setState({
                          error:data.msg,
                          spinnerWaiting : false
                      });
                  }
                console.log(data);
                });
            }
        }
        else
        {
            this.props.dialog(false,false);
          setTimeout(()=>{
                this.setState({
                    error:""
                });
            },1000); 
        }
      };
    render() {
    let lang = this.props.currentLang?this.props.currentLang.language:"ru";
        const { classes } = this.props;
        const {spinnerWaiting,error}=this.state;
        const saveTemplate=this.props.saveTemplateBegin;
        return (
            <MuiThemeProvider theme={theme}>
          <Dialog open={this.props.open} onClose={()=>this.handleClose(false)} aria-labelledby="simple-dialog-title" >
             {spinnerWaiting?<InnerWaiting/>:""}
             <DialogContent style={{maxWidth:"auto"}}>
                <DialogContentText style={{marginTop:45,  textAlign:'center', marginLeft:45, marginRight:45,  color:'black'}}>
                    {error!==""?(<div className = {classes.succesContainer}><div className="swal2-icon swal2-error swal2-animate-error-icon" style={{display: 'flex'}}>
                    <span className="swal2-x-mark">
                        <span className="swal2-x-mark-line-left"></span>
                        <span className="swal2-x-mark-line-right"></span>
                    </span>
                </div>
                <p className="success-text" style={{color:"red"}}>
                    {error}
                </p></div>):!saveTemplate?Translation.Payments.paymentWantDelTemp[lang]:
        
                <FormControl margin="normal" required fullWidth>
                  <TextField
                      required
                      // defaultValue={input.def_value}
                      onChange={this.handleChangeSelect}
                      id="standard-password-input"
                      label={Translation.Payments.paymentNameTemplate[lang]}
                      type="text"
                  />
              </FormControl>
              }
                </DialogContentText>
              </DialogContent>
              <Divider />
              {error!==""?<DialogActions style={{alignContent: 'center'}}>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                margin="auto"
                className={classes.submit}
                onClick={()=>this.handleClose(false)}
                  >
                    {Translation.Payments.paymentDialogCancel[lang]}
              </Button>
              </DialogActions>
              :<DialogActions style={{alignContent: 'center'}}>
              <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      margin="auto"
                      className={classes.submit}
                      onClick={()=>this.handleClose(false)}
                  >
                      {Translation.Payments.paymentDialogCancel[lang]}
              </Button>
              <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      margin="auto"
                      className={classes.submit}
                      onClick={()=>this.handleClose(true)}
                  >
                      {Translation.Payments.paymentContinue[lang]}
              </Button>
            
            </DialogActions>
          }
          </Dialog>
           </MuiThemeProvider>
        );
    }
}
const mapStateToProps = state => {
  return {
      currentLang: state.menuItems
  }
};
export default  connect(mapStateToProps)(withStyles(styles)(TemplateDialog));