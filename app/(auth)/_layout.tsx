// app/(auth)/_layout.tsx
import React, { useContext } from 'react';
import { Slot, Redirect } from 'expo-router';
import { AuthContext } from '../../src/context/AuthContext';

export default function AuthLayout() {
  const { authenticated } = useContext(AuthContext);

  // если уже залогинен, переходим сразу в табы
  if (authenticated) {
    return <Redirect href="/(tabs)" />;
  }

  // иначе рендерим login.tsx внутри Slot
  return <Slot />;
}
