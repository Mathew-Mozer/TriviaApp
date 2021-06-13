import {
  addAnswer,
  clearAnswers,
} from '../../providers/QuizProvider/ActionCreators'
import { useQuiz } from '../../providers/QuizProvider'

export default useAnswers = () => {
  const { state, dispatch } = useQuiz()

  const putAnswer = (question, answer) => {
    dispatch(addAnswer(question, answer))
  }

  return {
    putAnswer,
    answers: state.answers,
    clearAnswers: () => dispatch(clearAnswers()),
  }
}
