import * as ActionTypes from './ActionTypes'

export const addQuestions = (questions) => ({
  type: ActionTypes.ADD_QUESTIONS,
  payload: questions,
})

export const addAnswer = (question, answer) => ({
  type: ActionTypes.ADD_ANSWER,
  payload: { question, answer },
})

export const clearAnswers = () => ({
  type: ActionTypes.CLEAR_ANSWERS,
})
