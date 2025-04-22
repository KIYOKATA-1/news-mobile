import React, { useContext } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { AuthContext } from '../../src/context/AuthContext'

export default function HomeScreen() {
  const { logout } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главная</Text>
      <Button title="Выйти" onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 24 },
})
