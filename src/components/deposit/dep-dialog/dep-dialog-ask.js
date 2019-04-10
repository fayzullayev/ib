import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Dialog, DialogContent, DialogActions, IconButton, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import Translations from '../../../translations/translations'
import imgPrev from '../prev-btn/img/prev.png'

const styles = theme => ({
  dlgContent: {
    border: '1px solid #e3e3e3',
    padding: '0 !important'
  },
  dlgActions: {
    padding: '10px 18px'
  },
  askingLabel: {
    fontSize: '18px',
    color: '#353a41',
    textAlign: 'center'
  },
  actionBtn: {
    ...theme.submit,
    width: '90%',
    margin: '0 !important',
    textTransform: 'initial'
  }
})

const DepDialogAsk = props => {
  const { classes, open, dialogAskClose, dialogAskPrev, executeOperation, language: currLan } = props
  
  if (!open) return false

  let lan = Translations.Deposits

  return <Dialog open={open} fullWidth maxWidth="xs">
    <DialogContent className={classes.dlgContent}>
      <div style={{ position: 'relative', padding: '70px 50px 45px 50px' }}>
        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
          <IconButton onClick={dialogAskPrev} style={{ width: '36px', height: '36px' }}>
            <img src={imgPrev} />
          </IconButton>
        </div>
        <div className={classes.askingLabel}>
          {lan.askText[currLan]}
        </div>
      </div>
    </DialogContent>
    <DialogActions className={classes.dlgActions}>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '50%' }}>
          <Button color="secondary" variant="contained"
            className={classes.actionBtn}
            onClick={dialogAskClose}>
            {lan.askNo[currLan]}
          </Button>
        </div>
        <div style={{ textAlign: 'right', width: '50%' }}>
          <Button color="secondary" variant="contained"
            className={classes.actionBtn}
            onClick={executeOperation}>
            {lan.askYes[currLan]}
          </Button>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DepDialogAsk))