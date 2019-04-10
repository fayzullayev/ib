import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import {ArrowBack, ArrowForward} from "@material-ui/icons/"
import Swiper from 'react-id-swiper'
import cards from './cards.json'
import Paper from '@material-ui/core/Paper'
import uzcard from './images/uzcard_logo.png'
import card1 from './images/card1.png'

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
        position: "right"
    },
    paper: {
        borderRadius: '15px!important',
        backgroundPosition: 'center',
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
    colorSwitchBase: {},
    colorBar: {},
    colorChecked: {},
    swiper: {
        height: '100%',
        position: 'relative',
        width: '100%'
    },
    swiperContainer: {
        align: 'center',
        maxWidth: 250,
        marginLeft: 'auto',
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
        zIndex: 999,
    },
    details: {
        // marginTop: 75,
        // zIndex: 999,
    },

});

class CardsForPayment extends Component {

    state = {
        activeIndex: 2,
        cards: cards,
    }

    constructor(props) {
        super(props)
        this.goNext = this.goNext.bind(this)
        this.goPrev = this.goPrev.bind(this)
        this.swiper = null
    }

    goNext = () => {
        this.swiper.slideNext()
    }

    goPrev = () => {
        this.swiper.slidePrev()
    }


    formatCurrency = (balance) => {
        let bal = balance.substring(0, balance.indexOf('.'))
        let bal2 = balance.substring(balance.indexOf('.'))
        let res = '';
        let fin = '';
        let ret = [];
        let i = bal.length
        for (i; i > -3; i -= 3) {
            if (i === -1) {
                res += bal.substr(0, 2)

            } else if (i === -2) {
                res += bal.substr(0, 1)
            } else
                res += bal.substr(i, 3)

        }
        for (i = 0; i < res.length; i += 3) {
            ret.push(res.substr(i, 3))
        }
        for (i = ret.length - 1; i >= 0; i--) {
            if (i === 0)
                fin += ret[i];
            else
                fin += ret[i] + ' '
        }
        return fin + bal2;
    }
    bankNameImage = (bankName) => {
        if (bankName === 'ASIA ALLIANCE BANK АТ БАНКИ') {
            return require("./images/aab.png")
        } else if (bankName === 'ТУРОНБАНК АТ БАНКИНИНГ') {
            return require("./images/Turon_logo.png")
        } else if (bankName === 'ТИФ МИЛЛИЙ БАНКИ') {
            return require("./images/mb_logo.png")
        } else if (bankName === 'САНОАТКУРИЛИШБАНКИ') {
            return require("./images/uzpsb_logo.png")
        } else if (bankName === 'АГРОБАНК АТБ') {
            return require("./images/agrobank_logo.png")
        } else if (bankName === 'МИКРОКРЕДИТБАНК АТБ') {
            return require("./images/microcreditbank_logo.png")
        } else if (bankName === 'АТ ХАЛК БАНКИ') {
            return require("./images/xb_logo.png")
        } else if (bankName === 'ЧЕТ ЭЛ КАПИТАЛИ ИШТИРОКИДАГИ "САВДОГАР" АТ БАНКИ') {
            return require("./images/kapitalbank_logo.png")
        } else if (bankName === 'АТБ "КИШЛОК КУРИЛИШ БАНК"') {
            return require("./images/qqb_logo.png")
        } else if (bankName === 'ЧЕТ ЭЛ КАПИТАЛИ ИШТИРОКИДАГИ "HAMKORBANK" АТ БАНКИ') {
            return require("./images/hamkorbank_logo.png")
        } else if (bankName === 'АСАКА АТ БАНКИ') {
            return require("./images/asakabank_logo.png")
        } else if (bankName === 'ИПАК ЙУЛИ АИТ БАНКИНИНГ') {
            return require("./images/ipakyuli_logo.png")
        } else if (bankName === 'ТРАСТБАНК ХА БАНКИНИНГ') {
            return require("./images/Trustbank_logo.png")
        } else if (bankName === 'АТ "АЛОКАБАНК"') {
            return require("./images/aloqabank_logo.png")
        } else if (bankName === 'ИПОТЕКА-БАНК АТИБ') {
            return require("./images/ipotekabank_logo.png")
        } else if (bankName === 'КДБ БАНК УЗБЕКИСТОН АЖ') {
            return require("./images/kdb_logo.png")
        } else if (bankName === 'ТУРКИСТОН ХАТ БАНКИ') {
            return require("./images/turkiston_logo.png")
        } else if (bankName === 'ХАТ БАНКИ "УНИВЕРСАЛ БАНК"') {
            return require("./images/universalbank_logo.png")
        } else if (bankName === 'КАПИТАЛБАНК АТ БАНКИНИНГ ') {
            return require("./images/kapitalbank_logo.png")
        } else if (bankName === 'ДАВР-БАНК ХАТ БАНКИНИНГ') {
            return require("./images/davrbank_logo.png")
        } else if (bankName === 'INVEST FINANCE BANK АТ БАНКИ') {
            return require("./images/infinbank_logo.png")
        } else if (bankName === 'ОРИЕНТ ФИНАНС ХАТБ') {
            return require("./images/ofb_logo.png")
        } else
            return require("./images/aab.png")
    }

