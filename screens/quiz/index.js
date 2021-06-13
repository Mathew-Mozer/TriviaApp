import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import useQuestions from '../../hooks/useQuestions'
import useAnswers from '../../hooks/useAnswers'

const QuizScreen = ({ navigation }) => {
  const { replace } = navigation
  const { getQuestion } = useQuestions()
  const { putAnswer, answers } = useAnswers()
  const [currentQuestion, setCurrentQuestion] = useState()

  useEffect(() => {
    const question = getQuestion()
    setCurrentQuestion(question)
    if (!question) {
      replace('Results')
    }
  }, [answers])

  useEffect(() => {
    if (currentQuestion) {
      navigation.setOptions({ title: currentQuestion.category })
    }
  }, [currentQuestion])

  const handleAnswer = (answer) => {
    putAnswer(currentQuestion.question, answer)
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={[styles.textBox]}>{currentQuestion?.question}</Text>
      <TouchableOpacity onPress={() => handleAnswer(true)}>
        <Text style={styles.buttonText}>True</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAnswer(false)}>
        <Text style={styles.buttonText}>False</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
  },
  textBox: {
    textAlign: 'center',
    fontSize: 30,
  },
  footer: { padding: 20 },
  buttonText: {
    fontSize: 30,
    textAlign: 'center',
  },
})

QuizScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default QuizScreen
