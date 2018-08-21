import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { LoginForm } from 'components/forms'
import { logIn } from 'actions/account'
import { account } from 'constants/actionTypes'
import './LoginPage.css'

class LoginPage extends PureComponent {
  onLoginFormSubmit = ({ username, password }) => {
    const { logIn } = this.props

    logIn({ username, password })
  }
 
  render() {
    const { isLoading } = this.props

    return (
      <div className='LoginPage'>
        <LoginForm
          isLoading={isLoading}
          onSubmit={this.onLoginFormSubmit}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    isLoading: state.loaders.get(account.LOG_IN)
  }),
  {
    logIn
  }
)(LoginPage)
