import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useTheme } from '../../common/theme'
import { User } from '../../model/user'
import UserList from './user-list'
import UserSneakPeek from './user-sneak-peek'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const Home = () => {
  const theme = useTheme()
  const [sneakPeekUser, setSneakPeekUser] = useState<User | null>(null)

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <UserList setSneakPeekUser={setSneakPeekUser} />
      <UserSneakPeek
        user={sneakPeekUser}
        onClose={() => setSneakPeekUser(null)}
      />
    </SafeAreaView>
  )
}

export default Home
