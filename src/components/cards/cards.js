import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AddRounded } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import AllCards from './allCards'
import AddNewCard from './AddNewCard'
import CardTemplate from './cardTemplate'
import DialogTemplate from './cardDialogTemplate'
import Limit from './limit'
import Success from '../success'
import Api from '../../services/api'
import { connect } from "react-redux"
import Translations from "../../translations/translations"
import * as actionTypes from "../../store/actions/Actions"
import Waiting from '../waiting/index'
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import GoBack from "../bank_operation/go-back.png"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import CleanLocalStorage from '../main/cleanLS'
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  card: {
    height: '85vh',
    overflowY: 'auto'
  },
  button: {
    textTransform: 'capitalize',
    justify: 'right',
    marginLeft: 5,
    position: 'right',
    marginBottom : "10px",
  },
  fab: {
    margin: theme.spacing.unit,
    marginLeft: 165,
    marginTop: 15,
    backgroundColor: 'white',
  },
  cardContainer: {
    width: '100%',
    heigth: 250,
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '5px',
    padding:25,
  }
});


class Cards extends Component {
  api = new Api();
  constructor(props) {
    super(props)
    this.state = {
      toAddNewCard: false,
      limit: false,
      detailedInfo: false,
      setting: false,
      block: false,
      mkdefault: false,
      delete: false,
      submit: false,
      success: false,
      open: false,
      doesHaveTetCards: true,
      response: "",
      currentLanguage: this.props.language,
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.cardInfo !== prevProps.cardInfo) {
      this.setState({
        currentLanguage: this.props.language,
        response:  this.props.cardInfo
      })

    }
  }
  componentWillMount() {
    setTimeout(() => {
        this.setState({
        currentLanguage: this.props.language,
        response: this.props.cardInfo
      })
    }, 50);
  }

  redirectToAdd = () => {
    this.setState({ toAddNewCard: true })
  }
  redirectToLimit = () => {
    this.setState({ limit: true })
  }
  backToCards = () => {
    this.setState({
      toAddNewCard: false,
      success: false,
      detailedInfo: false,
      setting: false,
      block: false,
      mkdefault: false,
      delete: false,
      waiting: false,
    })
  }
  menuOptionHandler = (option) => {
    if (option === 'detailedInfo') {
      this.setState({
        detailedInfo: true,
        setting: false,
        block: false,
        mkdefault: false,
        delete: false
      })
    }
    else if (option === 'settings') {
      this.setState({
        setting: true,
        detailedInfo: false,
        block: false,
        mkdefault: false,
        delete: false
      })
    }
    else if (option === 'block') {
      this.setState({
        setting: false,
        detailedInfo: false,
        block: true,
        mkdefault: false,
        delete: false
      })
    }
    else if (option === 'default') {
      this.setState({
        setting: false,
        detailedInfo: false,
        block: false,
        mkdefault: true,
        delete: false
      })
    }
    else if (option === 'delete') {
      this.setState({
        setting: false,
        detailedInfo: false,
        block: false,
        mkdefault: false,
        delete: true
      })
    }
    else
      console.log('There is no such option !!! Please try again')
  }
  //Dynamic Card Delete function
  handleCardDelete = () => {
    this.setState({ waiting: true })

    const req = {
      "request": "CARDS",
      "card_number": localStorage.getItem("card_num"),
      "reason": "any default reason",
      "message_type": 6,
    }

    this.api.SetAjax(req).then(res => {
      if (res.result === '0') {
        this.setState({ delete: false })
        const req1 = {
          "request": "CARDS",
          "message_type": 1
        }
        this.api.SetAjax(req1).then(res1 => {
          if (res1.result === '0') {
            this.setState({ waiting: false, success: true })
            if (res1 !== "") {
              this.props.cardInfoNew({
                allCards: res1,
              });
            }
          }
        })
      }
    })

  }
  handleCardBlock = () =>{
      const req = {
        'request': 'CARDS',
        'card_number': localStorage.getItem("card_num"),
        'reason': "any default reason",
        'message_type': 5,
      };
      this.api.SetAjax(req).then(res => {
        console.log(res)
        if (res.result === '0') {
          this.handleClose()
          this.setState({ waiting: true })
          const req1 = {
             "request": "CARDS",
             "message_type": 1
          }
          this.api.SetAjax(req1).then(res1 => {
            if (res1.result === '0') {
               this.setState({ waiting: false, success: true })
            if (res1 !== "") {
              this.props.cardInfoNew({
                allCards: res1,
              });
            }
          }
    })
        }
        else {
           alert(res.msg)

        }
      })
  }
  handleCardDefault = () =>{
    this.setState({ waiting: true })
    const req = {
      "is_default":"Y",
      "request": "edit_details",
      'card_name':localStorage.getItem("card_name"),
      'image_name':localStorage.getItem('image_name'),
      'card_number': localStorage.getItem("card_num"),
      'reason': "any default reason",
      'message_type': 57,
    }
    this.api.SetAjax(req).then(res => {
      console.log(res)
      if (res.result === '0') {
        this.setState({ setting: false, success: false })

        const req1 = {
          "request": "CARDS",
          "message_type": 1
        }

        this.api.SetAjax(req1).then(res1 => {
          if (res1.result === '0') {
            this.setState({ waiting: false, success: true })
            if (res1 !== "") {
              this.props.cardInfoNew({
                allCards: res1,
              });
            }
          }
        })
      }
      else {
        alert(res.msg)
        this.setState({waiting: false})
      }
        
    })
  }
  handleCardAddition = () => {
    this.setState({ toAddNewCard: false })
  }
  handleDialogClick = () => {
    this.setState({ open: !this.state.open })
  }
  AddNewCard = (e) => {
    this.setState({ submit: true })
    console.log(e)
  }
  handleBack = () => {
    this.props.history.goBack();
    CleanLocalStorage() //Clean Local Storage from unnecessary items
  };

