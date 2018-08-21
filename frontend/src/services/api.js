import axios from 'axios'
import { forEach } from 'lodash'
import queryString from 'query-string'
import { skipUndefined } from 'utils/utils'

const methodsWithHeaders = ['POST', 'DELETE', 'PUT']

const serviceBind = service => async (requestData = {}, queryParameter) => {
  let requestObject = {}
  let { credentials, headers, method, url, contentType } = service

  if (requestData) {
    if (method === 'GET') {
      url += `?${queryString.stringify(skipUndefined(requestData))}`
    } else {
      requestObject.data = contentType ? requestData : JSON.stringify(requestData)
    }
  }

  if (queryParameter) {
    // Replace url template parameters with given values
    forEach(
      queryParameter,
      (value, key) => (url = url.replace(`:${key}`, value))
    )
  }

  requestObject.url = url

  if (headers) {
    requestObject.headers = {
      ...requestObject.headers,
      ...headers
    }
  }

  if (methodsWithHeaders.indexOf(service.method) >= 0 && !contentType) {
    requestObject.headers = {
      ...requestObject.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if (method) {
    requestObject.method = method
  }

  if (credentials) {
    requestObject.credentials = credentials
  }

  try {
    const { data } = await axios(requestObject)

    return data
  } catch (err) {
    if (err && err.response && err.response.data) {
      throw Object.assign({}, err.response.data)
    } else {
      throw err
    }
  }
}

const services = [
  { method: 'POST', url: '/api/users/login', name: 'logIn' },
  { method: 'POST', url: '/api/users/logout', name: 'logOut' },
  { method: 'POST', url: '/api/users', name: 'register' },
  {
    method: 'GET',
    url: '/api/users',
    name: 'getSession'
  },
  { method: 'GET', url: '/api/foods', name: 'fetchFoods' },
  { method: 'POST', url: '/api/foods', name: 'addFood' },
  { method: 'PUT', url: '/api/foods/:id', name: 'editFood' },
  { method: 'DELETE', url: '/api/foods/:id', name: 'deleteFood' },
  { method: 'GET', url: '/api/exercises', name: 'fetchExercises' },
  { method: 'POST', url: '/api/exercises', name: 'addExercise' },
  { method: 'PUT', url: '/api/exercises/:id', name: 'editExercise' },
  { method: 'DELETE', url: '/api/exercises/:id', name: 'deleteExercise' },
  { method: 'GET', url: '/api/progress', name: 'fetchProgress' },
  { method: 'POST', url: '/api/progress', name: 'addProgressRecord' },
  { method: 'PUT', url: '/api/progress/:id', name: 'editProgressRecord' },
  { method: 'DELETE', url: '/api/progress/:id', name: 'deleteProgressRecord' }
].reduce(
  (currentServices, service) => ({
    ...currentServices,
    [service.name || service.url.replace('/api/', '')]: serviceBind({
      credentials: 'include',
      ...service
    })
  }),
  {}
)

export default services
