import { useState } from 'react'
import { useQuiz } from '../../providers/QuizProvider'
import * as he from 'he'
import { addQuestions } from '../../providers/QuizProvider/ActionCreators'

const mockData = {
  response_code: 0,
  results: [
    {
      category: 'Mythology',
      type: 'boolean',
      difficulty: 'hard',
      question:
        'Rannamaari was a sea demon that haunted the people of the Maldives and had to be appeased monthly with the sacrifice of a virgin girl.',
      correct_answer: 'True',
      incorrect_answers: ['False'],
    },
  ],
}

export default useQuestions = () => {
  const { state, dispatch } = useQuiz()
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
    })

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
