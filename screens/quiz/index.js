import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import useQuestions from '../../hooks/useQuestions'

const QuizScreen = ({ navigation }) => {
  const { navigate } = navigation
  const { getQuestion } = useQuestions()
  const [currentQuestion, setCurrentQuestion] = useState()

  useEffect(() => {
    const q = getQuestion()
    if (q) {
      console.warn(q.question)
      setCurrentQuestion(q)
    }
  }, [])

  useEffect(() => {
    if (currentQuestion) {
      navigation.setOptions({ title: currentQuestion.category })
    }
  }, [currentQuestion])

  if (!currentQuestion) {
    return (
      <View style={{ flex: 1 }}>
        <Text style={[styles.textBox]}>No current question</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={[styles.textBox]}>{currentQuestion?.question}</Text>
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
