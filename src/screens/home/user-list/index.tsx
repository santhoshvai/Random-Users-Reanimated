import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native'
import { useTheme } from '../../../common/theme'
import { fetchUsers } from '../../../data/user-service'
import { User } from '../../../model/user'
import UserItem, { getUserItemLayout } from './user-item'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 16,
  },
  activityIndicator: {
    marginBottom: 8,
  },
  item: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  seperator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
})

const ItemSeperator = () => {
  const theme = useTheme()
  return (
    <View style={[styles.seperator, { backgroundColor: theme.borderColor }]} />
  )
}

type State = {
  users: User[]
  initialLoading: boolean
  loadingMore: boolean
}

const INITIAL_STATE: State = {
  users: [],
  initialLoading: true,
  loadingMore: false,
}

type Props = {
  setSneakPeekUser: (user: User) => void
}

const UserList: React.FC<Props> = ({ setSneakPeekUser }) => {
  const theme = useTheme()
  const paginationRef = useRef(1)
  const [{ users, initialLoading, loadingMore }, setUsersState] =
    useState<State>(INITIAL_STATE)
  const abortControllerRef = useRef<AbortController | null>(null)

  const onEndReached = useCallback(() => {
    const paginate = async (): Promise<void> => {
      // abort any possible in-flight request
      abortControllerRef.current?.abort()
      abortControllerRef.current = new AbortController()
      let _users: User[] = []
      setUsersState(prev => ({ ...prev, loadingMore: true }))
      try {
        _users = await fetchUsers(
          paginationRef.current,
          abortControllerRef.current.signal,
          50,
        )
        // progress to next page as this request is successful
        paginationRef.current += 1
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') {
          // dont set state on Aborts, a new request will be made immediately
          return
        }
        // errors are ignored for simplicity
        console.log(e)
      }
      setUsersState(prev => ({
        ...prev,
        users: prev.users.concat(_users),
        loadingMore: false,
      }))
    }
    paginate()
  }, [])

  useEffect(() => {
    const initialise = async (): Promise<void> => {
      abortControllerRef.current = new AbortController()
      let _users: User[] = []
      setUsersState(prev => ({ ...prev, initialLoading: true }))
      try {
        _users = await fetchUsers(
          paginationRef.current,
          abortControllerRef.current.signal,
          100,
        )
        // progress to next page as this request is successful
        paginationRef.current += 1
      } catch (e) {
        // errors are ignored for simplicity
        console.log(e)
      }
      setUsersState(prev => ({ ...prev, users: _users, initialLoading: false }))
    }
    initialise()
    return (): void => {
      // cleanup: abort any in-flight api calls on unmount
      abortControllerRef.current?.abort()
    }
  }, [])

  const renderItem: ListRenderItem<User> = useCallback(
    ({ item }) => <UserItem user={item} setSneakPeekUser={setSneakPeekUser} />,
    [],
  )

  const keyExtractor = useCallback((item: User) => item.cell, [])

  return (
    <>
      <FlatList
        removeClippedSubviews
        data={users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        initialNumToRender={50}
        contentContainerStyle={styles.contentContainerStyle}
        ItemSeparatorComponent={ItemSeperator}
        getItemLayout={getUserItemLayout}
      />
      {(initialLoading || loadingMore) && (
        <ActivityIndicator
          style={styles.activityIndicator}
          size={loadingMore ? 'small' : 'large'}
          color={theme.textColor}
        />
      )}
    </>
  )
}

export default UserList
