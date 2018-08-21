import { Map, List } from 'immutable'
import { exercises, utils } from 'constants/actionTypes'

const initialState = Map({
  allExercises: List(),
  myExercises: List()
})

const parseExercise = ({ name, _id: id, caloriesPerHour }) =>
  Map({ name, id, caloriesPerHour })

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case exercises.CONSUME_EXERCISES:
      return state.set(payload.type, List(payload.data.map(parseExercise)))

    case exercises.CONSUME_EXERCISE: {
      state = state.update('myExercises', exercises => exercises.concat([parseExercise(payload)]))

      return state.update('allExercises', exercises => exercises.concat([parseExercise(payload)]))
    }
    case exercises.EXERCISE_REMOVED: {
      const id = payload.id

      state = state.update('allExercises', exercises => exercises.filter(item => item.get('id') !== id))

      return state.update('myExercises', exercises => exercises.filter(item => item.get('id') !== id))
    }

    case utils.RESET_STATE:
      return initialState

    default:
      return state
  }
}
