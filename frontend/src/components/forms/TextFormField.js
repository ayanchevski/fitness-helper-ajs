import React from 'react'
import { noop } from 'lodash'
import { Field } from 'react-final-form'
import { FormField } from 'components/forms'
import { validateNotEmpty } from 'utils/forms'

const TextFormField = ({
  name,
  value,
  disabled,
  placeholder,
  validate,
  onChange
}) => (
  <Field
    name={name}
    type='text'
    disabled={disabled}
    placeholder={placeholder}
    currentValue={value}
    component={FormField}
    validate={validate}
    onChange={onChange}
  />
  )

TextFormField.defaultProps = {
  name: 'text',
  placeholder: 'Enter username',
  validate: validateNotEmpty,
  onChange: noop
}

export default TextFormField
