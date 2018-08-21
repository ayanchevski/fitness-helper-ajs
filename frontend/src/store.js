import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const history = createHistory()
const routingMiddleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...rootReducer,
    router: routerReducer
  }),
  composeWithDevTools(applyMiddleware(routingMiddleware, sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export { history }

export default store
