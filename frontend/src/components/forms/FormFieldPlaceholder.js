import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './FormFieldPlaceholder.css'

const FormFieldPlaceholder = ({ text, focused }) => (
  <span className={classNames(['FormFieldPlaceholder', focused && 'focused'])} >{text}</span>
)

FormFieldPlaceholder.propTypes = {
  text: PropTypes.string.isRequired
}

export default FormFieldPlaceholder
