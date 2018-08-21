import React from 'react'
import { noop } from 'lodash'
import { Field } from 'react-final-form'
import { FormField } from 'components/forms'
import { validateNotEmpty } from 'utils/forms'

const PasswordFormField = ({
  name,
  value,
  disabled,
  placeholder,
  validate,
  onChange
}) => (
  <Field
    name={name}
    type='password'
    disabled={disabled}
    placeholder={placeholder}
    currentValue={value}
    component={FormField}
    validate={validate}
    handleChange={onChange}
  />
  )

PasswordFormField.defaultProps = {
  name: 'password',
  placeholder: 'Enter password',
  validate: validateNotEmpty,
  onChange: noop
}

export default PasswordFormField
