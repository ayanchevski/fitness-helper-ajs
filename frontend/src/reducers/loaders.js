import { Map } from 'immutable'
import { loaders, utils } from 'constants/actionTypes'

const initialState = Map()

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case loaders.START_LOADING:
      return state.set(payload.name, true)
    case loaders.STOP_LOADING:
      return state.delete(payload.name)
    case utils.RESET_STATE:
      return initialState
    default:
      return state
  }
}
