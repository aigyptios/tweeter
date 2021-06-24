import { configureStore } from '@reduxjs/toolkit'
import tweetsSlice from './features/tweets/tweetsSlice'

const store = configureStore({
  reducer: {
    searchTweets: tweetsSlice
  }
})
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
