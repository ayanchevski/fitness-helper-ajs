import { account } from 'constants/actionTypes'

export const logIn = ({ username, password }) => ({
  type: account.LOG_IN,
  payload: { username, password }
})

export const logOut = () => ({
  type: account.LOG_OUT
})

export const register = ({ username, password }) => ({
  type: account.REGISTER,
  payload: { username, password }
})

export const getSession = () => ({ type: account.GET_SESSION })

export const authenticate = ({ id, username }) => ({
  type: account.AUTHENTICATE,
  payload: { id, username }
})
