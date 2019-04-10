import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { ArrowBack, ArrowForward } from "@material-ui/icons/";
import Toolbar from "@material-ui/core/Toolbar";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper'
import FormHelperText from '@material-ui/core/FormHelperText';
import Swiper from 'react-id-swiper';
import card10 from './images/card10.png'
import card9 from './images/card9.png'
import card8 from './images/card8.png'
import card7 from './images/card7.png'
import card6 from './images/card6.png'
import card5 from './images/card5.png'
import card4 from './images/card4.png'
import card3 from './images/card3.png'
import card2 from './images/card2.png'
import card1 from './images/card1.png'
import Waiting from '../waiting/index'
import tick from './images/tick.png'
import './index.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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
    root: {
        flexGrow: 1,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit
    },
    card: {
        minWidth: 500
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
    swiper : {
        height: '100%',
        position: 'relative',
        width: '100%'
    },
    swiperContainer : {
        align:'center',
        maxWidth:800,
        marginLeft:'auto',
        marginRight: 'auto',
    },
    swiperContainerMob : {
        align:'center',
        maxWidth:250,
        marginLeft:'auto',
        marginRight: 'auto',
    },
    cardtype: {
        marginLeft: 15,
        marginTop: 10,
        userSelect: 'none',
      },
      banktext: {
        marginLeft: 15,
        marginTop: 5,
        height: 22,
        userSelect: 'none'
      },
      carddeadline: {
        fontSize: 15,
        marginTop: 0,
        color: 'white',
        userSelect: 'none',
        marginLeft: 30,
        marginBottom: 5,
      },
      tettype: {
        marginLeft: 90,
        userSelect: 'none',
        marginRight: 18,
      },
      cardholder: {
        fontSize: 15,
        marginTop: -30,
        color: 'white',
        marginLeft: 15,
        userSelect: 'none',
        marginBottom: 5,
        zIndex:999,
      },
      details:{
        // marginTop: 75,
        // zIndex: 999,
      },

});

class CardTemplate extends Component {
    constructor(props) {
        super(props)
        this.goNext = this.goNext.bind(this)
        this.goPrev = this.goPrev.bind(this)
        this.swiper = null
        this.state = {
            activeIndex :   2, 
            isActive    :   false,
            submit      :   false,
            req         :   null,
            checkedA    :   true,
            checkedB    :   true,
            card_number :   null,
            card_name   :   null,
            card_exp    :   null,
            mob         :   false,
            waiting     :   false,
            currentLanguage: this.props.language
        }
        
    
    }
    componentDidMount(){
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
      }
      componentWillUnmount(){
        window.removeEventListener("resize", this.updateDimensions.bind(this));
      }
      updateDimensions() {
        if (window.innerWidth < 650) this.setState({ mob: true });
        else this.setState({ mob: false });
      }
        
