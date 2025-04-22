import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { AuthContext } from '../../src/context/AuthContext';
import { BiometryTypes } from 'react-native-biometrics';

function formatBiometryName(type: BiometryTypes): string {
  switch (type) {
    case BiometryTypes.FaceID:
      return 'Face ID';
    case BiometryTypes.TouchID:
      return 'Touch ID';
    case BiometryTypes.Biometrics:
      return 'Biometrics';
  }
}

export default function LoginScreen() {
  const { biometryType, authenticate } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Войти</Text>
      <Button
        title={
          biometryType
            ? `Авторизация (${formatBiometryName(biometryType)})`
            : 'Биометрия недоступна'
        }
        onPress={authenticate}
        disabled={!biometryType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
  hint: { marginTop: 12, fontSize: 12, color: '#888', textAlign: 'center' },
});
