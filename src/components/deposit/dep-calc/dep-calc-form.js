import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, TextField, MenuItem, Button } from '@material-ui/core'
import PrevBtn from '../prev-btn'
import MaskedTextField from '../masked-text-field'
import './dep-calc.css'
import { connect } from 'react-redux'
import Translations from '../../../translations/translations'

const styles = theme => ({
  gridBottom: {
    marginBottom: '13px'
  },
  actionBtn: {
    ...theme.submit,
    margin: '0 !important',
    padding: '12px 36px',
    textTransform: 'initial'
  }
})

class DepCalcForm extends Component {

  state = {
    typeDate: Translations.Deposits.calcDay[this.props.language],
    date: '',
    percent: '',
    amount: ''
  }

  handleChange = name => event =>
    this.setState({ [name]: event.target.value })

  handleChangeAmount = event =>
    this.setState({ amount: event.target.value })

  onCalculate = event => {
    event.preventDefault()
    const { language: currLan } = this.props
    let lan = Translations.Deposits

    let formatDate
    switch (this.state.typeDate) {
      case lan.calcDay[currLan]: formatDate = 'D'
        break
      case lan.calcMonth[currLan]: formatDate = 'M'
        break
      case lan.calcYear[currLan]: formatDate = 'Y'
        break
      default:
    }

    const res = {
      typeDate: formatDate,
      date: this.state.date,
      percent: this.state.percent,
      amount: this.state.amount
    }
    this.props.setData(res)
    this.props.history.push('/deposits/dep-calc/res')
  }

  render() {
    const { history, classes, language: currLan } = this.props
    let lan = Translations.Deposits
    const { typeDate, date, percent, amount } = this.state
    const data = [lan.calcDay[currLan], lan.calcMonth[currLan], lan.calcYear[currLan]]

    return <form onSubmit={this.onCalculate}>
      <PrevBtn history={history} />
      <div className="dep-container">
        <div className="dep-calc-form">
          <Grid container>
            <Grid item xs={12}>
              <TextField
                select
                label={lan.calcDateType[currLan]}
                value={typeDate}
                onChange={this.handleChange('typeDate')}
                fullWidth
                className={classes.gridBottom}
              >
                {data.map(d =>
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label={lan.calcDate[currLan]}
                value={date}
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                onChange={this.handleChange('date')}
                fullWidth
                className={classes.gridBottom}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label={lan.calcPercent[currLan]}
                value={percent}
                type="number"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                onChange={this.handleChange('percent')}
                fullWidth
                className={classes.gridBottom}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label={lan.calcAmount[currLan]}
                value={amount}
                onChange={this.handleChangeAmount}
                fullWidth
                style={{ marginBottom: '24px' }}
                InputProps={{
                  inputComponent: MaskedTextField
                }}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button className={classes.actionBtn} type="submit" color="secondary" variant="contained">
                {lan.calcBtn[currLan]}
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DepCalcForm))