import React, { useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import useQuestions from '../../hooks/useQuestions'

const HomeScreen = ({ navigation }) => {
  const { replace } = navigation
  const { getQuestions, questions, questionsLoading, questionsError } =
    useQuestions()

  useEffect(() => {
    getQuestions()
  }, [])

  const QuestionsError = () => (
    <View style={styles.container}>
      <View style={[styles.textBox, { flex: 3 }]}>
        <Text style={[styles.textBox, { paddingBottom: 50 }]}>
          {`There was an error loading Questions \n\n ${questionsError}`}
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => getQuestions()}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const QuestionsLoading = () => (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.buttonText}>Loading Questions</Text>
      </View>
    </View>
  )

  if (questionsLoading) {
    return <QuestionsLoading />
  }

  if (questionsError) {
    return <QuestionsError />
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={[styles.textBox]}>You will be presented</Text>
        <Text style={styles.textBox}>
          with {questions.length} True or False
        </Text>
        <Text style={styles.textBox}>Questions</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.textBox}>Can you score 100%</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => replace('Quiz')}>
          <Text style={styles.buttonText}>Begin</Text>
        </TouchableOpacity>
      </View>
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

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default HomeScreen
