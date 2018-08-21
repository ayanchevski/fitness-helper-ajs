import React, { PureComponent } from 'react'
import { ROUTES } from 'constants/router'
import {
  FORMS,
  FORM_FIELD_NAMES,
  ADD_PROGRESS_RECORD_FORM_FIELDS,
  MIN_DATE,
  MAX_DATE
} from 'constants/forms'
import { FormContainer, NumberFormField, DateFormField } from 'components/forms'
import { validatePositveNumber, getDate } from 'utils/forms'

export default class AddProgressRecordForm extends PureComponent {
  renderField = ({ name, value, onChange }) => {
    const { isLoading } = this.props
    switch (name) {
      case FORM_FIELD_NAMES.DATE:
        return <DateFormField
          key={name}
          name={name}
          value={value}
          placeholder='Enter date'
          disabled={isLoading}
          onChange={onChange}
          minDate={MIN_DATE}
          maxDate={MAX_DATE}
        />
      case FORM_FIELD_NAMES.WEIGHT:
        return <NumberFormField
          key={name}
          name={name}
          value={value}
          placeholder='Enter weight'
          validate={validatePositveNumber}
          disabled={isLoading}
          onChange={onChange}
        />
      default:
        break
    }
  }

  render() {
    const { className, onSubmit, isLoading, title, submitButtonText, initialValues } = this.props

    return (
      <FormContainer
        id={FORMS.ADD_EXERCISE}
        fields={ADD_PROGRESS_RECORD_FORM_FIELDS}
        title={title}
        className={className}
        isSubmitting={isLoading}
        submitButtonText={submitButtonText}
        renderField={this.renderField}
        initialValues={initialValues || { date: getDate()}}
        onSubmit={onSubmit}
      />
    )
  }
}

AddProgressRecordForm.defaultProps = {
  title: 'Add weight',
  submitButtonText: 'Add'
}