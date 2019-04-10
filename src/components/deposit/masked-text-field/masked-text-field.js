import React from 'react'
import PropTypes from 'prop-types'
import Cleave from 'cleave.js/react'

export default props => {
  const { inputRef, ...other } = props
  return <Cleave
    ref={inputRef}
    ref={ref => {
      inputRef(ref ? ref.inputElement : null)
    }}
    {...other}
    options={
      {
        numeralThousandsGroupStyle: "thousand",
        numeral: true,
        numeralIntegerScale: 10,
        numeralDecimalScale: 2,
        numeralDecimalMark: '.',
        delimiter: ' ',
        numeralPositiveOnly: true
      }
    }
    autoComplete="off"
  />
}