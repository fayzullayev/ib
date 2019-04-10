  import React, { Component } from 'react'
  import PropTypes from 'prop-types'
  import Paper from '@material-ui/core/Paper'
  import Fab from '@material-ui/core/Fab'
  import { withStyles } from '@material-ui/core/styles'
  import settingsIcon from './images/Gear_Icon.png'
  import background from './images/background.png'
  import uzcard from './images/uzcard_logo.png'
  import Menu from '@material-ui/core/Menu'
  import MenuItem from '@material-ui/core/MenuItem'
  import delegate from 'es6-delegate'
  import Grid from '@material-ui/core/Grid'
  import visa from './images/visa.png'
  import { connect } from "react-redux"
  import {Link} from "react-router-dom"
  import Translations from "../../translations/translations"
  import './allcards.css'
  import * as accounting from "accounting";

  const styles = theme => ({
    tettype: {
      position: 'absolute',
      marginLeft: 65,
      userSelect: 'none',
      marginRight: 20,
      width: 50,
      height: 25,
      marginBottom:30,
    },
    root: {
      flexGrow: 1,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
    button: {
      textTransform: 'capitalize',
      justify: 'right',
      marginLeft: 5,
      position: 'right',
    },
    fab: {
      margin: theme.spacing.unit,
      marginTop: 15,
      marginRight: 15,
      backgroundColor: 'white',
    },
    paper: {
      borderRadius: '15px!important',
      backgroundImage: `url(${background})`,
      // backgroundColor: 'yellow',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      marginLeft: 24,
      marginTop: 25,
      minHeight: 185,
      boxShadow: 2,
      minWidth: 350,
      backgroundColor: 'rgba(0, 0, 0, 0.42)'
      
    },
    settingIcon: {
      position: 'absolute',
      width: 25,
      marginBottom: 3,
      height: 25,
      fill: 'blue',
    },
    banktext: {
      marginLeft: 15,
      marginTop: 15,
      height: 22,
      userSelect: 'none'
    },
    sum: {
      fontSize: 25,
      userSelect: 'none',
      marginTop: 0,
      color: 'white',
      marginLeft: 15,
      marginBottom: 15,
    },
    cardholder: {
      fontSize: 15,
      marginTop: 0,
      color: 'white',
      marginLeft: 15,
      userSelect: 'none',
      marginBottom: 5,
    },
    cardtype: {
      marginLeft: 60,
      userSelect: 'none',
    },
    carddeadline: {
      fontSize: 15,
      marginTop: 0,
      color: 'white',
      userSelect: 'none',
      marginLeft: 30,
      marginBottom: 5,
    }
  });

  class AllCards extends Component {
    constructor(props){
      super(props)
      this.state = {
        anchorEl        : null,
        info            : false,
        redirect        : false,
        data            : this.props.cardInfo,
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
   

    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
      this.setState({ anchorEl: null });
    };
    handleDetlization = () => {
      this.setState({ anchorEl: null });
      this.setState({ info    : true });
      this.props.menuOption('detailedInfo')
    };
    cardExpiry= (exp_date) =>{
      let mm;
      if(exp_date.slice(0, 3)==='JAN'){
          mm = '01/'
      }
      else if(exp_date.slice(0, 3)==='FEB'){
        mm = '02/'
      }
      else if(exp_date.slice(0, 3)==='MAR'){
        mm = '03/'
      }
      else if(exp_date.slice(0, 3)==='APR'){
        mm = '04/'
      }
      else if(exp_date.slice(0, 3)==='MAY'){
        mm = '05/'
      }
      else if(exp_date.slice(0, 3)==='JUN'){
        mm = '06/'
      }
      else if(exp_date.slice(0, 3)==='JUL'){
        mm = '07/'
      }
      else if(exp_date.slice(0, 3)==='AUG'){
        mm = '08/'
      }
      else if(exp_date.slice(0, 3)==='SEP'){
        mm = '09/'
      }
      else if(exp_date.slice(0, 3)==='OCT'){
        mm = '10/'
      }
      else if(exp_date.slice(0, 3)==='NOV'){
        mm = '11/'
      }
      else if(exp_date.slice(0, 3)==='DEC'){
        mm = '12/'
      }
      else 
        return exp_date;
      
      return mm + exp_date.slice(4)
    }
    handleDelete = () => {
      this.setState({ anchorEl: null });
      this.props.menuOption('delete')
      this.props.dialog()
    }
    
    handleBlock = () => {
      this.setState({ anchorEl: null });
      this.props.menuOption('block')
      this.props.dialog()
    }
    handleMd = () =>{
      this.setState({ anchorEl: null });
      this.props.menuOption('default')
      this.props.dialog()
    }
    handleSettings = () =>{
      this.setState({ anchorEl: null });
      this.props.menuOption('settings')
      this.props.dialog()
    }
    formatCurrency  = (balance) =>{
      balance=balance.toString();
      
      let bal;
      if(balance.substring(0, balance.indexOf('.')))
      {
          bal =  balance.substring(0, balance.indexOf('.'))
          
      }
      else{
          bal =  balance
      } 

      let bal2 = balance.substring(balance.indexOf('.'))
      let res = '';
      let fin ='';
      let ret = [];
      let i = bal.length
      for(i; i>-3; i-=3 ){
            if(i===-1){
              res+=bal.substr(0, 2)
                
            }
            else if(i===-2){
              res+=bal.substr(0, 1)
            }
            else
          res+=bal.substr(i, 3)
            
      }
      for(i=0; i<res.length; i+=3){
          ret.push(res.substr(i, 3))
      }
      for(i=ret.length-1; i>=0; i--){
          if(i===0)
          fin+=ret[i];
          else
          fin+=ret[i]+' ' 
        }
      return fin+bal2;
   }
    bankNameImage = (bankName) =>{
      if(bankName ==='ASIA ALLIANCE BANK АТ БАНКИ'){
        return require("./images/aab.png")
      }
      else if(bankName ==='ТУРОНБАНК АТ БАНКИНИНГ'){
          return require("./images/Turon_logo.png")
      }
      else if(bankName ==='ТИФ МИЛЛИЙ БАНКИ'){
          return require("./images/mb_logo.png")
      }
      else if(bankName ==='САНОАТКУРИЛИШБАНКИ'){
          return require("./images/uzpsb_logo.png")
      }
      else if(bankName ==='АГРОБАНК АТБ'){
          return require("./images/agrobank_logo.png")
      }
      else if(bankName ==='МИКРОКРЕДИТБАНК АТБ'){
          return require("./images/microcreditbank_logo.png")
      }
      else if(bankName ==='АТ ХАЛК БАНКИ'){
          return require("./images/xb_logo.png")
      }
      else if(bankName ==='ЧЕТ ЭЛ КАПИТАЛИ ИШТИРОКИДАГИ "САВДОГАР" АТ БАНКИ'){
          return require("./images/kapitalbank_logo.png")
      }
      else if(bankName ==='АТБ "КИШЛОК КУРИЛИШ БАНК"'){
          return require("./images/qqb_logo.png")
      }
      else if(bankName ==='ЧЕТ ЭЛ КАПИТАЛИ ИШТИРОКИДАГИ "HAMKORBANK" АТ БАНКИ'){
          return require("./images/hamkorbank_logo.png")
      }
      else if(bankName ==='АСАКА АТ БАНКИ'){
          return require("./images/asakabank_logo.png")
      }
      else if(bankName ==='ИПАК ЙУЛИ АИТ БАНКИНИНГ'){
          return require("./images/ipakyuli_logo.png")
      }
      else if(bankName ==='ТРАСТБАНК ХА БАНКИНИНГ'){
          return require("./images/Trustbank_logo.png")
      }
      else if(bankName ==='АТ "АЛОКАБАНК"'){
          return require("./images/aloqabank_logo.png")
      }
      else if(bankName ==='ИПОТЕКА-БАНК АТИБ'){
          return require("./images/ipotekabank_logo.png")
      }
      else if(bankName ==='КДБ БАНК УЗБЕКИСТОН АЖ'){
          return require("./images/kdb_logo.png")
      }
      else if(bankName ==='ТУРКИСТОН ХАТ БАНКИ'){
          return require("./images/turkiston_logo.png")
      }
      else if(bankName ==='ХАТ БАНКИ "УНИВЕРСАЛ БАНК"'){
          return require("./images/universalbank_logo.png")
      }
      else if(bankName ==='КАПИТАЛБАНК АТ БАНКИНИНГ '){
          return require("./images/kapitalbank_logo.png")
      }
      else if(bankName ==='ДАВР-БАНК ХАТ БАНКИНИНГ'){
          return require("./images/davrbank_logo.png")
      }
      else if(bankName ==='INVEST FINANCE BANK АТ БАНКИ'){
          return require("./images/infinbank_logo.png")
      }
      else if(bankName ==='ОРИЕНТ ФИНАНС ХАТБ'){
          return require("./images/ofb_logo.png")
      }
      else
        return require("./images/aab.png")
    }
    backgroundImage = (image) =>{
      if(image==='card1')
        return {backgroundImage: `url(${require("./images/card1.png")})`}
      else if(image==='card2')
        return {backgroundImage: `url(${require("./images/card2.png")})`}
      else if(image==='card3')
        return {backgroundImage: `url(${require("./images/card3.png")})`}
      else if(image==='card4')
        return {backgroundImage: `url(${require("./images/card4.png")})`}
      else if(image==='card5')
        return {backgroundImage: `url(${require("./images/card5.png")})`}
      else if(image==='card6')
        return {backgroundImage: `url(${require("./images/card6.png")})`}
      else if(image==='card7')
        return {backgroundImage: `url(${require("./images/card7.png")})`}
      else if(image==='card8')
        return {backgroundImage: `url(${require("./images/card8.png")})`}
      else if(image==='card9')
        return {backgroundImage: `url(${require("./images/card9.png")})`}
      else if(image==='card10')
        return {backgroundImage: `url(${require("./images/card10.png")})`}
      else
        return {backgroundImage: `url(${require("./images/card1.png")})`}
    }
    formatCardName = (cardname) =>{
      let arrname = cardname.split(" ")
      if(arrname.length >  2){
        arrname =  arrname.slice(0, 2)
        arrname[0] = arrname[0].concat(' ')
        arrname = arrname.concat(' ...')
        return arrname
      }
      else {
        return cardname
      }
    }

    render() {
      const { classes }   = this.props;
      const { anchorEl, currentLanguage }  = this.state;
      let lan = Translations.Cards;
      
      if(!this.props.response){
        return ("");
      }
      delegate('mouseenter, mouseleave', '#card', (e, ele) => {
        localStorage.setItem('card_num', ele.childNodes[2].childNodes[0].getAttribute('name')) //card number
        localStorage.setItem('card_name', ele.childNodes[1].childNodes[1].getAttribute('name')) //card name 
        localStorage.setItem('image_name', ele.childNodes[1].childNodes[2].getAttribute('name')) //image name 
        localStorage.setItem('balance', ele.childNodes[1].childNodes[0].getAttribute('name')) //card balance 
        localStorage.setItem('card_exp', ele.childNodes[2].childNodes[1].getAttribute('name')) //card expiry 
        localStorage.setItem('bank_name', ele.childNodes[1].childNodes[3].getAttribute('name')) //bank name 
      })

      if(this.props.type==='SV'){
        const UzCards = this.props.response.card_list.filter(card => { //Sorts all Uzcards in one array 
          return (card.card_type === 'SV' || card.card_type==='GL')
        })/* + card.image_name + */
        const cardElements = UzCards.map((card) =>
        <Grid key={card.card_number} item  xs={'auto'} xl={'auto'}  sm={'auto'} mg={'auto'} lg={'auto'} >
          <Paper  style={this.backgroundImage(card.image_name)} spacing={24} xs={12} md={4} sm={4} 
          className={classes.paper} id="card">
            <Grid container item xs = {12}>
              <Grid item xs={6}>
                <img src={this.bankNameImage(card.bank_name)} alt='cardimage' className={classes.banktext} />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={1}>
                <Fab  size="small" aria-label="Edit"
                      className={classes.fab}
                      aria-owns={anchorEl ? 'simple-menu' : undefined}
                      aria-haspopup="true"
                      id='CardSet'
                      onClick={this.handleClick}
                >
                  <img src={settingsIcon} alt='cardimage' className={classes.settingIcon} />
                </Fab>
              </Grid>
            </Grid>
          <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              style={{ left: 'auto !important' }}
            >
              {/* <MenuItem onClick={this.handleClose}>Выписка</MenuItem> */}
              <Link to ='/monitoring' style={{textDecoration:'none', borderColor: 'none', outline: 'none'}}>
                <MenuItem onClick={this.handleDetlization}>{lan.Detalization[currentLanguage]}</MenuItem>
              </Link>
              <MenuItem onClick={this.handleSettings}>{lan.settings[currentLanguage]}</MenuItem>
              <MenuItem onClick={this.handleBlock}>{lan.block[currentLanguage]}</MenuItem>
              <MenuItem onClick={this.handleMd}>{lan.default[currentLanguage]}</MenuItem>
              <MenuItem onClick={this.handleDelete}>{lan.delete[currentLanguage]}</MenuItem>
            </Menu>
            <div id="Bal_Name">
            
              <p id='cardBalance' name={card.balance} className={classes.sum}>{accounting.formatMoney(card.balance,"","2"," ",".")} {card.currency_char}</p>
              <p id='cardName' name={card.card_name} className={classes.cardholder}>{this.formatCardName(card.card_name)} {(card.is_default === 'Y')? lan.isDefault[currentLanguage]: '' }</p>
              <input type='hidden' id='image_name' name={card.image_name} />
              <input type='hidden' id='bank_name' name={card.bank_name} />
            </div>
            <div>
              <span id='cardNumber' name={card.card_number} className={classes.cardholder}>{card.card_number.slice(0, 4) + ' ' + card.card_number.slice(4, 6) + '** **** ' + card.card_number.slice(12, 16)}</span>
              <span id='cardExp' name={card.exp_date} className={classes.carddeadline}>{card.exp_date.slice(0, 2) + '/' + card.exp_date.slice(2, 4)}</span>
              <img src={uzcard} alt='cardimage' className={classes.cardtype} /> 
              
            </div>
          </Paper>
          </Grid>);
        return cardElements
      }
      else if(this.props.type==='TET'){
        const TetCards = this.props.response.card_list.filter(card => { //Sorts all Uzcards in one array 
          return card.card_type === 'TET';
        })
        if(TetCards.length===0)
        return false;
        
        const cardElements = TetCards.map((card) =>
        <Grid key={card.card_number} item xs={'auto'} xl={'auto'}  sm={'auto'} mg={'auto'} lg={'auto'} >
        <Paper  style={this.backgroundImage(card.image_name)} spacing={24} xs={4} sm={4} className={classes.paper} id="card">
            <Grid container item xs = {12}>
              <Grid item xs={6}>
                <img src={this.bankNameImage(card.bank_name)} alt='cardimage' className={classes.banktext} />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={1}>
                <Fab  size="small" aria-label="Edit"
                      className={classes.fab}
                      aria-owns={anchorEl ? 'simple-menu' : undefined}
                      aria-haspopup="true"
                      id='CardSet'
                      onClick={this.handleClick}
                >
                  <img src={settingsIcon} alt='cardimage' className={classes.settingIcon} />
                </Fab>
              </Grid>
            </Grid>
          <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              style={{ left: 'auto !important' }}
            >
              {/* <MenuItem onClick={this.handleClose}>Выписка</MenuItem> */}
              <Link to ='/monitoring' style={{textDecoration:'none', borderColor: 'none',  outline: 'none'}}>
                <MenuItem onClick={this.handleDetlization}>{lan.Detalization[currentLanguage]}</MenuItem>
              </Link>
              <MenuItem onClick={this.handleSettings}>{lan.settings[currentLanguage]}</MenuItem>
              <MenuItem onClick={this.handleBlock}>{lan.block[currentLanguage]}</MenuItem>
              <MenuItem onClick={this.handleMd}>{lan.default[currentLanguage]}</MenuItem>
              <MenuItem onClick={this.handleDelete}>{lan.delete[currentLanguage]}</MenuItem>
            
            </Menu>
            <div id="Bal_Name">
              <p id='cardBalance' name={card.balance} className={classes.sum}>{accounting.formatMoney(card.balance,"","2"," ",".")} {card.currency_char}</p>
              <p id='cardName' name={card.card_name} className={classes.cardholder}>{this.formatCardName(card.card_name)}</p>
              <input type='hidden' id='image_name' name={card.image_name} />
              <input type='hidden' id='bank_name' name={card.bank_name} />
          
            </div>
            <div>
              <span id='cardNumber' name={card.card_number} className={classes.cardholder}>{
                card.card_number.slice(0, 4) + ' ' + card.card_number.slice(4, 6) + '** **** ' + card.card_number.slice(12, 16)}</span>
              <span id='cardExp' name={this.cardExpiry(card.exp_date)} className={classes.carddeadline}>{this.cardExpiry(card.exp_date)}</span>
              <span><img src={visa} alt='cardimage' className={classes.tettype} /></span>
            </div>
          </Paper>
          </Grid>);
          return cardElements
      }
      else if(this.props.type==='checkTet'){
        // const TetCards = this.props.response.card_list.filter(card => { //Sorts all Uzcards in one array 
        //   return card.card_type === 'TET';
        // })
        // if(TetCards.length === 0) 
        //   return false; 
        // else 
          return false
      }
      else{
      const TetCards = this.state.data.card_list.filter(card => { //Sorts all Uzcards in one array 
          return card.card_type === 'TET';
        })
        if(TetCards.length === 0)
          return false;
          
        const cardElements = TetCards.map((card) =>
        <Grid key={card.card_number} item xs={'auto'} xl={'auto'}  sm={'auto'} mg={'auto'} lg={'auto'} >
        <Paper  style={this.backgroundImage(card.image_name)} spacing={24} xs={4} sm={4} className={classes.paper} id="card">
            <Grid container item xs = {12}>
              <Grid item xs={6}>
                <img src={this.bankNameImage(card.bank_name)} alt='cardimage' className={classes.banktext} />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={1}>
                <Fab  size="small" aria-label="Edit"
                      className={classes.fab}
                      aria-owns={anchorEl ? 'simple-menu' : undefined}
                      aria-haspopup="true"
                      id='CardSet'
                      onClick={this.handleClick}
                >
                  <img src={settingsIcon} alt='cardimage' className={classes.settingIcon} />
                </Fab>
              </Grid>
            </Grid>
          <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              style={{ left: 'auto !important' }}
            >
              {/* <Link to ='/monitoring' style={{textDecoration:'none', borderColor: 'none'}}>
                <MenuItem onClick={this.handleDetlization}>{lan.Detalization[currentLanguage]}</MenuItem>
              </Link> */}
              <MenuItem onClick={this.handleSettings}>{lan.settings[currentLanguage]}</MenuItem>
              <MenuItem onClick={this.handleBlock}>{lan.block[currentLanguage]}</MenuItem>
              <MenuItem onClick={this.handleMd}>{lan.default[currentLanguage]}</MenuItem>
              <MenuItem onClick={this.handleDelete}>{lan.delete[currentLanguage]}</MenuItem>
            
            </Menu>
            <div id="Bal_Name">
              <p id='cardBalance' name={card.balance} className={classes.sum}>{accounting.formatMoney(card.balance,"","2"," ",".")} {card.currency_char}</p>
              <p id='cardName' name={card.card_name} className={classes.cardholder}>{card.card_name}</p>
              <input type='hidden' id='image_name' name={card.image_name} />
              <input type='hidden' id='bank_name' name={card.bank_name} />
          </div>
            <div style={{marginTop:-15}}>
              <span id='cardNumber' name={card.card_number} style={{marginBottom:10}} className={classes.cardholder}>{
                card.card_number.slice(0, 4) + ' ' + card.card_number.slice(4, 6) + '** **** ' + card.card_number.slice(12, 16)}</span>
              <span id='cardExp' name={this.cardExpiry(card.exp_date)} className={classes.carddeadline}>{this.cardExpiry(card.exp_date)}</span>
              <img src={visa} alt='cardimage' className={classes.tettype} />
            </div>
          </Paper>
          </Grid>);
          return cardElements
        } 
    }
  }

  AllCards.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => {
    return {
        cardInfo: state.cardsInfo.allCards,
        language: state.menuItems.language,
    };
  };
  const mapDispatchToProps = dispatch => {
    return {};
  };


  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(AllCards))