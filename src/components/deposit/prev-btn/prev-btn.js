import React from 'react'
import { Button } from '@material-ui/core'
import './prev-btn.css'
import { connect } from 'react-redux'
import Translations from '../../../translations/translations'
import imgPrev from './img/prev.png'

const PrevBtn = props => {
  let lan = Translations.Deposits
  const { language: currLan } = props

  return <Button onClick={() => props.history.goBack()} style={{ marginBottom: '10px' }}>
    <img src={imgPrev} />
    <span className="prev-btn-span">{lan.prevBtn[currLan]}</span>
  </Button>
}

const mapStateToProps = state => {
  return {
    language: state.menuItems.language,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PrevBtn)