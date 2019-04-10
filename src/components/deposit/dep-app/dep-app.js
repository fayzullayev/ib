import React from 'react'
import { HashRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom'
import DepMenu from '../dep-menu'
import DepMy from '../dep-my'
import DepOpen from '../dep-open'
import DepCalc from '../dep-calc'
import ExecuteOperation from '../execute-operation'
import './dep-app.css'

class DepApp extends React.Component {

  state = {
    operData: undefined
  }

  executeOperation = data => {
    this.setState({
      operData: data
    })
  }

  render() {
    return (
      <Router basename="/main">
        <Switch>
          <Route path="/deposits" component={DepMenu} exact />
          <Route path="/deposits/dep-my"
            render={props => <DepMy {...props} executeOperation={this.executeOperation} />}
          />
          <Route path="/deposits/dep-open"
            render={props => <DepOpen {...props} executeOperation={this.executeOperation} />}
          />
          <Route path="/deposits/dep-calc" component={DepCalc} />
          <Route path="/deposits/exe-oper"
            render={props => <ExecuteOperation {...props}
              executeOperation={this.executeOperation}
              getData={this.state.operData} />}
          />
          {this.state.operData !== null
            ? <Redirect to="/deposits/exe-oper" />
            : null
          }
        </Switch>
      </Router>
    )

  }
}


export default withRouter(DepApp);