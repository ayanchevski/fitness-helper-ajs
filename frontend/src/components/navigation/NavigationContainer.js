import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import SvgIcon from 'react-icons-kit'
import { user } from 'react-icons-kit/fa/user'
import { userPlus } from 'react-icons-kit/fa/userPlus'
import { cutlery } from 'react-icons-kit/fa/cutlery'
import { child } from 'react-icons-kit/fa/child'
import { lineChart } from 'react-icons-kit/fa/lineChart'
import { signOut } from 'react-icons-kit/fa/signOut'
import { NavigationItem } from 'components/navigation'
import { ROUTES } from 'constants/router'
import { logOut } from 'actions/account'
import './NavigationContainer.css'

class NavigationHeaderContainer extends PureComponent {
  onLogOutClick = () => {
    const { logOut } = this.props

    logOut()
  }

  renderAuthenticatedContent = () => {
    return (
      <Fragment>
        <img src="logo.png" style={{ height: '100px' }} />
        <NavigationItem
          to={ROUTES.MAIN}
          text='Foods'
          icon={cutlery}
        />
        <NavigationItem
          to={ROUTES.EXERCISES}
          text='Exercises'
          icon={child}
        />
        <NavigationItem
          to={ROUTES.PROGRESS}
          text='Progress'
          icon={lineChart}
        />
        <NavigationItem
          disabled
          onClick={this.onLogOutClick}
          text="Log out"
          icon={signOut}
        />
      </Fragment>
    )
  }

  renderNotAuthenticatedContent = () => {
    return (
      <Fragment>
        <img src="logo.png" style={{ height: '100px' }} />
        <NavigationItem
          to={ROUTES.LOGIN}
          text='Login'
          icon={user}
        />
        <NavigationItem
          to={ROUTES.REGISTER}
          text='Register'
          icon={userPlus}
        />
        <NavigationItem
          to={ROUTES.MAIN}
          text='Foods'
          icon={cutlery}
        />
        <NavigationItem
          to={ROUTES.EXERCISES}
          text='Exercises'
          icon={child}
        />
      </Fragment>
    )
  }

  render() {
    const { isAuthenticated } = this.props

    return (
      <div className='NavigationContainer'>
        {isAuthenticated ? this.renderAuthenticatedContent() : this.renderNotAuthenticatedContent()}
      </div>
    )
  }
}

export default connect(
  state => ({
    isAuthenticated: state.account.get('isAuthenticated')
  }),
  {
    logOut
  }
)(NavigationHeaderContainer)
