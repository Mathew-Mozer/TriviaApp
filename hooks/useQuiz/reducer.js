import * as ActionTypes from '../../constants/ActionTypes'

export const addQuestions = (questions) => ({
  type: ActionTypes.ADD_QUESTIONS,
  payload: questions,
})

export const quizReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_QUESTIONS:
      return { ...state, questions: action.payload }
    default:
      throw new Error('ActionType not found')
  }
}
