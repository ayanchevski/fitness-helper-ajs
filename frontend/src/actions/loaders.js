import { loaders } from 'constants/actionTypes'

export const startLoading = name => ({
  type: loaders.START_LOADING,
  payload: { name }
})

export const stopLoading = name => ({
  type: loaders.STOP_LOADING,
  payload: { name }
})
