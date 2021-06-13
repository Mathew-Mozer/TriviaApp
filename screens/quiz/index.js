import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card } from 'react-native-elements'
import { useAnswers, useQuestions } from '../../hooks'

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
          buttonStyle={styles.buttonStyle}
          onPress={() => handleAnswer('True')}
          title="True"
        />
        <Button
          buttonStyle={styles.buttonStyle}
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
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
})

QuizScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
}

export default QuizScreen
