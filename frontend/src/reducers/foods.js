import { Map, List } from 'immutable'
import { foods, utils } from 'constants/actionTypes'

const initialState = Map({
  allFoods: List(),
  myFoods: List()
})

const parseFood = ({ name, _id: id, calories, fats, protein, carbs }) =>
  Map({ name, id, calories, fats, protein, carbs })

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case foods.CONSUME_FOODS:
      return state.set(payload.type, List(payload.data.map(parseFood)))

    case foods.CONSUME_FOOD: {
      state = state.update('myFoods', foods => foods.concat([parseFood(payload)]))

      return state.update('allFoods', foods => foods.concat([parseFood(payload)]))
    }
    case foods.FOOD_REMOVED: {
      const id = payload.id

      state = state.update('allFoods', foods => foods.filter(item => item.get('id') !== id))

      return state.update('myFoods', foods => foods.filter(item => item.get('id') !== id))
    }

    case utils.RESET_STATE:
      return initialState

    default:
      return state
  }
}
