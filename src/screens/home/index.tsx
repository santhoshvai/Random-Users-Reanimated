import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useTheme } from '../../common/theme'
import { User } from '../../model/user'
import UserList from './user-list'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const Home = () => {
  const theme = useTheme()
  const [sneakPeekUser, setSneakPeekUser] = useState<User | null>(null)

  console.log({ sneakPeekUser })
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <UserList setSneakPeekUser={setSneakPeekUser} />
    </SafeAreaView>
  )
}

export default Home
