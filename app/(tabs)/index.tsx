import React, { useContext } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главная</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 24 },
})
