import React, { PureComponent } from 'react'
import { ROUTES } from 'constants/router'
import {
  FORMS,
  FORM_FIELD_NAMES,
  LOGIN_FORM_FIELDS
} from 'constants/forms'
import { FormContainer, TextFormField, PasswordFormField } from 'components/forms'

export default class LoginForm extends PureComponent {
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
    const { className, onSubmit, isLoading } = this.props

    return (
      <FormContainer
        id={FORMS.LOGIN}
        fields={LOGIN_FORM_FIELDS}
        title='Login'
        className={className}
        isSubmitting={isLoading}
        submitButtonText='Log in'
        renderField={this.renderField}
        onSubmit={onSubmit}
      />
    )
  }
}