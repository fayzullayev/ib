import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import Translations from '../../../translations/translations'

const styles = theme => ({
  dlgTitle: {
    padding: '16px 16px 10px 16px'
  },
  dlgContent: {
    borderTop: '1px solid #e3e3e3',
    borderBottom: '1px solid #e3e3e3',
    padding: '16px',
    fontSize: '12px',
    letterSpacing: '-0.2px'
  },
  dlgActions: {
    padding: '9px'
  },
  gridBottom: {
    marginBottom: '13px'
  },
  actionBtn: {
    ...theme.submit,
    margin: '0 auto !important',
    padding: '12px 36px',
    textTransform: 'initial',
    whiteSpace: 'nowrap'
  }
})

const DepDialogForm = props => {

  const { classes, open, dialogFormClose, dialogPayOpen, language: currLan } = props
  
  if (!open) return false
  
  const { name, currency_name, keeping_time_type,
    deposit_types: [{
      deposit_type_name,
      min_sum,
      percent,
      additional_info,
    }] = [] } = props.itemData
  let lan = Translations.Deposits

  let keepingTimeType
  switch (keeping_time_type) {
    case 'M': keepingTimeType = lan.depMonth[currLan]
      break;
    default: keepingTimeType = null
  }
  const termOfDeposit = deposit_type_name + keepingTimeType

  let currencyType
  switch (currency_name) {
    case 'UZS': currencyType = lan.depUZS[currLan]
      break
    case 'USD': currencyType = lan.depUSD[currLan]
      break
    default: currencyType = null
  }
  const minSum = min_sum.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + currencyType

  return <Dialog open={open} onClose={dialogFormClose} fullWidth maxWidth="xs">
    <DialogTitle className={classes.dlgTitle}>
      <span style={{ fontSize: 16, fontWeight: 500 }}>{name}</span>
    </DialogTitle>
    <DialogContent className={classes.dlgContent}>
      <Grid container>
        <Grid item xs={12}>
          <TextField label={lan.formTerm[currLan]} defaultValue={termOfDeposit}
            InputProps={{ readOnly: true }} className={classes.gridBottom} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label={lan.formPercent[currLan]} defaultValue={`${percent}%`}
            InputProps={{ readOnly: true }} className={classes.gridBottom} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label={lan.formMinSum[currLan]} defaultValue={minSum}
            InputProps={{ readOnly: true }} className={classes.gridBottom} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label={lan.formCurrency[currLan]} defaultValue={currency_name}
            InputProps={{ readOnly: true }} className={classes.gridBottom} fullWidth />
        </Grid>
        <Grid item xs={12}>
          {additional_info}
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions className={classes.dlgActions}>
      <Button color="secondary" variant="contained" className={classes.actionBtn} onClick={dialogPayOpen}>
        {lan.formBtn[currLan]}
      </Button>
    </DialogActions>
  </Dialog>
}

const mapStateToProps = state => {
  return {
    language: state.menuItems.language,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DepDialogForm))