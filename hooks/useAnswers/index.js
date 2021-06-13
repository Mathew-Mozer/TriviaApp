import { useQuiz } from '../../providers/QuizProvider'
import {
  addAnswer,
  clearAnswers,
} from '../../providers/QuizProvider/ActionCreators'

export const useAnswers = () => {
  const { state, dispatch } = useQuiz()

  const putAnswer = (question, answer) => {
    dispatch(addAnswer(question, answer))
  }

  const getCorrectCount = state.answers.reduce(
    (total, currentAnswer) => (currentAnswer.isCorrect ? total + 1 : total),
    0
  )

  return {
    putAnswer,
    answers: state.answers,
    clearAnswers: () => dispatch(clearAnswers()),
    getCorrectCount,
  }
}
