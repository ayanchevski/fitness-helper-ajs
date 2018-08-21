export const account = {
  LOG_IN: 'account/logIn',
  LOG_OUT: 'account/logOut',
  REGISTER: 'account/register',
  GET_SESSION: 'account/getSession',
  AUTHENTICATE: 'account/authenticate'
}

export const loginFlow = {
  SET_REFERRER: 'loginFlow/setReferrer'
}

export const forms = {
  SET_SUBMIT_ERROR: 'forms/setSubmitError',
  CLEAR_SUBMIT_ERROR: 'forms/clearSubmitError'
}

export const foods = {
  FETCH_FOODS: 'foods/fetchFoods',
  CONSUME_FOODS: 'foods/consumeFoods',
  ADD_FOOD: 'foods/addFood',
  CONSUME_FOOD: 'foods/consumeFood',
  REMOVE_FOOD: 'foods/removeFood',
  FOOD_REMOVED: 'foods/foodRemoved',
  EDIT_FOOD: 'foods/editFood'
}

export const exercises = {
  FETCH_EXERCISES: 'exercises/fetchExercises',
  CONSUME_EXERCISES: 'exercises/consumeExercises',
  ADD_EXERCISE: 'exercises/addExercise',
  CONSUME_EXERCISE: 'exercises/consumeExercise',
  REMOVE_EXERCISE: 'exercises/removeExercise',
  EXERCISE_REMOVED: 'exercises/exerciseRemoved',
  EDIT_EXERCISE: 'exercise/editExercise'
}

export const progress = {
  FETCH_PROGRESS: 'progress/fetchProgress',
  CONSUME_PROGRESS: 'progress/consumeProgress',
  ADD_PROGRESS_RECORD: 'progress/addProgressRecord',
  CONSUME_PROGRESS_RECORD: 'progress/consumeProgressRecord',
  REMOVE_PROGRESS_RECORD: 'progress/removeProgressRecord',
  PROGRESS_RECORD_REMOVED: 'progress/progressRecordRemoved',
  EDIT_PROGRESS_RECORD: 'progress/editProgressRecord'
}

export const loaders = {
  START_LOADING: 'loaders/startLoading',
  STOP_LOADING: 'loaders/stopLoading'
}

export const utils = {
  RESET_STATE: 'utils/resetState'
}
