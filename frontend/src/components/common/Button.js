import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Button.css'

const Button = ({
  text,
  className,
  textClassName,
  disabled,
  purple,
  isTextUpperCase,
  shouldRenderLoader,
  onClick
}) => (
    <button
      className={classNames([
        'Button',
        disabled && 'disabled',
        purple && 'purple'
      ])}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  )

Button.defaultProps = {
  type: 'button',
  isTextUpperCase: true,
  purple: true,
  onClick: () => {}
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  isTextUpperCase: PropTypes.bool,
  onClick: PropTypes.func
}

export default Button
