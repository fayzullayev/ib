import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Dialog, DialogContent, DialogActions, TextField, IconButton, Button } from '@material-ui/core'
import Cards from '../../cards-list'
import MaskedTextField from '../masked-text-field'
import Waiting from '../../waiting';
import Translations from '../../../translations/translations'
import imgPrev from '../prev-btn/img/prev.png'

const styles = theme => ({
  dlgContent: {
    fontSize: '16px',
    padding: '0 24px !important',
    letterSpacing: '-0.2px'
  },
  dlgActions: {
    padding: '24px 18px'
  },
  cardLabel: {
    fontSize: '13px',
    color: 'gray'
  },
  actionBtn: {
    ...theme.submit,
    width: '90%',
    textTransform: 'initial',
    margin: '0px !important'
  }
})

class DepDialogPay extends Component {

  state = {
    amount: '',
    cardNumber: '',
    cardItems: null,
    waiting: true
  }

  componentWillReceiveProps() {
    if (this.props.amount !== '' && this.props.cardNumber !== '')
      this.setState({
        amount: this.props.amount,
        cardNumber: this.props.cardNumber,
        cardItems: this.getCardItems(),
        waiting: false
      })
    else
      this.setState({
        cardNumber: this.getCardNumber(),
        cardItems: this.getCardItems(),
        waiting: false
      })
  }

  getCardNumber() {
    const cards = this.getCardItems()
    const idx = cards.findIndex(card => card.is_default === 'Y')
    if (idx >= 0) return cards[idx].card_number
    else return cards[0].card_number
  }

  getCardItems() {
    return this.props.currency === '000'
      ? this.props.cardInfo.uzCards
      : this.props.cardInfo.valCards
  }

  cardHandler = cardNumber =>
    this.setState({ cardNumber })

  handleChange = event =>
    this.setState({ amount: event.target.value })

  handlePayClose = () => {
    this.clearState()
    this.props.dialogPayClose()
  }

  handlePayPrev = () => {
    this.clearState()
    this.props.dialogPayPrev()
  }

  handleSubmit = e => {
    const { amount, cardNumber } = this.state
    if (amount === '0') return false
    e.preventDefault()
    this.clearState()
    this.props.dialogAskOpen(
      amount,
      cardNumber
    )
  }

  clearState = () => {
    setTimeout(() => this.setState({
      amount: '',
      cardNumber: '',
      cardItems: null
    }), 300)
  }

  render() {

    const { classes, open, language: currLan } = this.props

    if (!open) return false

    const { cardItems, amount, cardNumber, waiting } = this.state
    let lan = Translations.Deposits
    let payContent

    if (waiting) payContent = <Waiting />
    else
      payContent = <form onSubmit={this.handleSubmit}>
        <DialogContent className={classes.dlgContent}>
          <div style={{ position: 'relative', margin: '0 -24px', paddingTop: '28px' }}>
            <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
              <IconButton onClick={this.handlePayPrev} style={{ width: '36px', height: '36px' }}>
                <img src={imgPrev} />
              </IconButton>
            </div>
            <div style={{ textAlign: 'center' }}>{lan.payText[currLan]}</div>
          </div>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                label={lan.payAmount[currLan]}
                fullWidth
                value={amount}
                onChange={this.handleChange}
                style={{ marginTop: '13px', marginBottom: '20px' }}
                InputProps={{
                  inputComponent: MaskedTextField
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <span className={classes.cardLabel}>{lan.payCards[currLan]}</span>
              <Cards data={cardItems} cardNumber={cardNumber} cardHandler={this.cardHandler} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.dlgActions}>
          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ width: '50%' }}>
              <Button color="secondary" variant="contained"
                type="submit"
                className={classes.actionBtn}>
                {lan.payYes[currLan]}
              </Button>
            </div>
            <div style={{ textAlign: 'right', width: '50%' }}>
              <Button color="secondary" variant="contained"
                onClick={this.handlePayClose}
                className={classes.actionBtn}>
                {lan.payNo[currLan]}
              </Button>
            </div>
          </div>
        </DialogActions>
      </form>

    return <Dialog open={open} onClose={this.handlePayClose} fullWidth maxWidth="xs">
      {payContent}
    </Dialog>
  }
}

const mapStateToProps = state => {
  return {
    cardInfo: state.cardsInfo,
    language: state.menuItems.language
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DepDialogPay))