import React, { Component, Fragment } from 'react'
import Api from '../../../services/api'
import { Grid, Button } from '@material-ui/core'
import DepMyItem from '../dep-my-item'
import PrevBtn from '../prev-btn'
import { connect } from 'react-redux'
import Translations from '../../../translations/translations'

const styles = {
  tabHeader: {
    borderBottom: '1px solid #e3e3e3'
  },
  tabBtn: {
    textTransform: 'initial',
    margin: '8px 0 8px 8px',
    padding: '6px 8px',
    fontSize: '16px',
    fontWeight: 'normal',
    letterSpacing: '-0.06px',
    color: '#9b9b9b',
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans- serif`
  }
}

class DepMy extends Component {

  api = new Api()

  state = {
    depMyData: this.props.depositsList.depositsJson.deposits,
    isValuta: false
  }

  componentDidUpdate(prevProps) {
    if (this.props.depositsList !== prevProps.depositsList) {
      this.setState({
        depMyData: this.props.depositsList
      })
    }
  }

  notValutaHandler = () =>
    this.setState({ isValuta: false })

  yesValutaHandler = () =>
    this.setState({ isValuta: true })

  render() {
    const { history, executeOperation, language: currLan } = this.props
    const { isValuta, depMyData } = this.state

    let lan = Translations.Deposits
    let uzDeposits = []
    let valDeposits = []

    for (let i = 0; i < depMyData.length; i++)
      if (depMyData[i].currency === '000')
        uzDeposits.push(depMyData[i])
      else
        valDeposits.push(depMyData[i])

    const helperStyle1 = !isValuta ? { color: 'black', fontWeight: 500 } : null
    const helperStyle2 = isValuta ? { color: 'black', fontWeight: 500 } : null

    return <Fragment>
      <PrevBtn history={history} />
      <div className="dep-container">
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} style={styles.tabHeader}>
            <Button style={{ ...styles.tabBtn, ...helperStyle1 }} onClick={this.notValutaHandler}>
              <span>{lan.depUzb[currLan]}</span>
            </Button>
            <Button style={{ ...styles.tabBtn, ...helperStyle2 }} onClick={this.yesValutaHandler}>
              <span>{lan.depVal[currLan]}</span>
            </Button>
          </Grid>
          {!isValuta && uzDeposits.map((currData, idx) =>
            <DepMyItem itemData={currData} id={idx} length={uzDeposits.length} cols={2} history={history}
              executeOperation={executeOperation} key={currData.dep_id} />)}
          {isValuta && valDeposits.map((currData, idx) =>
            <DepMyItem itemData={currData} id={idx} length={valDeposits.length} cols={2} history={history}
              executeOperation={executeOperation} key={currData.dep_id} />)}
        </Grid>
      </div>
    </Fragment>
  }
}

const mapStateToProps = state => {
  return {
    depositsList: state.deposits,
    language: state.menuItems.language
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DepMy)