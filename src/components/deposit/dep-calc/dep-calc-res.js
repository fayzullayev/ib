import React, { Component, Fragment } from 'react'
import Api from '../../../services/api'
import PrevBtn from '../prev-btn'
import Waiting from '../../waiting'
import Error from '../../error'

class DepCalcRes extends Component {

  api = new Api()

  state = {
    calcResContent: null,
    waiting: true,
    error: ''
  }

  componentDidMount() {
    const { getData: { typeDate, date, percent, amount } = {} } = this.props

    const r = {
      request: 'CALC_DEPOSITE_MANUAL',
      message_type: 39,
      term: date + typeDate,
      percent,
      capitalization: '',
      amount
    }

    this.api.SetAjax(r).then(data => {
      if (data.result === '0') {
        this.setState({
          calcResContent: data.msg,
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

  render() {
    const { history } = this.props
    const { calcResContent, waiting, error } = this.state

    if (waiting) return <Waiting />

    if (error) return <Error text={error} />

    return <Fragment>
      <PrevBtn history={history} />
      <div className="dep-container">
        <div className="dep-calc-res" dangerouslySetInnerHTML={{ __html: calcResContent }}></div>
      </div>
    </Fragment>
  }
}

export default DepCalcRes