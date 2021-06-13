import { useReducer, useState } from 'react'
import { quizReducer, addQuestions } from './reducer'

const mockData = {
  response_code: 0,
  results: [
    {
      category: 'Entertainment: Video Games',
      type: 'boolean',
      difficulty: 'hard',
      question: 'Unturned originally started as a Roblox game.',
      correct_answer: 'True',
      incorrect_answers: ['False'],
    },
  ],
}
const initialState = {
  questions: [],
}

export default useQuiz = () => {
  const [state, dispatch] = useReducer(quizReducer, initialState)
  const [questionsLoading, setQuestionsLoading] = useState(true)
  const [questionsError, setQuestionsError] = useState()

  // Get questions from server.
  const getQuestions = () =>
    new Promise((resolve, reject) => {
      setQuestionsLoading(true)

      // Mocking server response
      setTimeout(() => {
        setQuestionsLoading(false)
        try {
          dispatch(addQuestions(mockData.results))
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
    })

  return {
    getQuestions,
    questionsLoading,
    questionsError,
    questions: state.questions,
  }
}
