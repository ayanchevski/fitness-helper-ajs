import React, { PureComponent } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { setReferrer } from 'actions/login-flow'

class PublicRoute extends PureComponent {
  render () {
    const { isAuthenticated, shouldKillAuthenticated, sessionError, setReferrer, ...rest } = this.props

    if (isAuthenticated && shouldKillAuthenticated) {
      return <Redirect to='/' {...rest} />
    }

    return <Route {...rest} />
  }
}

PublicRoute.contextTypes = {
  router: PropTypes.object.isRequired
}

PublicRoute.propTypes = {
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
)(PublicRoute)
