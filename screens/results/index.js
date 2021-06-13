import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import useQuestions from '../../hooks/useQuestions'
import useAnswers from '../../hooks/useAnswers'

const ResultIcon = ({ isCorrect }) => {
  if (isCorrect) {
    return <Icon size={30} name={'check-circle-o'} style={{ color: 'green' }} />
  } else
    return <Icon size={30} name={'times-circle-o'} style={{ color: 'red' }} />
}

const AnsweredQuestion = ({ index, item }) => {
  return (
    <ListItem key={index} bottomDivider>
      <ResultIcon isCorrect={item.isCorrect} />
      <ListItem.Content>
        <ListItem.Title>{item.question}</ListItem.Title>
        <ListItem.Subtitle>You answered: {item.answer}</ListItem.Subtitle>
        <ListItem.Subtitle>
          Correct Answer: {item.correct_answer}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

const ResultsScreen = ({ navigation }) => {
  const { replace } = navigation
  const { clearAnswers, answers, correctAnswers } = useAnswers()

  const handleReset = () => {
    clearAnswers()
    replace('Quiz')
  }
  useEffect(() => {
    navigation.setOptions({
      title: `You scored \n${correctAnswers} / ${answers.length}`,
    })
  }, [answers, correctAnswers])

  const Footer = () => (
    <View style={{ padding: 30 }}>
      <Button
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        onPress={() => handleReset()}
        title="Try Again!"
      />
    </View>
  )

  return (
    <FlatList
      data={answers}
      renderItem={AnsweredQuestion}
      keyExtractor={(item) => item.question}
      ListFooterComponent={<Footer />}
    />
  )
}

ResultsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default ResultsScreen
