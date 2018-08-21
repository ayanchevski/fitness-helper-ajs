import { Map } from 'immutable'
import { forms, utils } from 'constants/actionTypes'

const initialState = Map()

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case forms.SET_SUBMIT_ERROR:
      return state.setIn([payload.form, 'submitError'], payload.error)

    case forms.CLEAR_SUBMIT_ERROR:
      return state.deleteIn([payload.form, 'submitError'])

    case utils.RESET_STATE:
      return initialState

    default:
      return state
  }
}
