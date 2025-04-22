import React, { useContext, useEffect } from 'react'
import { Tabs } from 'expo-router'
import { useRouter } from 'expo-router'
import { Platform } from 'react-native'
import { AuthContext } from '../../src/context/AuthContext'

export default function TabLayout() {
  const { authenticated } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!authenticated) {
      router.replace('/(auth)/login')
    }
  }, [authenticated])

  if (!authenticated) return null

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({ ios: { position: 'absolute' }, default: {} }),
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
    </Tabs>
  )
}
