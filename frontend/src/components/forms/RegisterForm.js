import React, { PureComponent } from 'react'
import {
  FORMS,
  FORM_FIELD_NAMES,
  REGISTER_FORM_FIELDS
} from 'constants/forms'
import { FormContainer, PasswordFormField, TextFormField } from 'components/forms'

export default class RegisterForm extends PureComponent {
  renderField = ({ name, value, onChange }) => {
    const { isLoading } = this.props

    switch (name) {
      case FORM_FIELD_NAMES.USERNAME:
        return <TextFormField
          key={name}
          name={name}
          value={value}
          disabled={isLoading}
          onChange={onChange}
        />
      case FORM_FIELD_NAMES.PASSWORD:
        return <PasswordFormField
          key={name}
          name={name}
          value={value}
          disabled={isLoading}
          onChange={onChange}
        />
      default:
        break
    }
  }

  render() {
    const { onSubmit, isLoading } = this.props

    return (
      <FormContainer
        id={FORMS.REGISTER}
        fields={REGISTER_FORM_FIELDS}
        title='Create account'
        submitButtonText='Create'
        isSubmitting={isLoading}
        renderField={this.renderField}
        onSubmit={onSubmit}
      />
    )
  }
}