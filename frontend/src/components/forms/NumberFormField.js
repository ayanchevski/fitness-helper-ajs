import React from 'react'
import { noop } from 'lodash'
import { Field } from 'react-final-form'
import { FormField } from 'components/forms'
import { validateNotEmpty } from 'utils/forms'
const NumberFormField = ({
  name,
  value,
  disabled,
  placeholder,
  validate,
  onChange
}) => (
  <Field
    name={name}
    type='number'
    disabled={disabled}
    currentValue={value}
    component={FormField}
    placeholder={placeholder}
    alwaysActivePlaceholder
    validate={validate}
    onChange={onChange}
  />
)

NumberFormField.defaultProps = {
  name: 'number',
  placeholder: 'Enter number',
  validate: validateNotEmpty,
  onChange: noop
}

export default NumberFormField
