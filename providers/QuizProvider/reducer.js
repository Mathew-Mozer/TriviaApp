import * as ActionTypes from './ActionTypes'

export const quizReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_QUESTIONS:
      return { ...state, questions: action.payload }
    case ActionTypes.ADD_ANSWER:
      return { ...state, answers: state.answers.concat({ ...action.payload }) }
    case ActionTypes.CLEAR_ANSWERS:
      return { ...state, answers: [] }
    default:
      throw new Error('ActionType not found')
  }
}
