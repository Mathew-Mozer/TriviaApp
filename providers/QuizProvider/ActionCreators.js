import * as ActionTypes from '../../constants/ActionTypes'

export const addQuestions = (questions) => ({
  type: ActionTypes.ADD_QUESTIONS,
  payload: questions,
})

export const addAnswer = (question, answer) => ({
  type: ActionTypes.ADD_ANSWER,
  payload: { question, answer },
})
