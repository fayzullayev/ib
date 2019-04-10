import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {ArrowBack} from "@material-ui/icons/";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import visa from './images/visa_logo.png';
import uzcard from './images/uzcard.png'
import unionpay from './images/unionpay.png'
import master from './images/master.png'
import CardTemplate from './cardTemplate'
import Success from '../success'
import Api from '../../services/api'
import {connect} from "react-redux"
import * as actionTypes from "../../store/actions/Actions"
import Waiting from '../waiting/index'
import Translations from "../../translations/translations"

const styles = theme => ({
    root: {
        flexGrow: 1
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
        marginLeft: 5,
        position: "right"
    },
    fab: {
        margin: theme.spacing.unit,
        marginLeft: 165,
        marginTop: 15,
        backgroundColor: "white"
    },
    cardContainer: {
        width: '100%',
        heigth: 250,
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: '5px',
        padding: 25,
    },
    cardBox: {
        margin: 15,
        width: '90%',
        height: 70,
        textTransform: 'capitalize',
        alignItems: 'left',
        justifyContent: 'left',

    },
    cardtype: {
        marginLeft: 60,
        marginRight: 30,
        userSelect: 'none',
        width: 50,
        height: 30,
    },

});

class AddNewCard extends Component {
    api = new Api();

    constructor(props) {
        super(props)
        this.state = {
            addSvCard: false,
            menu: true,
            responce: null,
            getSms: false,
            error: false,
            waiting: false,
            success: false,
            addTetCard: false,
            currentLanguage: this.props.language
        };

    }

    componentDidUpdate(prevProps) {
        if (this.props.cardInfo !== prevProps.cardInfo) {
            this.setState({
                currentLanguage: this.props.language
            })

        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                currentLanguage: this.props.language
            })
        }, 50);
    }

    addUzcards = () => {
        this.setState({addSvCard: true})
        this.setState({menu: false})
    }
    addTetcards = () => {
        this.setState({addTetCard: true})
        this.setState({menu: false})
    }
    toChooseCard = () => {
        this.setState({addTetCard: false})
        this.setState({addSvCard: false})
        this.setState({menu: true})
    }

    addCartNext = () => {
        // this.setState({waiting: true})
        const req = {
            "request": "get_cards_data",
            "message_type": 3,
            "exp_date": document.getElementById('cardExpInput').value.replace(/\//g, ''),
            "card_number": document.getElementById('cardNumberInput').value.replace(/\s/g, '')
        }
        this.api.SetAjax(req).then(res => {
            this.setState({waiting: false})
            if (res.result === '0') {
                this.setState({getSms: true,})
            } else {
                localStorage.setItem("error", res.msg)
                this.setState({error: true})
            }
        })
    }

    handleSubmit = () => {
        this.setState({waiting: true})
        let def = 'N';
        if (document.getElementById('isDefault').checked) {
            def = 'Y'
        }
        const req = {
            request: "get_cards_data",
            message_type: 4,
            exp_date: document.getElementById('cardExpInput').value.replace(/\//g, ''),
            card_number: document.getElementById('cardNumberInput').value.replace(/\s/g, ''),
            card_name: document.getElementById('cardNameInput').value,
            image_name: document.getElementById('cardImage').name,
            sms_code: document.getElementById('smsCode').value,
            is_default: def,
        }
        this.api.SetAjax(req).then(res => {
            if (res.result === '0') {
                const req1 = {
                    "request": "CARDS",
                    "message_type": 1
                }

                this.api.SetAjax(req1).then(res1 => {
                    this.setState({waiting: false, success: true})
                    if (res1 !== "") {
                        this.props.cardInfoNew({
                            allCards: res1,
                        });
                    }
                    if (res.result === '0') {
                        this.props.additionComplete()
                    } else
                        console.log(res)
                })
            }
        })
    }

    render() {
        let lan = Translations.Cards;
        const {currentLanguage} = this.state
        const {classes} = this.props;
        if (this.state.success) {
            return (<Success toCards={this.backToCards}/>)
        } else if (this.state.waiting) {
            return (<Waiting/>)
        } else if (this.state.addSvCard) { //Open Add Card Template
            return (<CardTemplate menu={this.toChooseCard} next={this.addCartNext} state={'addNewCard'}
                                  getSms={this.state.getSms} error={this.state.error} submit={this.handleSubmit}
            />)
        } else if (this.state.addTetCard) { //Open Add Card Template
            return (<CardTemplate menu={this.toChooseCard} next={this.addCartNext} state={'TET'}
                                  getSms={this.state.getSms} error={this.state.error} submit={this.handleSubmit}
            />)
        } else
            return (
                <Grid>
                    <Toolbar>
                        <Grid>
                            <Button className={classes.button} onClick={this.props.toCards}>
                                <ArrowBack className={classes.extendedIcon}/>
                                {lan.back[currentLanguage]}
                            </Button>
                        </Grid>
                    </Toolbar>

                    <Grid className={classes.cardContainer} container>
                        <Grid item xs={12} xl={6} sm={12} mg={6} lg={6}>
                            <Button variant="outlined" className={classes.cardBox} onClick={this.addUzcards}>
                                <img src={uzcard} alt='cardimage'
                                     className={classes.cardtype}/> {lan.uzcards[currentLanguage]}
                            </Button>
                        </Grid>
                        <Grid item xs={12} xl={6} sm={12} mg={6} lg={6}>
                            <Button variant="outlined" className={classes.cardBox} onClick={this.addTetcards}>
                                <img src={visa} alt='cardimage'
                                     className={classes.cardtype}/> {lan.visacards[currentLanguage]}
                            </Button>
                        </Grid>
                        <Grid item xs={12} xl={6} sm={12} mg={6} lg={6}>
                            <Button variant="outlined" className={classes.cardBox} onClick={this.addTetcards}>
                                <img src={unionpay} alt='cardimage' className={classes.cardtype}/> China UnionPay
                            </Button>
                        </Grid>
                        <Grid item xs={12} xl={6} sm={12} mg={6} lg={6}>
                            <Button variant="outlined" className={classes.cardBox} onClick={this.addTetcards}>
                                <img src={master} alt='cardimage'
                                     className={classes.cardtype}/> {lan.mastercards[currentLanguage]}
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
            );
    }
}

AddNewCard.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        cardInfoNew: info => dispatch({
            type: actionTypes.cardInformation,
            info: info
        })
    };
};

const mapStateToProps = state => {
    return {
        language: state.menuItems.language,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AddNewCard))