  handleCardsSetting = () => {
    this.setState({ waiting: true })
    const req = {
      "card_name": document.getElementById('cardNameInput').value,
      "image_name": document.getElementById('cardImage').name,
      "request": "edit_details",
      "message_type": 57,
      "card_number": localStorage.getItem('card_num'),
      "is_default": "N",
    }

    this.api.SetAjax(req).then(res => {
      console.log(res)
      if (res.result === '0') {
        this.setState({ setting: false, success: false })

        const req1 = {
          "request": "CARDS",
          "message_type": 1
        }

        this.api.SetAjax(req1).then(res1 => {
          if (res1.result === '0') {
            this.setState({ waiting: false, success: true })
            if (res1 !== "") {
              this.props.cardInfoNew({
                allCards: res1,
              });
            }
          }
        })
      }
    })
  }

  render() {
    const { classes } = this.props
    const { currentLanguage } = this.state
    let lan = Translations.Cards;
    
    if (this.state.success) {
      return (<Success toCards={this.backToCards} />)
    }
    else if (this.state.waiting) {
      return (<Waiting />)
    }
    else if (this.state.setting) {
      return (<CardTemplate state={'settings'} toCards={this.backToCards} save={this.handleCardsSetting} />)
    }
    else if (this.state.toAddNewCard) {
      return (<AddNewCard toCards={this.backToCards} submit={this.AddNewCard} additionComplete={this.handleCardAddition} state={this.state.toAddNewCard} />)
    }
    else if (this.state.limit) {
      return (<Limit toCards={this.backToCards} submit={this.AddNewCard} state={this.state.toAddNewCard} />)
    }
    else{
      return (
        <div id='container'>
        <Button className={classes.button} onClick={this.handleBack}>
        <ListItemIcon style={{ marginRight: 0 }}><img src={GoBack} alt="goBack" /></ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="inherit">
              {lan.back[currentLanguage]}
            </Typography>
          } />
        </Button>
        <Grid style={{ padding: 0, margin: 0, marginBottom:10}} className={classes.cardContainer} >
          <Toolbar style={{ minHeight: 40 }}>
            <Grid justify="space-between" container>
              <p style={{ marginTop: '0px', paddingTop: '6px', marginBottom: '0px', paddingBottom: '6px' }}>{lan.sumCards[currentLanguage]}</p>
              <span>
                {/* <Button className={classes.button}  onClick={this.redirectToLimit} >Управление лимитами</Button> */}
                <Button className={classes.button} style={{margin:0}} onClick={this.redirectToAdd}><AddRounded className={classes.extendedIcon} color="primary" />{lan.addCard[currentLanguage]}</Button>
              </span>
            </Grid>
          </Toolbar>
          <Divider />
          <br />
          <Grid container style={{paddingRight:24}}>
            <AllCards menuOption={this.menuOptionHandler} type={'SV'} dialog={this.handleDialogClick} response={this.props.cardInfo ? this.props.cardInfo.allCards : ""} />
          </Grid>

          {/* Dialog Template */}
          <DialogTemplate
            open={this.state.open}
            onClose={this.handleDialogClick}
            delete={this.state.delete}
            mkdefault={this.state.mkdefault}
            block={this.state.block}
            menuOption={this.menuOptionHandler}
            ConfirmDelete={this.handleCardDelete}
            ConfirmBlock={this.handleCardBlock}
            ConfirmDefault={this.handleCardDefault}
          />
        {(localStorage.getItem('hasVal')==='&rts#@Wfrs') ? (
            <div>
              <Toolbar style={{ minHeight: 40, paddingTop: 15 }}>
              <Grid justify="space-between" container>
                   <p style={{ marginTop: '0px', marginBottom: '0px', paddingBottom: '6px', }}>{lan.TetCards[currentLanguage]}</p>
                </Grid>
              </Toolbar>
              <Divider />
            </div>
      ) : (<p></p>)  }
          <br />
          <Grid container style={{marginBottom:15, paddingRight:24}}>
            <AllCards menuOption={this.menuOptionHandler} type={'TET'} dialog={this.handleDialogClick} response={this.props.cardInfo ? this.props.cardInfo.allCards : ""} />
          </Grid>

        </Grid>
        </div>
      );
    }
      

  }
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    cardInfo: state.cardsInfo,
    language: state.menuItems.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cardInfoNew: info =>
      dispatch({
        type: actionTypes.cardInformation,
        info: info
      })
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Cards));