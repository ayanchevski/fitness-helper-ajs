export const validateNotEmpty = value => !value ? 'Must enter a value' : null
export const validatePositveNumber = (num) => {
  if (num < 0) return 'Please enter a positive number'
  if (num === undefined) return 'Please enter a value'
}
export const getDate = date => {
  const myDate = date ? new Date(date) : new Date()

  return myDate.getFullYear() + '-' + ('0' + (myDate.getMonth() + 1)).slice(-2) + '-' + myDate.getDate()
}
