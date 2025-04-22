// app/(tabs)/_layout.tsx
import React, { useContext } from 'react';
import { Tabs, Redirect } from 'expo-router';
import { Platform } from 'react-native';
import { AuthContext } from '../../src/context/AuthContext';

export default function TabLayout() {
  const { authenticated } = useContext(AuthContext);

  // если не залогинен — кидаем на login
  if (!authenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
      />
    </Tabs>
  );
}
