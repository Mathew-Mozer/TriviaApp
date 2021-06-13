import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import useQuestions from '../../hooks/useQuestions'
import useAnswers from '../../hooks/useAnswers'

const ResultsScreen = ({ navigation }) => {
  const { replace } = navigation
  const { clearAnswers } = useAnswers()

  const handleReset = () => {
    clearAnswers()
    replace('Quiz')
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={[styles.textBox]}>Results</Text>
      <TouchableOpacity onPress={() => handleReset()}>
        <Text style={styles.buttonText}>Try Again!</Text>
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

ResultsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default ResultsScreen
