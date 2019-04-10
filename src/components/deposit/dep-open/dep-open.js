import React, { Component, Fragment } from 'react'
import Api from '../../../services/api'
import { Grid } from '@material-ui/core'
import PrevBtn from '../prev-btn';
import DepOpenItem from '../dep-open-item'
import Waiting from '../../waiting'
import Error from '../../error'

export default class extends Component {

  api = new Api()

  state = {
    depOpenData: null,
    waiting: true,
    error: ''
  }

  componentDidMount() {
    const r = {
      request: "GET_DEPOSIT_TYPES",
      message_type: 30
    }
    this.api.SetAjax(r).then(data => {
      if (data.result === '0' && data.msg === '') {
        this.setState({
          depOpenData: data.deposit_group_types,
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
    const { history, executeOperation } = this.props
    const { depOpenData, waiting, error } = this.state

    if (waiting) return <Waiting />

    if (error) return <Error text={error} />

    return <Fragment>
      <PrevBtn history={history} />
      <div className="dep-container">
        <Grid container>
          {depOpenData.map((currData, idx) =>
            <DepOpenItem itemData={currData} id={idx} length={depOpenData.length} cols={2}
              history={history} key={currData.name} executeOperation={executeOperation} />
          )}
        </Grid>
      </div>
    </Fragment>
  }
}