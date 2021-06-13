import { useState } from 'react'
import axios from 'axios'
import { useQuiz } from '../../providers/QuizProvider'
import * as he from 'he'
import { addQuestions } from '../../providers/QuizProvider/ActionCreators'

export default useQuestions = () => {
  const { state, dispatch } = useQuiz()
  const [questionsLoading, setQuestionsLoading] = useState(false)
  const [questionsError, setQuestionsError] = useState()

  // Get questions from server.
  const getQuestions = async () => {
    setQuestionsLoading(true)
    try {
      const response = await axios.get(
        'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'
      )
      const cleanData = response.data.results.map((q) => ({
        ...q,
        question: he.decode(q.question),
      }))
      dispatch(addQuestions(cleanData))
      if (response.data.results.length < 1) {
        throw Error('No Questions received. Please contact quiz administrator')
      }

      if (response.data.response_code != 0) {
        throw Error('Error getting questions')
      }
      console.log('data', response.data)

      setQuestionsError(null)
    } catch (error) {
      setQuestionsError(error.message)
      //console.log(error)
    } finally {
      setQuestionsLoading(false)
    }
  }

  /*

    new Promise((resolve, reject) => {
      

      // Mocking server response

       setTimeout(() => {
        setQuestionsLoading(false)
        try {
          const cleanData = mockData.results.map((q) => ({
            ...q,
            question: he.decode(q.question),
          }))
          dispatch(addQuestions(cleanData))
          if (mockData.results.length < 1) {
            throw Error(
              'No Questions received. Please contact quiz administrator'
            )
          }

          if (mockData.response_code != 0) {
            throw Error('Error getting questions')
          }
        } catch (error) {
          setQuestionsError(error.message)
        }

        resolve(mockData)
      }, 2000)
    }) */

  const getQuestion = () => {
    return state.questions.find((question) => {
      const ans = state.answers.some(
        (answer) => answer.question.localeCompare(question.question) === 0
      )
      return !ans
    })
  }

  return {
    getQuestions,
    getQuestion,
    questionsLoading,
    questionsError,
    questions: state.questions,
  }
}
