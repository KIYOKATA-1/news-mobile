// app/(auth)/login.tsx
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../../src/context/AuthContext';

export default function LoginScreen() {
  const { biometryType, authenticate } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Войти</Text>
      <Button
        title={`Авторизация${biometryType ? ` (${biometryType})` : ''}`}
        onPress={authenticate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 16 },
});