    backgroundImage = (image) => {
        if (image === 'card1')
            return {backgroundImage: `url(${require("./images/card1.png")})`}
        else if (image === 'card2')
            return {backgroundImage: `url(${require("./images/card2.png")})`}
        else if (image === 'card3')
            return {backgroundImage: `url(${require("./images/card3.png")})`}
        else if (image === 'card4')
            return {backgroundImage: `url(${require("./images/card4.png")})`}
        else if (image === 'card5')
            return {backgroundImage: `url(${require("./images/card5.png")})`}
        else if (image === 'card6')
            return {backgroundImage: `url(${require("./images/card6.png")})`}
        else if (image === 'card7')
            return {backgroundImage: `url(${require("./images/card7.png")})`}
        else if (image === 'card8')
            return {backgroundImage: `url(${require("./images/card8.png")})`}
        else if (image === 'card9')
            return {backgroundImage: `url(${require("./images/card9.png")})`}
        else if (image === 'card10')
            return {backgroundImage: `url(${require("./images/card10.png")})`}
        else
            return {backgroundImage: `url(${require("./images/card1.png")})`}
    }

    render() {
        const {classes} = this.props
        const {cards} = this.state
        const params = {
            noSwiping: true,
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
        };
        const uzCards = cards.card_list.filter(card => {
            return card.card_type === 'SV'
        })
        return (
            <Grid justify="space-between" container style={{paddingTop: 5}}>
                <Grid item xs={11}>
                    <Button className={classes.button}
                            onClick={this.goPrev}>
                        <ArrowBack className={classes.extendedIcon}/>
                    </Button>
                </Grid>
                <Grid item xs={1}>
                    <Button className={classes.button}
                            onClick={this.goNext}>
                        <ArrowForward className={classes.extendedIcon}/>
                    </Button>
                </Grid>
                <div className={classes.swiperContainer}>
                    <Swiper {...params} ref={node => {
                        if (node) this.swiper = node.swiper
                    }}>
                        {uzCards.map((card) => {
                            return (
                                <Paper className={"selected_image paper"}
                                       style={{backgroundImage: `url(${card1})`}}>
                                    <Grid container item xs={12}>
                                        <Grid item xs={6}>
                                            <img src={this.bankNameImage(card.bank_name)} alt='cardimage'
                                                 className={classes.banktext}/>
                                        </Grid>
                                        <Grid item xs={4}></Grid>
                                        <Grid item xs={1}>
                                        </Grid>
                                    </Grid>

                                    <div id="Bal_Name">
                                        <p id='cardBalance' name={card.balance}
                                           className={classes.sum}>{this.formatCurrency(card.balance)} {card.currency_char}</p>
                                        <p id='cardName' name={card.card_name}
                                           className={classes.cardholder}>{card.card_name}</p>
                                        <input type='hidden' id='bank_name' name={card.bank_name}/>
                                    </div>
                                    <div>
                                        <span id='cardNumber' name={card.card_number}
                                              className={classes.cardholder}>{card.card_number.slice(0, 4) + ' ' + card.card_number.slice(4, 6) + '** **** ' + card.card_number.slice(12, 16)}</span>
                                        <span id='cardExp' name={card.exp_date}
                                              className={classes.carddeadline}>{card.exp_date.slice(0, 2) + '/' + card.exp_date.slice(2, 4)}</span>
                                        <img src={uzcard} alt='cardimage' className={classes.cardtype}/>
                                    </div>
                                </Paper>
                            )
                        })}
                    </Swiper>
                </div>
            </Grid>
        )
    }
};

{/* <PureCardForms response={cards}/> */
}
CardsForPayment.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardsForPayment)