import { call, all, takeLatest, takeEvery, put } from 'redux-saga/effects'
import { account } from 'constants/actionTypes'
import { FORMS } from 'constants/forms'
import { startLoading, stopLoading } from 'actions/loaders'
import api from 'services/api'
import { authenticate } from 'actions/account'
import { resetState } from 'actions/utils'
import { setSubmitError } from 'actions/forms'
import { getErrorMessage } from 'utils/utils'
import { fetchFoods } from 'actions/foods'
import { fetchExercises } from 'actions/exercises'

function * onSessionFetch({ type }) {
  try {
    const { me } = yield call(api.getSession)

    if (me) {
      const { _id: id, username } = me

      yield put(authenticate({ id, username }))
    }
  } catch (err) {
    console.log(err)
  }
}

function * onLogIn ({ type, payload }) {
  const { username, password } = payload

  yield put(startLoading(type))

  try {
    const { _id: id } = yield call(api.logIn, { username, password })

    yield put(authenticate({ id, username }))
  } catch (err) {
    yield put(setSubmitError({ form: FORMS.LOGIN, error: getErrorMessage(err) }))
  } finally {
    yield put(stopLoading(type))
  }
}

function * onRegister ({ type, payload }) {
  const { username, password } = payload

  yield put(startLoading(type))

  try {
    const { _id: id } = yield call(api.register, { username, password })

    yield put(authenticate({ id, username }))
  } catch (err) {
    yield put(setSubmitError({ form: FORMS.REGISTER, error: getErrorMessage(err) }))
  } finally {
    yield put(stopLoading(type))
  }
}

function * onLogOut ({ type, payload }) {
  try {
    yield call(api.logOut)
    yield put(resetState())
    yield put(fetchFoods())
    yield put(fetchExercises())
  } catch (err) {
    console.log(err)
  }
}

export default function * accountSaga () {
  yield all([
    takeLatest(account.LOG_IN, onLogIn),
    takeEvery(account.LOG_OUT, onLogOut),
    takeLatest(account.REGISTER, onRegister),
    takeLatest(account.GET_SESSION, onSessionFetch)
  ])
}
