import { all, takeLatest, put, takeEvery, call } from 'redux-saga/effects'
import { progress } from 'constants/actionTypes'
import { FORMS } from 'constants/forms'
import { consumeProgress, consumeProgressRecord, progressRecordRemoved } from 'actions/progress'
import { setSubmitError } from 'actions/forms'
import { getErrorMessage } from 'utils/utils'
import api from 'services/api'

function* onFetchProgress({ type, payload }) {
  const { progress } = yield call(api.fetchProgress)

  yield put(consumeProgress(progress))
}

function* onAddProgressRecord({ type, payload: { date, weight } }) {
  try {
    const { progress } = yield call(api.addProgressRecord, { date, weight })

    yield put(consumeProgressRecord(progress))
  } catch (err) {
    yield put(setSubmitError({ form: FORMS.ADD_PROGRESS_RECORD, error: getErrorMessage(err) }))
  }
}

function* onRemoveProgressRecord({ payload: { id } }) {
  yield call(api.deleteProgressRecord, null, { id })
  yield put(progressRecordRemoved(id))
}

function* onProgressRecordEdit({ type, payload: { id, date, weight } }) {
  try {
    const { progress } = yield call(api.editProgressRecord, { date, weight }, { id })

    yield put(progressRecordRemoved(id))
    yield put(consumeProgressRecord(progress))
  } catch (err) {
    yield put(setSubmitError({ form: FORMS.ADD_EXERCISE, error: getErrorMessage(err) }))
  }
}

export default function * progressSaga () {
  yield all([
    takeLatest(progress.FETCH_PROGRESS, onFetchProgress),
    takeEvery(progress.ADD_PROGRESS_RECORD, onAddProgressRecord),
    takeLatest(progress.REMOVE_PROGRESS_RECORD, onRemoveProgressRecord),
    takeLatest(progress.EDIT_PROGRESS_RECORD, onProgressRecordEdit)
  ])
}
