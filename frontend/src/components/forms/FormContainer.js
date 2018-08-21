import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form as ReactFinalForm } from 'react-final-form'
import { Form } from 'components/forms'
import { clearSubmitError } from 'actions/forms'
import createDecorator from 'final-form-focus'

const focusOnError = createDecorator()
const decorators = [focusOnError]

const FormContainer = ({
  id,
  title,
  fields,
  className,
  isSubmitting,
  submitButtonText,
  renderFooter,
  renderField,
  submitError,
  clearSubmitError,
  initialValues,
  onSubmit,
  validate
}) => (
  <ReactFinalForm
    onSubmit={onSubmit}
    decorators={decorators}
    validate={validate}
    initialValues={initialValues}
    render={({ handleSubmit, pristine, invalid }) => (
      <Form
        id={id}
        title={title}
        fields={fields}
        className={className}
        validateOnBlur
        submitButtonText={submitButtonText}
        renderFooter={renderFooter}
        isSubmitting={isSubmitting}
        submitError={submitError}
        renderField={renderField}
        clearSubmitError={clearSubmitError}
        onSubmit={handleSubmit}
      />
    )}
  />
)

FormContainer.propTypes = {
  fields: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  submitButtonText: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool,
  renderFooter: PropTypes.func,
  className: PropTypes.any
}

export default connect(
  (state, { id }) => ({
    submitError: state.forms.getIn([id, 'submitError'])
  }), {
    clearSubmitError
  }
)(FormContainer)
