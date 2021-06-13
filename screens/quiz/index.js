import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Card, Button } from 'react-native-elements'
import PropTypes from 'prop-types'
import useQuestions from '../../hooks/useQuestions'
import useAnswers from '../../hooks/useAnswers'

const QuizScreen = ({ navigation }) => {
  const { replace } = navigation
  const { getQuestion, questions } = useQuestions()
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

  if (answers.length === questions.length) {
    return null
  }

  return (
    <Card>
      <Text style={[styles.textBox, { paddingBottom: 20 }]}>
        {currentQuestion?.question}
      </Text>
      <Card.Divider />
      <Text style={[styles.textBox, { paddingBottom: 20 }]}>
        {answers.length + 1}/{questions.length}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          onPress={() => handleAnswer('True')}
          title="True"
        />
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          onPress={() => handleAnswer('False')}
          title="False"
        />
      </View>
    </Card>
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
