import React from 'react'
import PropTypes from 'prop-types'
import './PageHeading.css'

const PageHeading = ({ text }) => (
  <span className='PageHeading'>{text}</span>
)

PageHeading.propTypes = {
  text: PropTypes.string.isRequired
}

export default PageHeading
