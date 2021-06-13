import * as ActionTypes from './ActionTypes'

export const quizReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_QUESTIONS:
      return { ...state, questions: action.payload }
    case ActionTypes.ADD_ANSWER:
      const userAnswer = action.payload
      const question = state.questions.find(
        (q) => q.question.localeCompare(userAnswer.question) === 0
      )
      userAnswer.isCorrect =
        question.correct_answer.localeCompare(userAnswer.answer) === 0
      userAnswer.correct_answer = question.correct_answer

      return { ...state, answers: state.answers.concat(userAnswer) }
    case ActionTypes.CLEAR_ANSWERS:
      return { ...state, answers: [] }
    default:
      throw new Error('ActionType not found')
  }
}
