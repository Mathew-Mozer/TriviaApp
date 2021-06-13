import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { Button, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useAnswers } from '../../hooks'

const ResultIcon = ({ isCorrect }) => {
  if (isCorrect) {
    return <Icon size={30} name={'check-circle-o'} style={{ color: 'green' }} />
  } else {
    return <Icon size={30} name={'times-circle-o'} style={{ color: 'red' }} />
  }
}

const AnsweredQuestion = ({ index, item }) => {
  return (
    <ListItem key={index} bottomDivider>
      <ResultIcon isCorrect={item.isCorrect} />
      <ListItem.Content>
        <ListItem.Title>{item.question}</ListItem.Title>
        <ListItem.Subtitle>You answered: {item.answer}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

const ResultsScreen = ({ navigation }) => {
  const { replace } = navigation
  const { clearAnswers, answers, getCorrectCount } = useAnswers()

  const handleReset = () => {
    clearAnswers()
    replace('Home')
  }
  useEffect(() => {
    navigation.setOptions({
      title: `You scored \n${getCorrectCount} / ${answers.length}`,
    })
  }, [answers, getCorrectCount])

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
    setOptions: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
}

AnsweredQuestion.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    isCorrect: PropTypes.bool,
    question: PropTypes.any,
    answer: PropTypes.any,
  }),
}

export default ResultsScreen