    goNext() {
        this.swiper.slideNext()
        if(this.swiper.activeIndex>=4 && this.swiper.activeIndex<=11)
            this.setState({ activeIndex :  this.swiper.activeIndex-1})
        else if(this.swiper.activeIndex===12){
            this.setState({ activeIndex : 1 })
        }
        else if(this.swiper.activeIndex===13){
            this.setState({ activeIndex : 2 })
        }
        console.log(this.swiper.activeIndex)
    }
    goPrev() {
        this.swiper.slidePrev()

        if(this.swiper.activeIndex>=2 || this.swiper.activeIndex <=13  )
            this.setState({ activeIndex : this.swiper.activeIndex-1 })

            
        console.log(this.swiper.activeIndex)
    }
    static defaultProps = {
        during: 600,
        color: 'red',
    }
    handleChange =  name => event => {
        this.setState({[name]: event.target.checked})
    }
    submitHandle(){
        console.log(document.getElementById('cardNumber').value)
        console.log(document.getElementById('cardExp').value)
        console.log(document.getElementById('cardName').value)
        console.log(document.getElementById('cardImage').value)
    }
    numberHandler = (event) =>{
        const value = event.target.value.slice(0, 4) + ' ' + event.target.value.slice(4, 7) + '** **** ' + event.target.value.slice(15);
        this.setState({
            card_number : value
        })
    }
    expHandler = (event) =>{
        const value = event.target.value
        this.setState({
            card_exp : value
        })
    }
    nameHandler = (event) =>{
        let value = event.target.value
        if(value.length > 20)
            value = value.slice(0,20)
        this.setState({
            card_name : value
        })
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
    render() {
        const { classes } = this.props
        const { currentLanguage } = this.state
        let lan = Translations.Cards;
        const params = {
            noSwiping : true, 
            loop: true,
            slidesPerView: 3,
            spaceBetween: 30,
        };
        const mobParams = {
            noSwiping : true, 
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
        };
        if(this.state.waiting){
            return(<Waiting/>)
        } 
        if(window.matchMedia('screen and (max-width: 768px)').matches){ 
            if (this.props.state === 'settings') {
                return (
                    <MuiThemeProvider theme={theme}>
                        <Grid>
                                <Toolbar style={{ paddingLeft: 0 ,  minHeight:45 }} >
                                    <Grid item xs={10}>
                                        <Button className={classes.button} onClick={this.props.toCards}>
                                            <ArrowBack className={classes.extendedIcon} />
                                            {lan.back[currentLanguage]}
                                        </Button>
                                    </Grid>
                                    {/* Current State */}
                                    <Grid item xs={2}>
                                        <Button className={classes.button} disabled >{lan.settings[currentLanguage]}</Button>
                                    </Grid>
                                </Toolbar>
                                <Divider />
                                <Grid justify="space-between" container style={{ paddingTop: 5 }}>
                                    {/* Carousel Handles */}
                                    <Grid item xs={9}>
                                        <Button className={classes.button} onClick={this.goPrev}>
                                            <ArrowBack className={classes.extendedIcon} />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button className={classes.button} onClick={this.goNext}>
                                            <ArrowForward className={classes.extendedIcon} />
                                        </Button>
                                    </Grid>
                                    
                                        <Grid  className={classes.swiperContainerMob}>
                                            <Swiper {...mobParams} ref={node =>{ if(node) this.swiper = node.swiper} }>
                                        <Paper key={1} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card1})` }}
                                        >
                                            <div className={classes.details}>
                                                <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                                <img id="cardImage" name={'card1'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                            {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                            </div>
                                        </Paper>
                                        <Paper key={2} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card2})` }}
                                        >
                                            <div className={classes.details}>
                                                <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                                <img id="cardImage" name={'card2'} src={tick} alt={"choosen card"} style={{width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%',}}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                            {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                            </div>  
                                        </Paper>
                                        
                                        <Paper key={3} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card3})` }}
                                        >
                                            <div className={classes.details}>
                                                <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                                <img id="cardImage" name={'card3'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                            {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                            </div> 
                                        </Paper>
                                        
                                        <Paper key={'card4'} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card4})` }}
                                        >
                                        <div className={classes.details}>
                                            <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                            <img id="cardImage" name={'card4'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                        {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                        </div> 
                                        </Paper>
                                        <Paper key={'card5'} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card5})` }}
                                        >
                                        <div className={classes.details}>
                                            <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                            <img id="cardImage" name={'card5'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                        {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                        </div> 
                                        </Paper>
                                        <Paper key={'card6'} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card6})` }}
                                        >
                                        <div className={classes.details}>
                                            <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                            <img id="cardImage" name={'card6'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                        {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                        </div>  
                                        </Paper>
                                        <Paper key={'card7'} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card7})` }}
                                        >
                                         <div className={classes.details}>
                                            <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                            <img id="cardImage" name={'card7'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                            {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                        </div>
                                        </Paper>
                                        <Paper key={'card8'} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card8})` }}
                                        >
                                        <div className={classes.details}>
                                            <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                            <img id="cardImage" name={'card8'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                        {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                        </div> 
                                        </Paper>
                                        <Paper key={'card9'} item md={4} className={ "selected_image paper"}
                                            style={{ backgroundImage: `url(${card9})` }}
                                        >
                                        <div className={classes.details}>
                                            <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                            <img id="cardImage" name={'card9'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                        {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                        </div>  
                                        </Paper>
                                        <Paper key={'card10'} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card10})` }}
                                        >
                                        <div className={classes.details}>
                                            <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                            <img id="cardImage" name={'card10'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                            {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                        </div> 
                                        </Paper>
                                </Swiper>
                                        </Grid>
                                    
                            {/* Form fields */}
                                    <Grid justify="space-between"  alignItems="center" container xs={12} spacing={24} style={{marginTop:10}}>
                                        <Grid item md={4} xs={1}></Grid>
                                        <Grid item xs={10} md={4} align="center">
                                            <TextField
                                                id="cardNameInput"
                                                label="Как назавем эту карту ?"
                                                onChange={this.nameHandler}
                                                className={classes.textField}
                                                placeholder='Alliance'
                                                fullWidth
                                                defaultValue = {localStorage.getItem('card_name')}
                                                margin="normal"
                                            />
                                                <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                margin="auto"
                                                className={classes.submit}
                                                onClick={this.props.save}
                                            >
                                                {lan.save[currentLanguage]}
                                            </Button>
                                            
                                        </Grid>
                                        <Grid item md={4} xs={1}></Grid>
                                    </Grid>
                                </Grid>
                                </Grid>
                         </MuiThemeProvider>)
            }
            else if(this.props.state==='addNewCard'){
                return (
                    <MuiThemeProvider theme={theme}>
                            <Grid>
                                <Toolbar style={{ paddingLeft: 0, minHeight:45 }} >
    
                                    {/* One step back (choose cards type) */}
                                    <Grid md={10} xs={6}>
                                        <Button className={classes.button} onClick={this.props.menu}>
                                            <ArrowBack className={classes.extendedIcon} />
                                            {lan.back[currentLanguage]}
                                        </Button>
                                    </Grid>
    
                                    {/* Current State */}
                                    <Grid md={2} xs={6}>
                                        <Button className={classes.button} disabled >{lan.addCard[currentLanguage]}</Button>
                                    </Grid>
    
                                </Toolbar>
    
                                <Divider />
    
                                <Grid justify="space-between" container style={{ paddingTop: 5 }}>
                                    
                                    {/* Carousel Handles */}
                                    <Grid item xs={9}>
                                        <Button className={classes.button}
                                            onClick={this.goPrev}>
                                            <ArrowBack className={classes.extendedIcon} />
                                        </Button>
                                    </Grid>
    
                                    <Grid item xs={2}>
                                        <Button className={classes.button}
                                            onClick={this.goNext}>
                                            <ArrowForward className={classes.extendedIcon} />
                                        </Button>
                                    </Grid>
                                    {/* Carousel */}
    
                                    <div  className={classes.swiperContainerMob}>
                                        <Swiper {...mobParams} ref={node =>{ if(node) this.swiper = node.swiper} }>
                                        <Paper key={1} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card1})` }}
                                        >
                                            <div className={classes.details}>
                                                <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                            </div>
                                        </Paper>
                                        <Paper key={2} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card2})` }}
                                        >
                                            <div className={classes.details}>
                                                <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                            </div>
                                        </Paper>
                                        
                                        <Paper key={3} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card3})` }}
                                        >
                                           <div className={classes.details}>
                                                <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                            </div>
                                        </Paper>
                                        
                                        <Paper key={'card4'} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card4})` }}
                                        >
                                        <div className={classes.details}>
                                                <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                            </div>
                                        </Paper>
                                        <Paper key={'card5'} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card5})` }}
                                        >
                                          <div className={classes.details}>
                                                <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                            </div>
                                        </Paper>
                                        <Paper key={'card6'} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card6})` }}
                                        >
                                        <div className={classes.details}>
                                                <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                            </div>
                                    </Paper>
                                        <Paper key={'card7'} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card7})` }}
                                        >
                                        <div className={classes.details}>
                                                <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                            </div>
    
                                        </Paper>
                                        <Paper key={'card8'} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card8})` }}
                                        >
                                       <div className={classes.details}>
                                                <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                            </div>
    
                                        </Paper>
                                        <Paper key={'card9'} item md={4} className={ "selected_image paper"}
                                            style={{ backgroundImage: `url(${card9})` }}
                                        >
                                      <div className={classes.details}>
                                                <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                            </div>
    
                                        </Paper>
                                        <Paper key={'card10'} item md={4} className={"selected_image paper"}
                                            style={{ backgroundImage: `url(${card10})` }}
                                        >
                                      <div className={classes.details}>
                                                <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                            </div>
    
                                        </Paper>
                                </Swiper>
                                    </div>
                            
                                    
                                    {/* Form fields */}
                                    <Grid justify="space-between"  alignItems="center" container xs={12} spacing={24} style={{marginTop:10, marginBottom:10}}>
                                        <Grid item md={4} xs={1}></Grid>
                                        <Grid item md={4} xs={10}  align="center">
                                            <InputMask mask="\8600\ 9999 9999 9999"  onChange={this.numberHandler}>
                                                {() => <TextField
                                                    className={this.props.classes.textField}
                                                    id="cardNumberInput"
                                                    label={lan.cardNumber[currentLanguage]}
                                                    placeholder='8600 ****** ****'
                                                    fullWidth
                                                    margin="normal"
                                                />}
                                            </InputMask>
                                            <InputMask mask="99\/99" onChange={this.expHandler}   >
                                                {() => <TextField
                                                    id="cardExpInput" 
                                                    ref="cardExpiryDate"
                                                    className={this.props.classes.textField}
                                                    label={lan.deadline[currentLanguage]}
                                                    placeholder='12/21'
                                                    fullWidth
                                                    margin="normal"
                                                />}
                                            </InputMask>
                                            <TextField
                                                id="cardNameInput"
                                                label={lan.cardName[currentLanguage]}                                 
                                                className={classes.textField}
                                                placeholder='Alliance'
                                                fullWidth
                                                onChange={this.nameHandler}
                                                margin="normal"
                                            />
                                            { this.props.getSms ? (
                                                <div>
                                                <InputMask >
                                                {() => <TextField
                                                    className={classes.textField}
                                                    id="smsCode"
                                                    label={lan.smsCode[currentLanguage]}                                          
                                                    placeholder='12345'
                                                    fullWidth
                                                    margin="normal"
                                                />}
                                                </InputMask>
                                                <FormControlLabel
                                                control={
                                                    <Switch
                                                    id='isDefault'
                                                    onChange={this.handleChange('checkedA')}
                                                    classes={{
                                                        switchBase: classes.colorSwitchBase,
                                                        checked: classes.colorChecked,
                                                        bar: classes.colorBar,
                                                    }}
                                                    />
                                                }
                                                label={lan.default_mark[currentLanguage]}       
                                                />
                                                  <Button
                                                  type="submit"
                                                  variant="contained"
                                                  color="secondary"
                                                  margin="auto"
                                                  className={classes.submit}
                                                  onClick={this.props.submit}
                                                >
                                                  {lan.addCard[currentLanguage]}       
                                                </Button>
                                                </div>
                                                ) : ''
                                            }  
                                            
                                            
                                            {   this.props.error ? <Error /> : '' }
                                            {   this.props.getSms ? '' :
                                            (
                                                <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                margin="auto"
                                                className={classes.submit}
                                                onClick={this.props.next}
                                            >
                                                {lan.continue[currentLanguage]} 
                                            </Button>
                                            )}
                                            
                                        </Grid>
                                        <Grid item md={4} xs={1}></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                    </MuiThemeProvider>
                )
         
            }
            else if(this.props.state==='TET'){
                return (
                    <MuiThemeProvider theme={theme}>
                    <Grid>
                        <Toolbar style={{ paddingLeft: 0, minHeight:45 }} >
    
                            {/* One step back (choose cards type) */}
                            <Grid item xs={10}>
                                <Button className={classes.button} onClick={this.props.menu}>
                                    <ArrowBack className={classes.extendedIcon} />
                                    {lan.back[currentLanguage]}
                                </Button>
                            </Grid>
    
                            {/* Current State */}
                            <Grid item xs={2}>
                                <Button className={classes.button} disabled > {lan.addCard[currentLanguage]}</Button>
                            </Grid>
    
                        </Toolbar>
    
                        <Divider />
    
                        <Grid justify="space-between" container style={{ paddingTop: 5 }}>
                            
                            {/* Carousel Handles */}
    
                            <Grid item xs={9}>
                                        <Button className={classes.button} onClick={this.goPrev}>
                                            <ArrowBack className={classes.extendedIcon} />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button className={classes.button} onClick={this.goNext}>
                                            <ArrowForward className={classes.extendedIcon} />
                                        </Button>
                                    </Grid>
                                    <div  className={classes.swiperContainerMob}>
                                        <Swiper {...mobParams} ref={node =>{ if(node) this.swiper = node.swiper} }>
                                                <Paper key={1} item md={4} className={"selected_image paper"}
                                                    style={{ backgroundImage: `url(${card1})` }}
                                                >
                                                    <div className={classes.details}>
                                                        <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                        <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                        <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                        <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                                    </div>
                                                </Paper>
                                                <Paper key={2} item md={4} className={"selected_image paper"}
                                                    style={{ backgroundImage: `url(${card2})` }}
                                                >
                                                    <div className={classes.details}>
                                                        <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                        <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                        <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                        <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                                    </div>
                                                </Paper>
                                                
                                                <Paper key={3} item md={4} className={"selected_image paper"}
                                                    style={{ backgroundImage: `url(${card3})` }}
                                                >
                                                <div className={classes.details}>
                                                        <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                        <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                        <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                        <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                                    </div>
                                                </Paper>
                                                
                                                <Paper key={'card4'} item md={4} className={"selected_image paper"}
                                                    style={{ backgroundImage: `url(${card4})` }}
                                                >
                                                <div className={classes.details}>
                                                        <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                        <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                        <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                        <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                                    </div>
                                                </Paper>
                                                <Paper key={'card5'} item md={4} className={"selected_image paper"}
                                                    style={{ backgroundImage: `url(${card5})` }}
                                                >
                                                <div className={classes.details}>
                                                        <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                        <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                        <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                        <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                                    </div>
                                                </Paper>
                                                <Paper key={'card6'} item md={4} className={"selected_image paper"}
                                                    style={{ backgroundImage: `url(${card6})` }}
                                                >
                                                <div className={classes.details}>
                                                        <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                        <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                        <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                        <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                                    </div>
                                            </Paper>
                                                <Paper key={'card7'} item md={4} className={"selected_image paper"}
                                                    style={{ backgroundImage: `url(${card7})` }}
                                                >
                                                <div className={classes.details}>
                                                        <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                        <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                        <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                        <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                                    </div>
            
                                                </Paper>
                                                <Paper key={'card8'} item md={4} className={"selected_image paper"}
                                                    style={{ backgroundImage: `url(${card8})` }}
                                                >
                                            <div className={classes.details}>
                                                        <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                        <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                        <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                        <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                                    </div>
            
                                                </Paper>
                                                <Paper key={'card9'} item md={4} className={ "selected_image paper"}
                                                    style={{ backgroundImage: `url(${card9})` }}
                                                >
                                            <div className={classes.details}>
                                                        <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                        <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                        <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                        <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                                    </div>
            
                                                </Paper>
                                                <Paper key={'card10'} item md={4} className={"selected_image paper"}
                                                    style={{ backgroundImage: `url(${card10})` }}
                                                >
                                            <div className={classes.details}>
                                                        <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                        <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                        <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                        <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                                    </div>
            
                                                </Paper>
                                        </Swiper>
                                    </div>
                            
                            {/* Form fields */}
                            <Grid justify="space-between"  alignItems="center" container item xs={12} spacing={24} style={{marginTop:10}}>
                                <Grid item md={4} xs={1}></Grid>
                                <Grid item md={4} xs={10} align="center">
                                    <TextField
                                        onChange={this.nameHandler}
                                        id="cardNameInput"
                                        label= {lan.cardName[currentLanguage]}
                                        className={classes.textField}
                                        placeholder='Alliance'
                                        fullWidth
                                        margin="normal"
                                    />
                                    <InputMask mask="9999 9999 9999 9999" onChange={this.numberHandler} >
                                            {() => <TextField
                                                id="cardNumberInput"
                                                label= {lan.cardNumber[currentLanguage]}
                                                placeholder='645K C4**** ****'
                                                fullWidth
                                                margin="normal"
                                                 className={this.props.classes.textField}
                                            />}
                                    </InputMask>
                 
                                    <InputMask mask="99\/99" onChange={this.expHandler}>
                                        {() => <TextField
                                            className={this.props.classes.textField}
                                            id="cardExpInput"
                                            label= {lan.deadline[currentLanguage]}
                                            placeholder='12/21'
                                            fullWidth
                                            margin="normal"
                                        />}
                                    </InputMask>
                                 
                                    { this.props.getSms ? (
                                        <div>
                                        <InputMask >
                                        {() => <TextField
                                            className={classes.textField}
                                            id="smsCode"
                                            label= {lan.smsCode[currentLanguage]}
                                            placeholder='12345'
                                            fullWidth
                                            margin="normal"
                                        />}
                                        </InputMask>
                                        <FormControlLabel
                                        control={
                                            <Switch
                                            id='isDefault'
                                            onChange={this.handleChange('checkedA')}
                                            classes={{
                                                switchBase: classes.colorSwitchBase,
                                                checked: classes.colorChecked,
                                                bar: classes.colorBar,
                                            }}
                                            />
                                        }
                                        label={lan.default_mark[currentLanguage]}
                                        />
                                          <Button
                                          type="submit"
                                          variant="contained"
                                          color="secondary"
                                          margin="auto"
                                          className={classes.submit}
                                          onClick={this.props.submit}
                                        >
                                          {lan.addCard[currentLanguage]}
                                        </Button>
                                        </div>
                                        ) : ''
                                    }  
                                    
                                    
                                    {   this.props.error ? <Error /> : '' }
                                    {   this.props.getSms ? '' :
                                    (
                                        <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        margin="auto"
                                        className={classes.submit}
                                        onClick={this.props.next}
                                    >
                                        {lan.continue[currentLanguage]}
                                    </Button>
                                    )}
                                    
                                </Grid>
                                <Grid item md={4} xs={1}></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
            </MuiThemeProvider>
    
    
                   
            
                )
         
            }
        }
        else{
            if (this.props.state === 'settings') {
                return (
                    <MuiThemeProvider theme={theme}>
                        <Grid>
                                <Toolbar style={{ paddingLeft: 0 ,  minHeight:45 }} >
                                    <Grid item xs={10}>
                                        <Button className={classes.button} onClick={this.props.toCards}>
                                            <ArrowBack className={classes.extendedIcon} />
                                            {lan.back[currentLanguage]}
                                        </Button>
                                    </Grid>
                                    {/* Current State */}
                                    <Grid item xs={2}>
                                        <Button className={classes.button} disabled >{lan.settings[currentLanguage]}</Button>
                                    </Grid>
                                </Toolbar>
                                <Divider />
                                <Grid justify="space-between" container style={{ paddingTop: 5 }}>
                                    {/* Carousel Handles */}
                                    <Grid item xs={11}>
                                        <Button className={classes.button} onClick={this.goPrev}>
                                            <ArrowBack className={classes.extendedIcon} />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Button className={classes.button} onClick={this.goNext}>
                                            <ArrowForward className={classes.extendedIcon} />
                                        </Button>
                                    </Grid>
                                    
                                        <Grid  className={classes.swiperContainer}>
                                            <Swiper {...params} ref={node =>{ if(node) this.swiper = node.swiper} }>
                                        <Paper key={1} item md={4} className={(this.state.activeIndex === 1) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card1})` }}
                                        >
                                            {(this.state.activeIndex === 1) ? (
                                                <div className={classes.details}>
                                                    <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                                    <img id="cardImage" name={'card1'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                                    <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                                    <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                                {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                                </div>
                                            ) : ''}
                                        </Paper>
                                        <Paper key={2} item md={4} className={(this.state.activeIndex === 2) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card2})` }}
                                        >
                                            {(this.state.activeIndex === 2) ? (
                                            <div className={classes.details}>
                                            <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                            <img id="cardImage" name={'card2'} src={tick} alt={"choosen card"} style={{width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%',}}/>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                            {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                            </div>     ) : ''}
                                        </Paper>
                                        
                                        <Paper key={3} item md={4} className={(this.state.activeIndex === 3) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card3})` }}
                                        >
                                            {(this.state.activeIndex === 3) ? (
                                            <div className={classes.details}>
                                            <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                            <img id="cardImage" name={'card3'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                            {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                            </div> ) : ''}
                                        </Paper>
                                        
                                        <Paper key={'card4'} item md={4} className={(this.state.activeIndex === 4) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card4})` }}
                                        >
                                        {(this.state.activeIndex === 4) ? (
                                       <div className={classes.details}>
                                       <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                       <img id="cardImage" name={'card4'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                       <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                       <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                         {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                            
                                   </div>  ) : ''}
                                        </Paper>
                                        <Paper key={'card5'} item md={4} className={(this.state.activeIndex === 5) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card5})` }}
                                        >
                                        {(this.state.activeIndex === 5) ? (
                                        <div className={classes.details}>
                                        <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                        <img id="cardImage" name={'card5'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                        <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                        <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                        {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                            
                                    </div> ) : ''}
                                        </Paper>
                                        <Paper key={'card6'} item md={4} className={(this.state.activeIndex === 6) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card6})` }}
                                        >
                                        {(this.state.activeIndex === 6) ? (
                                       <div className={classes.details}>
                                       <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                       <img id="cardImage" name={'card6'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                       <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                       <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                      {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                            
                                   </div>  ) : ''}
                                        </Paper>
                                        <Paper key={'card7'} item md={4} className={(this.state.activeIndex === 7) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card7})` }}
                                        >
                                        {(this.state.activeIndex === 7) ? (
                                         <div className={classes.details}>
                                         <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                         <img id="cardImage" name={'card7'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                         <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                         <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                        {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                            
                                     </div>) : ''}
                                        </Paper>
                                        <Paper key={'card8'} item md={4} className={(this.state.activeIndex === 8) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card8})` }}
                                        >
                                        {(this.state.activeIndex === 8) ? (
                                        <div className={classes.details}>
                                        <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                        <img id="cardImage" name={'card8'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                        <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                        <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                     {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                            
                                    </div>   ) : ''}
                                        </Paper>
                                        <Paper key={'card9'} item md={4} className={(this.state.activeIndex === 9) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card9})` }}
                                        >
                                        {(this.state.activeIndex === 9) ? (
                                       <div className={classes.details}>
                                       <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                       <img id="cardImage" name={'card9'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                       <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                       <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                        {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                            
                                   </div>  ) : ''}
                                        </Paper>
                                        <Paper key={'card10'} item md={4} className={(this.state.activeIndex === 10) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card10})` }}
                                        >
                                        {(this.state.activeIndex === 10) ? (
                                        <div className={classes.details}>
                                        <img src={this.bankNameImage(localStorage.getItem('bank_name'))} alt='cardimage' className={classes.banktext} />
                                        <img id="cardImage" name={'card10'} src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px', marginLeft: '40%', marginRight: '40%', }}/>
                                        <p id='cardName' className={classes.cardholder}>{this.state.card_name ? this.state.card_name : localStorage.getItem('card_name') }</p>
                                        <span id='cardNumber'  className={classes.cardholder}>{localStorage.getItem('card_num').slice(0, 4) + ' ' + localStorage.getItem('card_num').slice(4, 6) + '** **** ' + localStorage.getItem('card_num').slice(12, 16)}</span>
                                        {(localStorage.getItem('card_exp').length===4) ? (<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp').slice(0, 2) + '/' + localStorage.getItem('card_exp').slice(2, 4)}</span>) :(<span id='cardExp' className={classes.carddeadline}>{localStorage.getItem('card_exp')}</span> ) } 
                                            
                                    </div> ) : ''}
                                        </Paper>
                                </Swiper>
                                        </Grid>
                                    
                            {/* Form fields */}
                                    <Grid justify="space-between"  alignItems="center" container xs={12} spacing={24} style={{marginTop:10}}>
                                        <Grid item xs={4}></Grid>
                                        <Grid item xs={12} md={4} align="center">
                                            <TextField
                                                id="cardNameInput"
                                                label="Как назавем эту карту ?"
                                                onChange={this.nameHandler}
                                                className={classes.textField}
                                                placeholder='Alliance'
                                                fullWidth
                                                defaultValue = {localStorage.getItem('card_name')}
                                                margin="normal"
                                            />
                                                <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                margin="auto"
                                                className={classes.submit}
                                                onClick={this.props.save}
                                            >
                                                {lan.save[currentLanguage]}
                                            </Button>
                                            
                                        </Grid>
                                        <Grid item xs={4}></Grid>
                                    </Grid>
                                </Grid>
                                </Grid>
                         </MuiThemeProvider>)
            }
            else if(this.props.state==='addNewCard'){
                return (
                    <MuiThemeProvider theme={theme}>
                            <Grid>
                                <Toolbar style={{ paddingLeft: 0, minHeight:45 }} >
    
                                    {/* One step back (choose cards type) */}
                                    <Grid xs={10}>
                                        <Button className={classes.button} onClick={this.props.menu}>
                                            <ArrowBack className={classes.extendedIcon} />
                                            {lan.back[currentLanguage]}
                                        </Button>
                                    </Grid>
    
                                    {/* Current State */}
                                    <Grid xs={2}>
                                        <Button className={classes.button} disabled >{lan.addCard[currentLanguage]}</Button>
                                    </Grid>
    
                                </Toolbar>
    
                                <Divider />
    
                                <Grid justify="space-between" container style={{ paddingTop: 5 }}>
                                    
                                    {/* Carousel Handles */}
                                    <Grid item xs={11}>
                                        <Button className={classes.button}
                                            onClick={this.goPrev}>
                                            <ArrowBack className={classes.extendedIcon} />
                                        </Button>
                                    </Grid>
    
                                    <Grid item xs={1}>
                                        <Button className={classes.button}
                                            onClick={this.goNext}>
                                            <ArrowForward className={classes.extendedIcon} />
                                        </Button>
                                    </Grid>
                                    {/* Carousel */}
    
                                    <div  className={classes.swiperContainer}>
                                <Swiper {...params} ref={node =>{ if(node) this.swiper = node.swiper} }>
                                        <Paper key={1} item md={4} className={(this.state.activeIndex === 1) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card1})` }}
                                            
                                        >
                                        {(this.state.activeIndex === 1 || this.state.activeIndex === 11) ? (
                                            <div className={classes.details}>
                                                <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                            </div>
    
                                        ) : ''}
                                        
                                        </Paper>
                                        <Paper key={2} item md={4} className={(this.state.activeIndex === 2) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card2})` }}
                                        >
                                        {(this.state.activeIndex === 2) ? (
                                            <div className={classes.details}>
                                                <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                            </div>
    
                                        ) : ''}
                                        </Paper>
                                        <Paper key={3} item md={4} className={(this.state.activeIndex === 3) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card3})` }}
                                        >
                                        {(this.state.activeIndex === 3) ? (
                                              <div>
                                              <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                             
                                            <div className={classes.details}>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                            <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                        </div>
                                        </div>
    
                                        ) : ''}
                                        </Paper>
                                        <Paper key={'card4'} item md={4} className={(this.state.activeIndex === 4) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card4})` }}
                                        >
                                        {(this.state.activeIndex === 4) ? (
                                               <div>
                                               <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                            
                                            <div className={classes.details}>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                            <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                        </div>
                                        </div>
    
                                        ) : ''}
                                        </Paper>
                                        <Paper key={'card5'} item md={4} className={(this.state.activeIndex === 5) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card5})` }}
                                        >
                                        {(this.state.activeIndex === 5) ? (
                                               <div>
                                               <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                            
                                            <div className={classes.details}>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                            <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                        </div>
                                        </div>
    
                                        ) : ''}
                                        </Paper>
                                        <Paper key={'card6'} item md={4} className={(this.state.activeIndex === 6) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card6})` }}
                                        >
                                        {(this.state.activeIndex === 6) ? (
                                              <div>
                                              <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                           
                                           <div className={classes.details}>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                            <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                        </div>
                                        </div>
    
                                        ) : ''}
                                        </Paper>
                                        <Paper key={'card7'} item md={4} className={(this.state.activeIndex === 7) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card7})` }}
                                        >
                                        {(this.state.activeIndex === 7) ? (
                                               <div>
                                               <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                            
                                            <div className={classes.details}>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                            <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                        </div>
                                        </div>
    
                                        ) : ''}
                                        </Paper>
                                        <Paper key={'card8'} item md={4} className={(this.state.activeIndex === 8) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card8})` }}
                                        >
                                        {(this.state.activeIndex === 8) ? (
                                               <div>
                                               <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                            
                                            <div className={classes.details}>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                            <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                        </div>
                                        </div>
    
                                        ) : ''}
                                        </Paper>
                                        <Paper key={'card9'} item md={4} className={(this.state.activeIndex === 9) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card9})` }}
                                        >
                                        {(this.state.activeIndex === 9) ? (
                                               <div>
                                               <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                            
                                            <div className={classes.details}>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                            <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                        </div>
                                        </div>
    
                                        ) : ''}
                                        </Paper>
                                        <Paper key={'card10'} item md={4} className={(this.state.activeIndex === 10) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card10})` }}
                                        >
                                        {(this.state.activeIndex === 10) ? (
                                              <div>
                                              <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                           
                                           <div className={classes.details}>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                            <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                        </div>
                                        </div>
    
                                        ) : ''}
                                        </Paper>
                                </Swiper>
                            </div>
                            
                                    
                                    {/* Form fields */}
                                    <Grid justify="space-between"  alignItems="center" container xs={12} spacing={24} style={{marginTop:10}}>
                                        <Grid item xs={4}></Grid>
                                        <Grid item xs={4} align="center">
                                            <InputMask mask="\8600\ 9999 9999 9999"  onChange={this.numberHandler}>
                                                {() => <TextField
                                                    className={this.props.classes.textField}
                                                    id="cardNumberInput"
                                                    label={lan.cardNumber[currentLanguage]}
                                                    placeholder='8600 ****** ****'
                                                    fullWidth
                                                    margin="normal"
                                                />}
                                            </InputMask>
                                            <InputMask mask="99\/99" onChange={this.expHandler}   >
                                                {() => <TextField
                                                    id="cardExpInput" 
                                                    ref="cardExpiryDate"
                                                    className={this.props.classes.textField}
                                                    label={lan.deadline[currentLanguage]}
                                                    placeholder='12/21'
                                                    fullWidth
                                                    margin="normal"
                                                />}
                                            </InputMask>
                                            <TextField
                                                id="cardNameInput"
                                                label={lan.cardName[currentLanguage]}                                 
                                                className={classes.textField}
                                                placeholder='Alliance'
                                                fullWidth
                                                onChange={this.nameHandler}
                                                margin="normal"
                                            />
                                            { this.props.getSms ? (
                                                <div>
                                                <InputMask >
                                                {() => <TextField
                                                    className={classes.textField}
                                                    id="smsCode"
                                                    label={lan.smsCode[currentLanguage]}                                          
                                                    placeholder='12345'
                                                    fullWidth
                                                    margin="normal"
                                                />}
                                                </InputMask>
                                                <FormControlLabel
                                                control={
                                                    <Switch
                                                    id='isDefault'
                                                    onChange={this.handleChange('checkedA')}
                                                    classes={{
                                                        switchBase: classes.colorSwitchBase,
                                                        checked: classes.colorChecked,
                                                        bar: classes.colorBar,
                                                    }}
                                                    />
                                                }
                                                label={lan.default_mark[currentLanguage]}       
                                                />
                                                  <Button
                                                  type="submit"
                                                  variant="contained"
                                                  color="secondary"
                                                  margin="auto"
                                                  className={classes.submit}
                                                  onClick={this.props.submit}
                                                >
                                                  {lan.addCard[currentLanguage]}       
                                                </Button>
                                                </div>
                                                ) : ''
                                            }  
                                            
                                            
                                            {   this.props.error ? <Error /> : '' }
                                            {   this.props.getSms ? '' :
                                            (
                                                <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                margin="auto"
                                                className={classes.submit}
                                                onClick={this.props.next}
                                            >
                                                {lan.smsCode[currentLanguage]} 
                                            </Button>
                                            )}
                                            
                                        </Grid>
                                        <Grid item xs={4}></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                    </MuiThemeProvider>
                )
         
            }
            else if(this.props.state==='TET'){
                return (
                    <MuiThemeProvider theme={theme}>
                    <Grid>
                        <Toolbar style={{ paddingLeft: 0, minHeight:45 }} >
    
                            {/* One step back (choose cards type) */}
                            <Grid item xs={10}>
                                <Button className={classes.button} onClick={this.props.menu}>
                                    <ArrowBack className={classes.extendedIcon} />
                                    {lan.back[currentLanguage]}
                                </Button>
                            </Grid>
    
                            {/* Current State */}
                            <Grid item xs={2}>
                                <Button className={classes.button} disabled > {lan.addCard[currentLanguage]}</Button>
                            </Grid>
    
                        </Toolbar>
    
                        <Divider />
    
                        <Grid justify="space-between" container style={{ paddingTop: 5 }}>
                            
                            {/* Carousel Handles */}
    
                            <Grid item xs={11}>
                                <Button className={classes.button}
                                    onClick={this.goPrev}>
                                    <ArrowBack className={classes.extendedIcon} />
                                </Button>
                            </Grid>
    
                            <Grid item xs={1}>
                                <Button className={classes.button}
                                    onClick={this.goNext}>
                                    <ArrowForward className={classes.extendedIcon} />
                                </Button>
                            </Grid>
                            <div  className={classes.swiperContainer}>
                                <Swiper {...params} ref={node =>{ if(node) this.swiper = node.swiper} }>
                                        <Paper key={1} item md={4} className={(this.state.activeIndex === 1) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card1})` }}
                                            
                                        >
                                        {(this.state.activeIndex === 1 || this.state.activeIndex === 11) ? (
                                            <div className={classes.details}>
                                                <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                            </div>
    
                                        ) : ''}
                                        
                                        </Paper>
                                        <Paper key={2} item md={4} className={(this.state.activeIndex === 2) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card2})` }}
                                        >
                                        {(this.state.activeIndex === 2) ? (
                                            <div className={classes.details}>
                                                <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                                <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                                <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                                <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                            </div>
    
                                        ) : ''}
                                        </Paper>
                                        <Paper key={3} item md={4} className={(this.state.activeIndex === 3) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card3})` }}
                                        >
                                        {(this.state.activeIndex === 3) ? (
                                              <div>
                                              <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                             
                                            <div className={classes.details}>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                            <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                        </div>
                                        </div>
    
                                        ) : ''}
                                        </Paper>
                                        <Paper key={'card4'} item md={4} className={(this.state.activeIndex === 4) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card4})` }}
                                        >
                                        {(this.state.activeIndex === 4) ? (
                                               <div>
                                               <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                            
                                            <div className={classes.details}>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                            <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                        </div>
                                        </div>
    
                                        ) : ''}
                                        </Paper>
                                        <Paper key={'card5'} item md={4} className={(this.state.activeIndex === 5) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card5})` }}
                                        >
                                        {(this.state.activeIndex === 5) ? (
                                               <div>
                                               <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                            
                                            <div className={classes.details}>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                            <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                        </div>
                                        </div>
    
                                        ) : ''}
                                        </Paper>
                                        <Paper key={'card6'} item md={4} className={(this.state.activeIndex === 6) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card6})` }}
                                        >
                                        {(this.state.activeIndex === 6) ? (
                                              <div>
                                              <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                           
                                           <div className={classes.details}>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                            <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                        </div>
                                        </div>
    
                                        ) : ''}
                                        </Paper>
                                        <Paper key={'card7'} item md={4} className={(this.state.activeIndex === 7) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card7})` }}
                                        >
                                        {(this.state.activeIndex === 7) ? (
                                               <div>
                                               <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                            
                                            <div className={classes.details}>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                            <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                        </div>
                                        </div>
    
                                        ) : ''}
                                        </Paper>
                                        <Paper key={'card8'} item md={4} className={(this.state.activeIndex === 8) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card8})` }}
                                        >
                                        {(this.state.activeIndex === 8) ? (
                                               <div>
                                               <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                            
                                            <div className={classes.details}>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                            <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                        </div>
                                        </div>
    
                                        ) : ''}
                                        </Paper>
                                        <Paper key={'card9'} item md={4} className={(this.state.activeIndex === 9) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card9})` }}
                                        >
                                        {(this.state.activeIndex === 9) ? (
                                               <div>
                                               <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                            
                                            <div className={classes.details}>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                            <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                        </div>
                                        </div>
    
                                        ) : ''}
                                        </Paper>
                                        <Paper key={'card10'} item md={4} className={(this.state.activeIndex === 10) ? "selected_image paper" :  classes.paper}
                                            style={{ backgroundImage: `url(${card10})` }}
                                        >
                                        {(this.state.activeIndex === 10) ? (
                                              <div>
                                              <img id="cardImage" src={tick} alt={"choosen card"} style={{ width: '60px',height: '60px',marginTop: '15%', marginLeft: '40%', marginRight: '40%', }}/>
                                           
                                           <div className={classes.details}>
                                            <p id='cardName' className={classes.cardholder}>{this.state.card_name}</p>
                                            <span id='cardNumber'  className={classes.cardholder}>{this.state.card_number}</span>
                                            <span id='cardExp' className={classes.carddeadline}>{this.state.card_exp}</span>
                                        </div>
                                        </div>
    
                                        ) : ''}
                                        </Paper>
                                </Swiper>
                            </div>
                            
                            {/* Form fields */}
                            <Grid justify="space-between"  alignItems="center" container item xs={12} spacing={24} style={{marginTop:10}}>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4} align="center">
                                    <TextField
                                        onChange={this.nameHandler}
                                        id="cardNameInput"
                                        label= {lan.cardName[currentLanguage]}
                                        className={classes.textField}
                                        placeholder='Alliance'
                                        fullWidth
                                        margin="normal"
                                    />
                                    <InputMask mask="9999 9999 9999 9999" onChange={this.numberHandler} >
                                            {() => <TextField
                                                id="cardNumberInput"
                                                label= {lan.cardNumber[currentLanguage]}
                                                placeholder='645K C4**** ****'
                                                fullWidth
                                                margin="normal"
                                                 className={this.props.classes.textField}
                                            />}
                                    </InputMask>
                 
                                    <InputMask mask="99\/99" onChange={this.expHandler}>
                                        {() => <TextField
                                            className={this.props.classes.textField}
                                            id="cardExpInput"
                                            label= {lan.deadline[currentLanguage]}
                                            placeholder='12/21'
                                            fullWidth
                                            margin="normal"
                                        />}
                                    </InputMask>
                                 
                                    { this.props.getSms ? (
                                        <div>
                                        <InputMask >
                                        {() => <TextField
                                            className={classes.textField}
                                            id="smsCode"
                                            label= {lan.smsCode[currentLanguage]}
                                            placeholder='12345'
                                            fullWidth
                                            margin="normal"
                                        />}
                                        </InputMask>
                                        <FormControlLabel
                                        control={
                                            <Switch
                                            id='isDefault'
                                            onChange={this.handleChange('checkedA')}
                                            classes={{
                                                switchBase: classes.colorSwitchBase,
                                                checked: classes.colorChecked,
                                                bar: classes.colorBar,
                                            }}
                                            />
                                        }
                                        label={lan.default_mark[currentLanguage]}
                                        />
                                          <Button
                                          type="submit"
                                          variant="contained"
                                          color="secondary"
                                          margin="auto"
                                          className={classes.submit}
                                          onClick={this.props.submit}
                                        >
                                          {lan.addCard[currentLanguage]}
                                        </Button>
                                        </div>
                                        ) : ''
                                    }  
                                    
                                    
                                    {   this.props.error ? <Error /> : '' }
                                    {   this.props.getSms ? '' :
                                    (
                                        <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        margin="auto"
                                        className={classes.submit}
                                        onClick={this.props.next}
                                    >
                                        {lan.continue[currentLanguage]}
                                    </Button>
                                    )}
                                    
                                </Grid>
                                <Grid item xs={4}></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
            </MuiThemeProvider>
    
    
                   
            
                )
         
            }
        }
   
    }
};

const mapStateToProps = state => {
    return {
        language: state.menuItems.language,
    };
};
const mapDispatchToProps = dispatch => {
    return {};  
};

CardTemplate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect( mapStateToProps, mapDispatchToProps )(withStyles(styles)(CardTemplate))

class Error extends Component {
    render() {
        return(
            <FormHelperText id="component-error-text" style={{color:'red', marginLeft:20}}>{localStorage.getItem("error")}</FormHelperText>
        )
    }
}


            