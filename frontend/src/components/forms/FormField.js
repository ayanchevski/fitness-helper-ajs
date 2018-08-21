import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import classNames from 'classnames'
import { FormError, FormFieldPlaceholder } from 'components/forms'
import './FormField.css'

export default class FormField extends PureComponent {
  onChange = e => {
    const { input: { name, onChange }, handleChange } = this.props
    const value = e.target.value

    // Custom changes handling
    if (handleChange) {
      handleChange({ name, value })
    }

    // Update input value
    onChange(value)
  }

  render() {
    const {
      input,
      meta,
      type,
      placeholder,
      minDate,
      maxDate,
      currentValue,
      disabled,
      alwaysActivePlaceholder
    } = this.props
    const { name, value, onFocus, onBlur } = input
    const { error, touched, active } = meta
    const shouldDisplayError = touched && !active && !disabled && error
    const inputValue = currentValue || value

    return (
      <div className='FormField'>
        <FormFieldPlaceholder focused={alwaysActivePlaceholder || active || inputValue} text={placeholder} />
        <input
          className={classNames([
            active && 'focused',
            disabled && 'disabled',
            shouldDisplayError && 'errorInput'
          ])}
          type={type}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          value={inputValue}
          onChange={this.onChange}
          min={minDate}
          max={maxDate}
        />
        <span className="error" >{shouldDisplayError ? error : ''}</span>
      </div>
    )
  }
}

FormField.defaultProps = {
  type: 'text',
  disabled: false,
  alwaysActivePlaceholder: false
}

FormField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  currentValue: PropTypes.any,
  disabled: PropTypes.bool,
  alwaysActivePlaceholder: PropTypes.bool,
  input: PropTypes.object,
  meta: PropTypes.object,
}