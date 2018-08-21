import { all, takeLatest, put, takeEvery, call } from 'redux-saga/effects'
import { exercises } from 'constants/actionTypes'
import { FORMS } from 'constants/forms'
import { consumeExercises, consumeExercise, exerciseRemoved } from 'actions/exercises'
import { setSubmitError } from 'actions/forms'
import { getErrorMessage } from 'utils/utils'
import api from 'services/api'

function * onFetchExercises ({ type, payload }) {
  const { all, mine } = yield call(api.fetchExercises)

  yield put(consumeExercises({ type: 'allExercises', data: all }))
  yield put(consumeExercises({ type: 'myExercises', data: mine }))
}

function * onAddExercise ({ type, payload: { name, caloriesPerHour } }) {
  try {
    const { exercise } = yield call(api.addExercise, { name, caloriesPerHour })

    yield put(consumeExercise(exercise))
  } catch (err) {
    yield put(setSubmitError({ form: FORMS.ADD_EXERCISE, error: getErrorMessage(err) }))
  }
}

function * onExerciseEdit ({ type, payload: { id, name, caloriesPerHour } }) {
  try {
    const { exercise } = yield call(api.editExercise, { name, caloriesPerHour }, { id })

    yield put(exerciseRemoved(id))
    yield put(consumeExercise(exercise))
  } catch (err) {
    yield put(setSubmitError({ form: FORMS.ADD_EXERCISE, error: getErrorMessage(err) }))
  }
}

function * onRemoveExercise ({ payload: { id } }) {
  yield call(api.deleteExercise, null, { id })
  yield put(exerciseRemoved(id))
}

export default function * exercisesSaga () {
  yield all([
    takeLatest(exercises.FETCH_EXERCISES, onFetchExercises),
    takeEvery(exercises.ADD_EXERCISE, onAddExercise),
    takeLatest(exercises.REMOVE_EXERCISE, onRemoveExercise),
    takeLatest(exercises.EDIT_EXERCISE, onExerciseEdit)
  ])
}
