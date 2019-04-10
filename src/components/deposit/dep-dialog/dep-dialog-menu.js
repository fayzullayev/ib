import React, { Component } from 'react'
import Api from '../../../services/api'
import { withStyles } from '@material-ui/core/styles'
import { Dialog, DialogContent, IconButton, Button } from '@material-ui/core'
import Waiting from '../../waiting'
import Error from '../../error'
import imgPrev from '../prev-btn/img/prev.png'

const styles = theme => ({
  dgContent: {
    padding: '0 16px 20px 16px !important'
  },
  actionBtn: {
    ...theme.submit,
    width: '100% !important',
    margin: '0px !important',
    whiteSpace: 'nowrap !important',
    textTransform: 'initial !important'
  },
  prevContent: {
    position: 'relative',
    margin: '0 -16px',
    height: '40px'
  },
  prevInside: {
    position: 'absolute',
    top: '0px',
    left: '0px'
  },
  prevBtn: {
    width: '36px',
    height: '36px',
    margin: '2px'
  }
})

class DepDialogMenu extends Component {

  api = new Api()

  state = {
    depOperations: null,
    waiting: true,
    error: ''
  }

  componentDidMount() {
    if (this.props.open) {
      const r = {
        request: 'GET_DEPOSIT_OPERATIONS',
        message_type: 34,
        dep_id: this.props.depId
      }
      this.api.SetAjax(r).then(data => {
        if (data.result === '0' && data.msg === '') {
          this.setState({
            depOperations: data.dep_operations,
            waiting: false
          })
        } else {
          this.setState({
            waiting: false,
            error: data.msg
          })
        }
      }).catch(error => {
        this.setState({
          waiting: false,
          error
        })
      })
    }
  }

  componentDidUpdate() {
    if (this.props.open) {
      const r = {
        request: 'GET_DEPOSIT_OPERATIONS',
        message_type: 34,
        dep_id: this.props.depId
      }
      this.api.SetAjax(r).then(data => {
        if (data.result === '0' && data.msg === '') {
          this.setState({
            depOperations: data.dep_operations,
            waiting: false
          })
        } else {
          this.setState({
            waiting: false,
            error: data.msg
          })
        }
      }).catch(error => {
        this.setState({
          waiting: false,
          error
        })
      })
    }
  }

  handleMenuClose = () => {
    this.clearState()
    this.props.dialogMenuClose()
  }

  handleMenuPrev = () => {
    this.clearState()
    this.props.dialogMenuPrev()
  }

  handlePayOpen = operId => {
    this.clearState()
    this.props.dialogPayOpen(operId)
  }

  clearState = () => {
    setTimeout(() => {
      this.setState({
        depOperations: null,
        waiting: true,
        error: ''
      })
    }, 300)
  }

  render() {
    const { classes, open } = this.props

    if (!open) return false

    const { depOperations, waiting, error } = this.state
    let menuContent

    if (waiting) menuContent = <Waiting />
    else if (error) menuContent = <Error text={error} />
    else
      menuContent = <DialogContent className={classes.dgContent}>
        <div className={classes.prevContent}>
          <div className={classes.prevInside}>
            <IconButton onClick={this.handleMenuPrev} className={classes.prevBtn}>
              <img src={imgPrev} />
            </IconButton>
          </div>
        </div>
        {depOperations.map(d => {
          return <div style={{ marginBottom: '12px' }} key={d.oper_id}>
            <Button color="secondary" variant="contained"
              className={classes.actionBtn}
              onClick={() => this.handlePayOpen(d.oper_id)}>
              {d.name}
            </Button>
          </div>
        })}
      </DialogContent>

    return <Dialog open={open} onClose={this.handleMenuClose} fullWidth maxWidth="xs">
      {menuContent}
    </Dialog>
  }
}

export default withStyles(styles)(DepDialogMenu)