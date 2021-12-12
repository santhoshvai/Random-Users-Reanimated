import React, { useState } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native'
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
  const isDarkMode = useColorScheme() === 'dark'
  const [sneakPeekUser, setSneakPeekUser] = useState<User | null>(null)

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.backgroundColor}
      />
      <UserList setSneakPeekUser={setSneakPeekUser} />
      <UserSneakPeek
        user={sneakPeekUser}
        onClose={() => setSneakPeekUser(null)}
      />
    </SafeAreaView>
  )
}

export default Home
