import React, { Fragment } from 'react'
import { Grid } from '@material-ui/core';
import PrevBtn from '../prev-btn'
import DepMenuItem from '../dep-menu-item'
import { connect } from 'react-redux'
import Translations from '../../../translations/translations'

const DepMenu = props => {
  let lan = Translations.Deposits
  const { language: currLan } = props

  const depMenuData = [
    { label: lan.depMy[currLan], menuPath: 'dep-my' },
    { label: lan.depOpen[currLan], menuPath: 'dep-open' },
    { label: lan.depCalc[currLan], menuPath: 'dep-calc' }
  ]

  return <Fragment>
    <PrevBtn history={props.history} />
    <div className="dep-container">
      <Grid container>
        {depMenuData.map((currData, idx) =>
          <DepMenuItem itemData={currData} id={idx} length={depMenuData.length} cols={2} key={currData.label} />
        )}
      </Grid>
    </div>
  </Fragment>
}

const mapStateToProps = state => {
  return {
    language: state.menuItems.language,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DepMenu)