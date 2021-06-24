import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAPIResponse, isErrorResponse, isSuccessResponse, ITweet } from '../../types'
import { fetchMore, fetchTweets } from './tweetsAPI'

export interface TweetsState {
  query: string,
  tweets: {
    all: ITweet[],
    filtered: ITweet[]
  },
  hashtags: {[hashtag: string]: boolean},
  loadedInitial: boolean,
  errorLoadingInitial: boolean,
  loadingMore: boolean,
  errorLoadingMore: boolean,
  nextQuery?: string,
}

const initialState: TweetsState = {
  query: '',
  tweets: {
    all: [],
    filtered: []
  },
  hashtags: {},
  loadedInitial: false,
  errorLoadingInitial: false,
  loadingMore: false,
  errorLoadingMore: false
}

export const loadTweets = createAsyncThunk<IAPIResponse, string, any>(
  'tweets/loadTweets',
  async (q: string) => {
    const tweetReponse: IAPIResponse = await fetchTweets(q);
    return tweetReponse;
  }
)
export const loadMoreTweets = createAsyncThunk<IAPIResponse, string, any>(
  'tweets/loadMoreTweets',
  async (nextQuery: string) => {
    const tweetReponse: IAPIResponse = await fetchMore(nextQuery);
    return tweetReponse;
  }
)

export const counterSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.loadedInitial = false;
      state.errorLoadingInitial = false;
      if (state.query === '') {
        state.tweets.all = [];
        state.tweets.filtered = [];
        state.hashtags = {}
        state.loadedInitial = false;
      }
    },
    toggleHashtagFilter: (state, action: PayloadAction<string>) => {
      let original = state.hashtags[action.payload] || false;
      state.hashtags[action.payload] = !original;
      const tweetHasActiveHashtag = (twt: ITweet) => twt.entities.hashtags.filter(h => state.hashtags[h.text]).length > 0;
      const filtered = state.tweets.all.filter(tweetHasActiveHashtag);
      state.tweets.filtered = filtered.length ? filtered : state.tweets.all
    }
  },
  extraReducers: (builder) => {
    builder
    
      // LoadTweets
      .addCase(loadTweets.pending, (state) => {
        state.tweets = { all: [], filtered: [] };
        state.hashtags = {};
        state.errorLoadingInitial = false;
        state.errorLoadingMore = false;
        state.nextQuery = '';
      })
      .addCase(loadTweets.fulfilled, (state, action: PayloadAction<IAPIResponse>) => {
        state.loadedInitial = true;
        if (isSuccessResponse(action.payload)) {
          state.tweets = {
            all: action.payload.statuses,
            filtered: action.payload.statuses
          };
          state.nextQuery = action.payload.search_metadata.next_results;
          const extractTweetHashtagsAsStrings = (twt: ITweet) => twt.entities.hashtags.map( ht => ht.text)
          let hashtags = state.tweets.all.flatMap(extractTweetHashtagsAsStrings);
          state.hashtags = Object.fromEntries( hashtags.map(h => [h, false]))
        } else if (isErrorResponse(action.payload)) {
          state.errorLoadingInitial = true;
        }
      })
      .addCase(loadTweets.rejected, state => {
        state.loadedInitial = true;
        state.errorLoadingInitial = true;
      })

      // LoadMoreTweets
      .addCase(loadMoreTweets.pending, (state) => {
        state.loadingMore = true;
      })
      .addCase(loadMoreTweets.rejected, (state) => {
        state.errorLoadingMore = true;
        state.loadingMore = false;
      })
      .addCase(loadMoreTweets.fulfilled, (state, action: PayloadAction<IAPIResponse>) => {
        state.loadingMore = false;
        if (isSuccessResponse(action.payload)) {
          state.nextQuery = action.payload.search_metadata.next_results;
          state.tweets.all = [...state.tweets.all, ...action.payload.statuses]

          const extractTweetHashtagsAsStrings = (twt: ITweet) => twt.entities.hashtags.map( ht => ht.text)
          let hashtags = state.tweets.all.flatMap(extractTweetHashtagsAsStrings);
          state.hashtags = { ...Object.fromEntries( hashtags.map(h => [h, false])) } // , ...state.hashtags } // uncomment to preserve hashtag selections

          const tweetHasActiveHashtag = (twt: ITweet) => twt.entities.hashtags.filter(h => state.hashtags[h.text]).length > 0;
          const filtered = state.tweets.all.filter(tweetHasActiveHashtag);
          state.tweets.filtered = filtered.length ? filtered : state.tweets.all

          state.errorLoadingMore = false;
        } else {
          state.errorLoadingMore = true;
        }
      })
  },
})

export const { setSearch, toggleHashtagFilter } = counterSlice.actions

export default counterSlice.reducer