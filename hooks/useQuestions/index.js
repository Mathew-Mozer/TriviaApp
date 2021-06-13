import { useState } from 'react'
import { useQuiz } from '../../providers/QuizProvider'
import { addQuestions } from '../../providers/QuizProvider/ActionCreators'

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
    {
      category: 'Cat 2',
      type: 'boolean',
      difficulty: 'hard',
      question: 'q2',
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

  const getQuestion = () => {
    console.log('state', state.questions)
    return state.questions.find((question) => {
      const ans = state.answers.some(
        (answer) => answer.question.localeCompare(question.question) === 0
      )
      console.log('ans', ans)
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
