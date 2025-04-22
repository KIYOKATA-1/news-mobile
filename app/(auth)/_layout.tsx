import React, { useContext, useEffect } from 'react'
import { Slot, useRouter } from 'expo-router'
import { AuthContext } from '../../src/context/AuthContext'

export default function AuthLayout() {
  const { authenticated } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (authenticated) {
      router.replace('/(tabs)')
    }
  }, [authenticated])

  return <Slot />
}
