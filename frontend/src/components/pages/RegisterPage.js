import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { RegisterForm } from 'components/forms'
import { register } from 'actions/account'
import { account } from 'constants/actionTypes'
import './RegisterPage.css'

class RegisterPage extends PureComponent {
  onRegisterFormSubmit = ({ username, password }) => {
    const { register } = this.props

    register({ username, password })
  }

  render() {
    const { isLoading } = this.props

    return (
      <div className='RegisterPage'>
        <RegisterForm
          isLoading={isLoading}
          onSubmit={this.onRegisterFormSubmit}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    isLoading: state.loaders.get(account.REGISTER)
  }),
  {
    register
  }
)(RegisterPage)
