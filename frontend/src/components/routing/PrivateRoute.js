import React, { PureComponent } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { setReferrer } from 'actions/login-flow'

class PrivateRoute extends PureComponent {
  render() {
    const { isAuthenticated, setReferrer, ...rest } = this.props

    if (isAuthenticated) {
      return <Route {...rest} />
    }

    setReferrer({
      referrer: this.context.router.route.location.pathname
    })

    return <Redirect to='/login' />
  }
}

PrivateRoute.contextTypes = {
  router: PropTypes.object.isRequired
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.any,
  setReferrer: PropTypes.func.isRequired
}

export default connect(
  state => ({
    isAuthenticated: state.account.get('isAuthenticated')
  }),
  {
    setReferrer
  }
)(PrivateRoute)
