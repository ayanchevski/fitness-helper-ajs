import { all, takeLatest, put, takeEvery, call } from 'redux-saga/effects'
import { foods } from 'constants/actionTypes'
import { FORMS } from 'constants/forms'
import { consumeFoods, consumeFood, foodRemoved } from 'actions/foods'
import { setSubmitError } from 'actions/forms'
import { getErrorMessage} from 'utils/utils'
import api from 'services/api'

function* onFetchFoods ({ type, payload }) {
  const { all, mine } = yield call(api.fetchFoods)

  yield put(consumeFoods({ type: 'allFoods', data: all }))
  yield put(consumeFoods({ type: 'myFoods', data: mine }))
}

function* onAddFood({ type, payload: { name, carbs, fats, protein } }) {
  try {
    const { food } = yield call(api.addFood, { name, carbs, fats, protein })

    yield put(consumeFood(food))
  } catch (err) {
    yield put(setSubmitError({ form: FORMS.ADD_FOOD, error: getErrorMessage(err) }))
  }
}

function* onRemoveFood({ payload: { id } }) {
  yield call(api.deleteFood, null, { id })
  yield put(foodRemoved(id))
}

function* onFoodEdit({ type, payload: { id, name, carbs, fats, protein } }) {
  try {
    const { food } = yield call(api.editFood, { name, carbs, fats, protein }, { id })

    yield put(foodRemoved(id))
    yield put(consumeFood(food))
  } catch (err) {
    yield put(setSubmitError({ form: FORMS.ADD_EXERCISE, error: getErrorMessage(err) }))
  }
}

export default function* foodsSaga() {
  yield all([
    takeLatest(foods.FETCH_FOODS, onFetchFoods),
    takeEvery(foods.ADD_FOOD, onAddFood),
    takeLatest(foods.REMOVE_FOOD, onRemoveFood),
    takeLatest(foods.EDIT_FOOD, onFoodEdit)
  ])
}
