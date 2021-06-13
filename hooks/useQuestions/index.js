import axios from 'axios'
import * as he from 'he'
import { useState } from 'react'
import { useQuiz } from '../../providers/QuizProvider'
import { addQuestions } from '../../providers/QuizProvider/ActionCreators'

export default useQuestions = () => {
  const { state, dispatch } = useQuiz()
  const [questionsLoading, setQuestionsLoading] = useState(false)
  const [questionsError, setQuestionsError] = useState()

  // Get questions from server.
  const getQuestions = async () => {
    setQuestionsLoading(true)
    try {
      const { data } = await axios.get(
        'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'
      )

      const cleanData = data.results.map((q) => ({
        ...q,
        question: he.decode(q.question),
      }))

      dispatch(addQuestions(cleanData))

      if (data.results.length < 1) {
        throw Error('No Questions received. Please contact quiz administrator')
      }

      if (data.response_code != 0) {
        throw Error('Error getting questions')
      }

      setQuestionsError(null)
    } catch (error) {
      setQuestionsError(error.message)
    } finally {
      setQuestionsLoading(false)
    }
  }

  const getQuestion = () => {
    // Finds the next question that isn't in the answer array
    return state.questions.find(
      (q) =>
        !state.answers.some((a) => a.question.localeCompare(q.question) === 0)
    )
  }

  return {
    getQuestions,
    getQuestion,
    questionsLoading,
    questionsError,
    questions: state.questions,
  }
}
