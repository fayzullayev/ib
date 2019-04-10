import React, { Component } from 'react'
import { HashRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom'
import DepCalcForm from './dep-calc-form'
import DepCalcRes from './dep-calc-res'

class DepCalc extends Component {

  state = {
    calcData: undefined
  }

  setData = data => {
    this.setState({
      calcData: data
    })
  }

  render() {
    return <Router basename="/main">
      <Switch>
        <Route path="/deposits/dep-calc"
          exact
          render={props => <DepCalcForm {...props} setData={this.setData}
          />}
        />
        <Route path="/deposits/dep-calc/res"
          render={props => <DepCalcRes {...props} getData={this.state.calcData} />}
        />
        {this.state.calcData !== null
          ? <Redirect to="/deposits/dep-calc/res" />
          : null
        }
      </Switch>
    </Router>
  }
}

export default withRouter(DepCalc)