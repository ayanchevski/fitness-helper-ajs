import React from 'react'
import PropTypes from 'prop-types'
import './FormError.css'

const FormError = ({ text }) => (
  <span className='FormError'>{text}</span>
)

FormError.propTypes = {
  text: PropTypes.string.isRequired
}

export default FormError
