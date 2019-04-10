import React, { Component, Fragment } from 'react'
import { Grid } from '@material-ui/core'
import { DepDialogFull, DepDialogMenu, DepDialogPay, DepDialogAsk } from '../dep-dialog';
import { withWindowDemensions, helperStyle } from '../../helper-style'

class DepMyItem extends Component {

  state = {
    openFull: false,
    openMenu: false,
    openPay: false,
    openAsk: false,
    operId: '',
    amount: '',
    cardNumber: ''
  }

  dialogFullOpen = () => this.setState({ openFull: true })
  dialogFullClose = () => this.setState({ openFull: false })

  dialogMenuOpen = () => this.setState({
    openFull: false,
    openMenu: true
  })
  dialogMenuClose = () => this.setState({ openMenu: false })
  dialogMenuPrev = () => this.setState({
    operId: '',
    openMenu: false,
    openFull: true
  })

  dialogPayOpen = operId => this.setState({
    operId,
    openMenu: false,
    openPay: true
  })
  dialogPayClose = () => {
    this.clearState()
    this.setState({ openPay: false })
  }
  dialogPayPrev = () => {
    this.clearState()
    this.setState({
      openPay: false,
      openMenu: true
    })
  }

  dialogAskOpen = (amount, cardNumber) => this.setState({
    amount,
    cardNumber,
    openPay: false,
    openAsk: true
  })
  dialogAskClose = () => {
    this.clearState()
    this.setState({ openAsk: false })
  }
  dialogAskPrev = () => this.setState({
    openAsk: false,
    openPay: true
  })

  executeOperation = () => {
    const { operId, amount, cardNumber } = this.state
    const res = {
      depId: this.props.itemData.dep_id,
      operId,
      amount,
      cardNumber
    }
    this.props.executeOperation(res)
    this.props.history.push('/deposits/exe-oper')
  }

  clearState = () => this.setState({
    operId: '',
    amount: '',
    cardNumber: ''
  })

  render() {
    const { itemData } = this.props
    const { name, percent, currency, current_amount, currency_name, percent_amount, end_date, dep_id } = itemData
    const { openFull, openMenu, openPay, openAsk, amount, cardNumber } = this.state
    const additionalStyle = helperStyle(this.props)

    return <Fragment>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <div className="dep-item" style={{ padding: '16px 24px', ...additionalStyle }} onClick={this.dialogFullOpen}>
          <Grid container spacing={8}>
            <Grid item xs={7}><div className="dep-item-label">{name}</div></Grid>
            <Grid item xs={5}><div className="dep-item-percent">{parseInt(percent)}%</div></Grid>
            <Grid item xs={7}><div className="dep-item-prop">Остаток</div></Grid>
            <Grid item xs={5}><div className="dep-item-value">{current_amount} {currency_name}</div></Grid>
            <Grid item xs={7}><div className="dep-item-prop">Начисление проценты</div></Grid>
            <Grid item xs={5}><div className="dep-item-value">{percent_amount} {currency_name}</div></Grid>
            <Grid item xs={7}><div className="dep-item-prop">Срок окончание</div></Grid>
            <Grid item xs={5}><div className="dep-item-value">{end_date || '__.__.____'}</div></Grid>
          </Grid>
        </div>
      </Grid>
      <DepDialogFull
        open={openFull}
        dialogMenuOpen={this.dialogMenuOpen}
        dialogFullClose={this.dialogFullClose}
        itemData={itemData}
      />
      <DepDialogMenu
        open={openMenu}
        depId={dep_id}
        dialogPayOpen={this.dialogPayOpen}
        dialogMenuPrev={this.dialogMenuPrev}
        dialogMenuClose={this.dialogMenuClose}
      />
      <DepDialogPay
        open={openPay}
        currency={currency}
        amount={amount}
        cardNumber={cardNumber}
        dialogAskOpen={this.dialogAskOpen}
        dialogPayPrev={this.dialogPayPrev}
        dialogPayClose={this.dialogPayClose}
      />
      <DepDialogAsk
        open={openAsk}
        executeOperation={this.executeOperation}
        dialogAskPrev={this.dialogAskPrev}
        dialogAskClose={this.dialogAskClose}
      />
    </Fragment>
  }
}

export default withWindowDemensions(DepMyItem)