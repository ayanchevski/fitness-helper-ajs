import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { noop } from 'lodash'
import { Button } from 'components/common'
import { FormHeading, FormError } from 'components/forms'
import './Form.css'

class Form extends PureComponent {
  state = {}

  componentWillMount() {
    const { fields } = this.props

    fields.map(({ name, value = '' }) => this.setState(() => ({ [name]: value })))
  }

  setValue = ({ name, value }) => this.setState(() => ({ [name]: value }))

  onChange = ({ name, value }) => {
    const { id, submitError, clearSubmitError } = this.props

    if (submitError) {
      clearSubmitError(id)
    }

    // Set value in the local state
    this.setValue({ name, value })
  }

  renderFormHeading() {
    const { title, submitError } = this.props

    return (
      <FormHeading
        text={title}
        className={classNames([
          'heading',
          submitError && 'noMargin'
        ])}
      />
    )
  }

  renderSubmitError = () => {
    const { submitError } = this.props

    return (
      <FormError text={submitError} />
    )
  }

  renderField = ({ name, type }) => {
    const { renderField } = this.props
    return renderField({
      name,
      type,
      value: this.state[name],
      onChange:this.onChange
    })
  }

  render() {
    const {
      title,
      fields,
      className,
      isSubmitting,
      submitButtonText,
      submitError,
      renderFooter,
      onSubmit
    } = this.props

    return <form
      noValidate
      className={classNames([
        'Form',
        className
      ])}
      onSubmit={onSubmit}
    >
      {title && this.renderFormHeading()}
      {submitError && this.renderSubmitError()}
      {fields.map(this.renderField)}
      <Button
        type='submit'
        text={submitButtonText}
        shouldRenderLoader={isSubmitting}
        disabled={isSubmitting}
      />
      {renderFooter()}
    </form>
  }
}

Form.defaultProps = {
  submitButtonText: 'label.submit',
  isSubmitting: false,
  renderFooter: noop
}

Form.propTypes = {
  fields: PropTypes.array.isRequired,
  clearSubmitError: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  submitButtonText: PropTypes.string.isRequired,
  submitError: PropTypes.string,
  isSubmitting: PropTypes.bool,
  renderField: PropTypes.func,
  renderFooter:PropTypes.func,
  className: PropTypes.any,
}

export default Form