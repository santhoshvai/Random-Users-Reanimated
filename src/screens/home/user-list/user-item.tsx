import React from 'react'
import { TouchableHighlight, Text, StyleSheet, View, Image } from 'react-native'
import { getUserFullNameText } from '../../../common/data-utils'
import { useTheme } from '../../../common/theme'
import { User } from '../../../model/user'

const CONTAINER_HEIGHT = 80

const styles = StyleSheet.create({
  container: {
    height: CONTAINER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  textsContainer: {
    alignSelf: 'stretch',
    marginLeft: 16,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 14,
  },
})

type Props = {
  user: User
  setSneakPeekUser: (user: User) => void
}

const UserItem: React.FC<Props> = ({ user, setSneakPeekUser }) => {
  const theme = useTheme()

  return (
    <TouchableHighlight
      underlayColor={theme.cardBackgroundColor}
      onLongPress={() => setSneakPeekUser(user)}
      testID={'list-item'}
    >
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: user.picture.thumbnail }} />
        <View style={styles.textsContainer}>
          <Text
            style={[styles.name, { color: theme.textColor }]}
            numberOfLines={1}
            allowFontScaling={false}
          >
            {getUserFullNameText(user.name)}
          </Text>
          <Text
            style={[styles.phoneNumber, { color: theme.textDimmedColor }]}
            numberOfLines={1}
            allowFontScaling={false}
          >
            {user.phone}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export const getUserItemLayout = (
  _data: Array<User> | null | undefined,
  index: number,
) => ({
  length: CONTAINER_HEIGHT,
  offset: CONTAINER_HEIGHT * index,
  index,
})

// the props are always equal when the key is same, no need for shallow diffing
const propsAreEqual = () => true

const PureUserItem = React.memo(UserItem, propsAreEqual)

export default PureUserItem
