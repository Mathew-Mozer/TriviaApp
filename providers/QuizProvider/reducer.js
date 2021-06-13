import * as ActionTypes from '../../constants/ActionTypes'

export const quizReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_QUESTIONS:
      return { ...state, questions: action.payload }
    case ActionTypes.ADD_ANSWER:
      return { ...state, answers: state.answers.concat({ ...action.payload }) }
    default:
      throw new Error('ActionType not found')
  }
}
