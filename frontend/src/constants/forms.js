export const FORMS = {
  LOGIN: 'login',
  REGISTER: 'register',
  ADD_FOOD: 'addFood',
  ADD_EXERCISE: 'addExercise',
  ADD_PROGRESS_RECORD_FORM: 'addProgressRecord'
}

export const FORM_FIELD_NAMES = {
  PASSWORD: 'password',
  USERNAME: 'username',
  NAME: 'name',
  CARBS: 'carbs',
  PROTEIN: 'protein',
  FATS: 'fats',
  CALORIES: 'calories',
  CALORIES_PER_HOUR: 'caloriesPerHour',
  WEIGHT: 'weight',
  DATE: 'date'
}

export const LOGIN_FORM_FIELDS = [
  { name: FORM_FIELD_NAMES.USERNAME },
  { name: FORM_FIELD_NAMES.PASSWORD }
]

export const REGISTER_FORM_FIELDS = [
  { name: FORM_FIELD_NAMES.USERNAME },
  { name: FORM_FIELD_NAMES.PASSWORD }
]

export const ADD_FOOD_FORM_FIELDS = [
  { name: FORM_FIELD_NAMES.NAME },
  { name: FORM_FIELD_NAMES.CARBS },
  { name: FORM_FIELD_NAMES.FATS },
  { name: FORM_FIELD_NAMES.PROTEIN }
]

export const ADD_EXERCISE_FORM_FIELDS = [
  { name: FORM_FIELD_NAMES.NAME},
  { name: FORM_FIELD_NAMES.CALORIES_PER_HOUR }
]

export const ADD_PROGRESS_RECORD_FORM_FIELDS = [
  { name: FORM_FIELD_NAMES.DATE },
  { name: FORM_FIELD_NAMES.WEIGHT }
]

export const MIN_PASSWORD_LENGTH = 5
export const MAX_PASSWORD_LENGTH = 40

export const  MIN_DATE ="2010-01-01"
export const  MAX_DATE ="2030-01-01"