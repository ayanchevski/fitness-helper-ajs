import { progress as progressActions } from 'constants/actionTypes'

export const fetchProgress = () => ({
  type: progressActions.FETCH_PROGRESS
})

export const consumeProgress = progress => ({
  type: progressActions.CONSUME_PROGRESS,
  payload: { progress }
})

export const addProgressRecord = ({ date, weight }) => ({
  type: progressActions.ADD_PROGRESS_RECORD,
  payload: { date, weight }
})

export const consumeProgressRecord = record => ({
  type: progressActions.CONSUME_PROGRESS_RECORD,
  payload: record
})

export const removeProgressRecord = id => ({
  type: progressActions.REMOVE_PROGRESS_RECORD,
  payload: { id }
})

export const progressRecordRemoved = id => ({
  type: progressActions.PROGRESS_RECORD_REMOVED,
  payload: { id }
})

export const editProgressRecord = ({ id, date, weight }) => ({
  type: progressActions.EDIT_PROGRESS_RECORD,
  payload: { id, date, weight }
})
