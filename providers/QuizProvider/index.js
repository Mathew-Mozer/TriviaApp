import PropTypes from 'prop-types'
import React, { useReducer } from 'react'
import { quizReducer } from './reducer'
const initialState = {
  questions: [],
  answers: [],
}
const QuizContext = React.createContext()

export const useQuiz = () => React.useContext(QuizContext)

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState)
  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  )
}

QuizProvider.propTypes = { children: PropTypes.node.isRequired }
