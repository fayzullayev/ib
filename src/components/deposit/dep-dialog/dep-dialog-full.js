import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import Translations from '../../../translations/translations'

const styles = theme => ({
  dlgTitle: {
    padding: '16px 16px 10px 16px',
    fontWeight: '300 !important'
  },
  dlgContent: {
    borderTop: '1px solid #e3e3e3',
    borderBottom: '1px solid #e3e3e3',
    padding: '0 12px !important'
  },
  dlgActions: {
    padding: '10px'
  },
  dlgLeft: {
    fontSize: '12px',
    borderRight: '1px solid #e3e3e3',
    color: 'black',
    paddingBottom: '10px'
  },
  dlgRight: {
    textAlign: 'right',
    fontSize: '12px',
    fontWeight: 500,
    color: '#4a90e2',
    paddingBottom: '10px'
  },
  actionBtn: {
    ...theme.submit,
    margin: '0 auto !important',
    padding: '12px 36px',
    textTransform: 'initial'
  }
})

const DepDialogFull = props => {

  const { classes, open, dialogFullClose, dialogMenuOpen, language: currLan } = props

  if (!open) return false

  let lan = Translations.Deposits
  const { name, crated_date, start_sum, currency_name, percent, current_amount, percent_amount,
    main_account, percent_account, end_date, closed_date, closed_day, state_name } = props.itemData

  return <Dialog open={open} onClose={dialogFullClose} fullWidth maxWidth="xs">
    <DialogTitle className={classes.dlgTitle}>
      <span style={{ fontSize: 16, fontWeight: 500 }}>{name}</span>
    </DialogTitle>
    <DialogContent className={classes.dlgContent}>
      <Grid container>
        <Grid item xs={6} className={classes.dlgLeft} style={{ paddingTop: '12px' }}>{lan.fullName[currLan]}</Grid>
        <Grid item xs={6} className={classes.dlgRight} style={{ paddingTop: '12px' }}>{name}</Grid>

        <Grid item xs={6} className={classes.dlgLeft}>{lan.fullCreatedDate[currLan]}</Grid>
        <Grid item xs={6} className={classes.dlgRight}>{crated_date}</Grid>

        <Grid item xs={6} className={classes.dlgLeft}>{lan.fullStartSum[currLan]}</Grid>
        <Grid item xs={6} className={classes.dlgRight}>{start_sum} {currency_name}</Grid>

        <Grid item xs={6} className={classes.dlgLeft}>{lan.fullPercent[currLan]}</Grid>
        <Grid item xs={6} className={classes.dlgRight}>{parseInt(percent)}%</Grid>

        <Grid item xs={6} className={classes.dlgLeft}>{lan.fullCurrentAmount[currLan]}</Grid>
        <Grid item xs={6} className={classes.dlgRight}>{current_amount} {currency_name}</Grid>

        <Grid item xs={6} className={classes.dlgLeft}>{lan.fullPercentAmmount[currLan]}</Grid>
        <Grid item xs={6} className={classes.dlgRight}>{percent_amount} {currency_name}</Grid>

        <Grid item xs={6} className={classes.dlgLeft}>{lan.fullMainAccount[currLan]}</Grid>
        <Grid item xs={6} className={classes.dlgRight}>{main_account}</Grid>

        <Grid item xs={6} className={classes.dlgLeft}>{lan.fullPercentAccount[currLan]}</Grid>
        <Grid item xs={6} className={classes.dlgRight}>{percent_account}</Grid>

        <Grid item xs={6} className={classes.dlgLeft}>{lan.fullEndDate[currLan]}</Grid>
        <Grid item xs={6} className={classes.dlgRight}>{end_date}</Grid>

        <Grid item xs={6} className={classes.dlgLeft}>{lan.fullClosedDate[currLan]}</Grid>
        <Grid item xs={6} className={classes.dlgRight}>{closed_date}</Grid>

        <Grid item xs={6} className={classes.dlgLeft}>{lan.fullClosedDay[currLan]}</Grid>
        <Grid item xs={6} className={classes.dlgRight}>{closed_day}</Grid>

        <Grid item xs={6} className={classes.dlgLeft} style={{ paddingBottom: '12px' }}>{lan.fullState[currLan]}</Grid>
        <Grid item xs={6} className={classes.dlgRight} style={{ paddingBottom: '12px' }}>{state_name}</Grid>
      </Grid>
    </DialogContent>
    <DialogActions className={classes.dlgActions}>
      <Button className={classes.actionBtn} color="secondary" variant="contained" onClick={dialogMenuOpen}>
        {lan.fullBtn[currLan]}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DepDialogFull))