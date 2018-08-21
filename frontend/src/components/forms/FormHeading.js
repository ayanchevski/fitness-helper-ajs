import React from 'react'
import PropTypes from 'prop-types'
import './FormHeading.css'

const FormHeading = ({ text, className }) => (
  <span className='FormHeading'>{text}</span>
)

FormHeading.propTypes = {
  text: PropTypes.string.isRequired
}

export default FormHeading
