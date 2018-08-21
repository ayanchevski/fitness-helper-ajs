import { Map, List, fromJS } from 'immutable'
import { progress, utils } from 'constants/actionTypes'

const initialState = Map({
  progress: List()
})

const parseProgressRecord = ({ _id: id, date, weight }) =>
  Map({ id, date, weight })

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case progress.CONSUME_PROGRESS:
      return state.set('progress', List(payload.progress.map(parseProgressRecord)))

    case progress.CONSUME_PROGRESS_RECORD: {
      return state.update('progress', progress => progress
        .filter(item => item.get('date') !== payload.date)
        .concat([parseProgressRecord(payload)])
        .sortBy(item => item.get('date'))
      )
    }

    case progress.PROGRESS_RECORD_REMOVED: {
      const id = payload.id

      return state.update('progress', progress => progress.filter(item => item.get('id') !== id))
    }

    case utils.RESET_STATE:
      return initialState

    default:
      return state
  }
}
