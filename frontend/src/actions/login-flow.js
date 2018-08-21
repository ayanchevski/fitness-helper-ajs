import { loginFlow } from 'constants/actionTypes'

export const setReferrer = ({ referrer }) => ({
  type: loginFlow.SET_REFERRER,
  payload: { referrer }
})
