import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import Modal from 'react-modal'
import {
  PrivateRoute,
  PublicRoute
} from 'components/routing'
import { NavigationContainer } from 'components/navigation'
import { EditContainer } from 'components/common'
import {
  LoginPage,
  DiaryPage,
  RegisterPage,
  FoodsPage,
  ExercisesPage,
  ProgressPage
} from 'components/pages'
import { ROUTES } from 'constants/router'
import { getSession } from 'actions/account'
import { history } from './store'
import 'typeface-lato'
import './variables.css'
import './index.css'
import './App.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

class App extends PureComponent {
  state = {
    modalIsOpen: false,
    modalType: null,
    modalId: null
  }

  openModal = ({ id, type }) => {
    this.setState({ modalIsOpen: true, modalId: id, modalType: type });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false, modalType: null, modalId: null });
  }

  componentDidMount () {
    const { getSession } = this.props

    getSession()
  }

  render () {
    return (
      <ConnectedRouter history={history}>
        <div className='App'>
          <Route path={ROUTES.MAIN} component={NavigationContainer} />
          <Switch>
            <PublicRoute path={ROUTES.LOGIN} component={LoginPage} exact shouldKillAuthenticated />
            <PublicRoute path={ROUTES.REGISTER} component={RegisterPage} exact shouldKillAuthenticated />
            <PublicRoute
              path={ROUTES.EXERCISES}
              render={() => <ExercisesPage openModal={this.openModal} />}
            />
            <PrivateRoute
              path={ROUTES.PROGRESS}
              render={() => <ProgressPage openModal={this.openModal} />}
            />
            <PublicRoute
              path={ROUTES.MAIN}
              render={() => <FoodsPage openModal={this.openModal} />}
              exact
            />
          </Switch>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
          >
            <EditContainer
              type={this.state.modalType}
              id={this.state.modalId}
              closeModal={this.closeModal}
            />
          </Modal>
        </div>
      </ConnectedRouter>
    )
  }
}

export default connect(
  state => ({
  }),
  {
    getSession
  }
)(App)
