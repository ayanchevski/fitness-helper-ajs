import React from 'react'
import { noop } from 'lodash'
import { Field } from 'react-final-form'
import { FormField } from 'components/forms'
import { validateNotEmpty } from 'utils/forms'

const DateFormField = ({
  name,
  value,
  disabled,
  placeholder,
  validate,
  onChange,
  minDate,
  maxDate
}) => (
    <Field
      name={name}
      type='date'
      disabled={disabled}
      placeholder={placeholder}
      alwaysActivePlaceholder
      currentValue={value}
      component={FormField}//toq e zadaljitele ili func
      validate={validate}
      onChange={onChange}
      minDate={minDate}
      maxDate={maxDate}
    />
  )

DateFormField.defaultProps = {
  name: 'date',
  placeholder: 'Enter date',
  validate: validateNotEmpty,
  onChange: noop
}

export default DateFormField
