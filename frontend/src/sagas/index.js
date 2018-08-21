import { all, call } from 'redux-saga/effects'
import accountSaga from './account'
import foodsSaga from './foods'
import exercisesSaga from './exercises'
import progressSaga from './progress'

export default function * rootSaga () {
  yield all([
    call(accountSaga),
    call(foodsSaga),
    call(exercisesSaga),
    call(progressSaga)
  ])
}
