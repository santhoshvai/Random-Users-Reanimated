import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import { BlurView } from '@react-native-community/blur'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { User } from '../../model/user'
import { useTheme } from '../../common/theme'
import {
  getUserDateOfBirthText,
  getUserFullNameText,
  getUserLocationText,
} from '../../common/data-utils'

const styles = StyleSheet.create({
  pressableContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sneakPeekContainer: {
    marginHorizontal: 16,
    minWidth: '70%',
    borderRadius: 8,
    padding: 16,
    // shadows derived from: https://ethercreative.github.io/react-native-shadow-generator/
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  detail: {
    fontSize: 14,
    paddingTop: 4,
  },
  detailExplanation: {
    fontWeight: '600',
  },
  gender: {
    textTransform: 'capitalize',
  },
})

type Props = {
  user: User | null
  onClose: () => void
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const UserSneakPeek: React.FC<Props> = ({ user, onClose }) => {
  const theme = useTheme()
  const colorScheme = useColorScheme()
  const sharedAnimation = useSharedValue(0)

  const blurViewAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: sharedAnimation.value,
    }
  })

  const sneakPeekAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: sharedAnimation.value,
      transform: [{ scale: withSpring(sharedAnimation.value) }],
    }
  })

  useEffect(() => {
    if (user) {
      // the entering animation
      sharedAnimation.value = withTiming(1)
    }
  }, [sharedAnimation, user])

  if (!user) {
    // never show this component when there is no sneakpeeked user
    return null
  }

  const onContainerPress = () => {
    // exiting animation and its callback
    sharedAnimation.value = withTiming(0, {}, finished => {
      if (finished) {
        runOnJS(onClose)()
      }
    })
  }

  const sneakPeekContainerStyle = [
    styles.sneakPeekContainer,
    {
      shadowColor: theme.textColor,
      backgroundColor: theme.cardBackgroundColor,
    },
    sneakPeekAnimatedStyle,
  ]

  const detailTextStyle = [styles.detail, { color: theme.textColor }]

  return (
    <Pressable
      style={styles.pressableContainer}
      onPress={onContainerPress}
      testID="user-sneak-peek-container"
    >
      <AnimatedBlurView
        style={[StyleSheet.absoluteFill, blurViewAnimatedStyle]}
        blurType={colorScheme === 'dark' ? 'dark' : 'light'}
        blurAmount={5}
        reducedTransparencyFallbackColor={theme.backgroundColor}
      />
      {!!user && (
        <Animated.View
          style={sneakPeekContainerStyle}
          // block the container's closing behavior on tap
          onStartShouldSetResponder={() => true}
          testID="user-sneak-peek-card"
        >
          <Text style={[styles.fullName, { color: theme.textColor }]}>
            {getUserFullNameText(user.name)}
          </Text>
          <Text style={[detailTextStyle, styles.gender]}>{user.gender}</Text>
          <Text style={detailTextStyle}>{user.email}</Text>
          <Text style={detailTextStyle}>
            <Text style={styles.detailExplanation}>Birthdate: </Text>
            {getUserDateOfBirthText(user.dob)}
          </Text>
          <Text style={detailTextStyle}>
            <Text style={styles.detailExplanation}>City: </Text>
            {getUserLocationText(user.location)}
          </Text>
        </Animated.View>
      )}
    </Pressable>
  )
}

export default UserSneakPeek
