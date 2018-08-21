import { exercises } from 'constants/actionTypes'

export const fetchExercises = () => ({
  type: exercises.FETCH_EXERCISES
})

export const consumeExercises = ({ type, data }) => ({
  type: exercises.CONSUME_EXERCISES,
  payload: { type, data }
})

export const addExercise = ({ name, caloriesPerHour }) => ({
  type: exercises.ADD_EXERCISE,
  payload: { name, caloriesPerHour }
})

export const consumeExercise = exercise => ({
  type: exercises.CONSUME_EXERCISE,
  payload: exercise
})

export const removeExercise = id => ({
  type: exercises.REMOVE_EXERCISE,
  payload: { id }
})

export const exerciseRemoved = id => ({
  type: exercises.EXERCISE_REMOVED,
  payload: { id }
})

export const editExercise = exercise => ({
  type: exercises.EDIT_EXERCISE,
  payload: exercise
})
