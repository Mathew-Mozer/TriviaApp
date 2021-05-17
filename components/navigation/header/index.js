import React from 'react'
import { StyleSheet, Text, ViewPropTypes } from 'react-native'

export default function HeaderTitle({ style, children: title }) {
  return (
    <Text style={[style, styles.titleText]} numberOfLines={2}>
      {title}
    </Text>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    flex: 1,
  },
})

HeaderTitle.propTypes = {
  style: ViewPropTypes.style,
  children: ViewPropTypes.children,
}
