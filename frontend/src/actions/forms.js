import { forms } from 'constants/actionTypes'

export const setSubmitError = ({ form, error }) => ({
  type: forms.SET_SUBMIT_ERROR,
  payload: { form, error }
})

export const clearSubmitError = form => ({
  type: forms.CLEAR_SUBMIT_ERROR,
  payload: { form }
})