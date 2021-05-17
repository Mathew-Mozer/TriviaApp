import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

const HomeScreen = ({ navigation }) => {
  const { navigate } = navigation
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={[styles.textBox]}>You will be presented</Text>
        <Text style={styles.textBox}>with 10 True or False</Text>
        <Text style={styles.textBox}>Questions</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.textBox}>Can you score 100%</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigate('Home', { tes: '' })}>
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
