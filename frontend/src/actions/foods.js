import { foods } from 'constants/actionTypes'

export const fetchFoods = () => ({
  type: foods.FETCH_FOODS
})

export const consumeFoods = ({ type, data }) => ({
  type: foods.CONSUME_FOODS,
  payload: { type, data }
})

export const addFood = ({ name, carbs, protein, fats }) => ({
  type: foods.ADD_FOOD,
  payload: { name, carbs, protein, fats }
})

export const consumeFood = food => ({
  type: foods.CONSUME_FOOD,
  payload: food
})

export const removeFood = id => ({
  type: foods.REMOVE_FOOD,
  payload: { id }
})

export const foodRemoved = id => ({
  type: foods.FOOD_REMOVED,
  payload: { id }
})

export const editFood = ({ id, name, fats, protein, carbs }) => ({
  type: foods.EDIT_FOOD,
  payload: { id, name, fats, protein, carbs }
})
