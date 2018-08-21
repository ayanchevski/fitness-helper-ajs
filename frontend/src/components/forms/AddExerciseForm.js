import React, { PureComponent } from 'react'
import { ROUTES } from 'constants/router'
import {
  FORMS,
  FORM_FIELD_NAMES,
  ADD_EXERCISE_FORM_FIELDS
} from 'constants/forms'
import { FormContainer, TextFormField, NumberFormField } from 'components/forms'
import {validatePositveNumber} from 'utils/forms'
export default class AddExerciseForm extends PureComponent {
  renderField = ({ name, value, onChange }) => {
    const { isLoading } = this.props

    switch (name) {
      case FORM_FIELD_NAMES.NAME:
        return <TextFormField
          key={name}
          name={name}
          value={value}
          placeholder='Enter name'
          disabled={isLoading}
          onChange={onChange}
        />
      case FORM_FIELD_NAMES.CALORIES_PER_HOUR:
        return <NumberFormField
          key={name}
          name={name}
          value={value}
          placeholder='Enter calories burned per hour'
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
        fields={ADD_EXERCISE_FORM_FIELDS}
        title={title}
        className={className}
        isSubmitting={isLoading}
        submitButtonText={submitButtonText}
        renderField={this.renderField}
        onSubmit={onSubmit}
        initialValues={initialValues}
      />
    )
  }
}

AddExerciseForm.defaultProps = {
  title: 'Add exercise',
  submitButtonText: 'Add'
}