import hostURL from './reducers/hostURL'
import browsePath from './reducers/browsePath'
import selectedFile from './reducers/selectedFile'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    browsePath,
    hostURL,
    selectedFile
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
