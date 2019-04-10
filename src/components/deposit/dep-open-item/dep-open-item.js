import React, { Component, Fragment } from 'react'
import Api from '../../../services/api'
import { Grid } from '@material-ui/core'
import { DepDialogInfo, DepDialogForm, DepDialogPay, DepDialogAsk } from '../dep-dialog';
import { withWindowDemensions, helperStyle } from '../../helper-style'
import { connect } from 'react-redux'
import Translations from '../../../translations/translations'

class DepOpenItem extends Component {

  api = new Api()

  state = {
    openInfo: false,
    openForm: false,
    openPay: false,
    openAsk: false,
    amount: '',
    cardNumber: ''
  }

  dialogInfoOpen = () => this.setState({ openInfo: true })
  dialogInfoClose = () => this.setState({ openInfo: false })

  dialogFormOpen = () => this.setState({
    openInfo: false,
    openForm: true
  })
  dialogFormClose = () => this.setState({ openForm: false })

  dialogPayOpen = () => this.setState({
    openForm: false,
    openPay: true
  })
  dialogPayClose = () => this.setState({
    amount: '',
    cardNumber: '',
    openPay: false
  })
  dialogPayPrev = () => this.setState({
    amount: '',
    cardNumber: '',
    openPay: false,
    openForm: true
  })

  dialogAskOpen = (amount, cardNumber) => this.setState({
    amount,
    cardNumber,
    openPay: false,
    openAsk: true
  })

  dialogAskClose = () => this.setState({ openAsk: false })
  dialogAskPrev = () => this.setState({
    openAsk: false,
    openPay: true
  })

  executeOperation = depositType => {
    const res = {
      depositType,
      amount: this.state.amount,
      cardNumber: this.state.cardNumber
    }
    this.props.executeOperation(res)
    this.props.history.push('/deposits/exe-oper')
  }

  formatCurrency = currency =>
    currency.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')

  render() {
    const { itemData, language: currLan } = this.props
    const { openInfo, openForm, openPay, openAsk, amount, cardNumber } = this.state
    const { name, currency, deposit_types: [{ percent, min_sum, deposit_type }] = [] } = itemData
    const additionalStyle = helperStyle(this.props)
    let lan = Translations.Deposits

    let currencyType
    switch (currency) {
      case '000': currencyType = ' UZS'
        break
      case '840': currencyType = ' USD'
        break
      default: currencyType = null
    }

    const minSum = this.formatCurrency(min_sum) + currencyType

    return <Fragment>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <div className="dep-item" style={{ padding: '16px 25px 16px 24px', ...additionalStyle }} onClick={this.dialogInfoOpen}>
          <Grid container spacing={8}>
            <Grid item xs={7}><div className="dep-item-label">{name}</div></Grid>
            <Grid item xs={5}><div className="dep-item-percent">{percent}%</div></Grid>
            <Grid item xs={7}><div className="dep-item-prop">{lan.minSum[currLan]}</div></Grid>
            <Grid item xs={5}><div className="dep-item-value" style={{ color: '#ffc004' }}>{minSum}</div></Grid>
          </Grid>
        </div>
      </Grid>
      <DepDialogInfo open={openInfo}
        dialogFormOpen={this.dialogFormOpen}
        dialogInfoClose={this.dialogInfoClose}
        itemData={name}
      />
      <DepDialogForm open={openForm}
        dialogPayOpen={this.dialogPayOpen}
        dialogFormClose={this.dialogFormClose}
        itemData={itemData}
      />
      <DepDialogPay open={openPay}
        currency={currency}
        amount={amount}
        cardNumber={cardNumber}
        dialogAskOpen={this.dialogAskOpen}
        dialogPayPrev={this.dialogPayPrev}
        dialogPayClose={this.dialogPayClose}
      />
      <DepDialogAsk open={openAsk}
        executeOperation={() => this.executeOperation(deposit_type)}
        dialogAskPrev={this.dialogAskPrev}
        dialogAskClose={this.dialogAskClose}
      />
    </Fragment>
  }
}

const mapStateToProps = state => {
  return {
    language: state.menuItems.language,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withWindowDemensions(DepOpenItem))