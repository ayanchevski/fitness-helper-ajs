import { filter } from 'ramda'

export const getSuccessfulActionType = type => `${type}Success`
export const getFailedActionType = type => `${type}Failed`
export const skipUndefined = filter(x => x !== undefined)

export const getErrorMessage = err => {
  const errorMessage = err && err.message

  switch (errorMessage) {
    case 'UserNotFound':
      return 'User not found'

    case 'DuplicateUser':
      return 'Username already taken'

    case 'DuplicateFood':
      return 'Food name already taken'

    case 'DuplicateExercise':
      return 'Exercise name already taken'

    case 'DuplicateProgress':
      return 'You have already logged weight for this date'

    default:
      return 'Something went wrong'
  }
}
