import React from 'react'
import { Grid } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import './dep-menu-item.css'
import { withWindowDemensions, helperStyle } from '../../helper-style'
import imgMy from './img/dep-my.png'
import imgOpen from './img/dep-open.png'
import imgCalc from './img/dep-calc.png'

const styles = {
  linkStyle: {
    textDecoration: 'none',
    color: 'black'
  }
}

const DepMenuItem = props => {
  const { label, menuPath } = props.itemData
  const { key, itemData, ...others } = props
  const additionalStyle = helperStyle(others)
  let icon

  switch (menuPath) {
    case 'dep-my': icon = imgMy
      break
    case 'dep-open': icon = imgOpen
      break
    case 'dep-calc': icon = imgCalc
      break
    default:
  }

  return <Grid item xs={12} sm={12} md={6} lg={6} key={menuPath}>
    <NavLink to={`/deposits/${menuPath}`} style={styles.linkStyle}>
      <div className="dep-item dep-menu-item" style={additionalStyle}>
        <Grid container alignItems="center">
          <Grid item><img src={icon} /></Grid>
          <Grid item><span className="dep-item-label">{label}</span></Grid>
        </Grid>
      </div>
    </NavLink>
  </Grid>
}

export default withWindowDemensions(DepMenuItem)