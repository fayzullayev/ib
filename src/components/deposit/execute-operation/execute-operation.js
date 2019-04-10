import React, { Component } from 'react'
import Api from '../../../services/api'
import Waiting from '../../waiting'
import Success from '../../success'
import Error from '../../error'
import { connect } from 'react-redux'
import * as actionTypes from '../../../store/actions/Actions'

class ExecuteOperation extends Component {

  api = new Api()

  state = {
    success: undefined,
    waiting: true,
    error: ''
  }

  componentDidMount() {
    const { getData: { amount, cardNumber, depositType, depId, operId = false } = {} } = this.props
    let r
    if (!operId)
      r = {
        request: 'CREATE_DEPOSIT',
        message_type: 31,
        deposit_type: depositType,
        card_number: cardNumber,
        sum: amount
      }
    else
      r = {
        request: 'EXECUTE_DEPOSIT_OPERATION',
        message_type: 37,
        dep_id: depId,
        oper_id: operId,
        amount,
        card_number: cardNumber
      }
    this.api.SetAjax(r).then(data => {
      if (data.result === '0') {
        const r2 = {
          request: 'dep',
          request_code: 105
        }
        this.api.SetAjax(r2).then(data2 => {
          if (data2.result === '0') {
            this.props.depositsList({
              depositsJson: data2
            })
            this.setState({
              success: true,
              waiting: false
            })
          }
        }).catch(error => {
          this.setState({
            waiting: false,
            error
          })
        })
      } else {
        this.setState({
          waiting: false,
          error: data.msg
        })
      }
      this.props.executeOperation(null)
    }).catch(error => {
      this.setState({
        waiting: false,
        error
      })
      this.props.executeOperation(null)
    })
  }

  render() {
    const { waiting, success, error } = this.state

    if (waiting) return <Waiting />
    if (success) return <Success />
    if (!waiting && !success) return <Error text={error} />
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    depositsList: info =>
      dispatch({
        type: actionTypes.deposits,
        info
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecuteOperation)