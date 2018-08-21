import { Map } from 'immutable'
import { account, utils } from 'constants/actionTypes'

const initialState = Map({
  id: null,
  username: null,
  isAuthenticated: false
})

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case account.AUTHENTICATE:
      return state.merge({
        id: payload.id,
        username: payload.username,
        isAuthenticated: true
      })

    case utils.RESET_STATE:
      return initialState

    default:
      return state
  }
}
