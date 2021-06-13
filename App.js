import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import HeaderTitle from './components/navigation/header'
import HomeScreen from './screens/home'
import QuizScreen from './screens/quiz'
import ResultsScreen from './screens/results'

import { QuizProvider } from './providers/QuizProvider'

const Stack = createStackNavigator()

export default function App() {
  return (
    <QuizProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerStyle: styles.headerStyle,
              title: 'Welcome to the\nTrivia Challenge!',
              headerTitle: HeaderTitle,
            }}
          />
          <Stack.Screen
            name="Quiz"
            component={QuizScreen}
            options={{
              headerStyle: styles.headerStyle,
              headerTitle: HeaderTitle,
            }}
          />
          <Stack.Screen
            name="Results"
            component={ResultsScreen}
            options={{
              headerStyle: styles.headerStyle,
              headerTitle: HeaderTitle,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QuizProvider>
  )
}

const styles = StyleSheet.create({
  headerStyle: { backgroundColor: '#2272f2', height: 150 },
})
