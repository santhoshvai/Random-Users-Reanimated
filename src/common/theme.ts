import { useColorScheme } from 'react-native'

type Theme = {
  backgroundColor: string
  cardBackgroundColor: string
  borderColor: string
  textColor: string
  textDimmedColor: string
}

const LightTheme: Theme = {
  backgroundColor: '#fff',
  cardBackgroundColor: '#efeff0',
  borderColor: '#e9e9e9',
  textColor: '#000',
  textDimmedColor: '#8a8a8e',
}

const DarkTheme: Theme = {
  backgroundColor: '#000',
  cardBackgroundColor: '#1c1c1e',
  borderColor: '#29292b',
  textColor: '#fff',
  textDimmedColor: '#8d8d92',
}

export const useTheme = () => {
  const isDark = useColorScheme() === 'dark'
  return isDark ? DarkTheme : LightTheme
}
