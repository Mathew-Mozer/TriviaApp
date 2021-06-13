import * as ActionTypes from '../../constants/ActionTypes'

export const addQuestions = (questions) => ({
  type: ActionTypes.ADD_QUESTIONS,
  payload: questions,
})
