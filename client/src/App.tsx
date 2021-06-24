import { ITweet } from './types';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { createUseStyles } from 'react-jss';
import Search from './features/tweets/Search/Search';
import Filters from './features/tweets/Filters/Filters';
import TweetsList from './features/tweets/Tweet/TweetsList';
import Card from './common/Card';
import { Theme } from './theme';

const useStyles = createUseStyles((theme: Theme) => ({
  app: {
    fontSize: theme.fontSize,
    color: theme.colors.base,
    backgroundColor: theme.background,
    maxWidth: 820,
    margin: '50px auto'
  },
  loadingInfo: {
    textAlign: 'center',
  },
  heading: {
    fontSize: theme.headingSize,
    margin: `0px ${theme.spacing}px ${theme.headingMargins.bottom}px`,
  },
  grid: {
    margin: 0
  },
  filter: {
    position: 'sticky',
    top: 30
  },
  filterGridItem: {
    gridRow: '1 / span 2',
    gridColumn: 2
  },
  [`@media(min-width: ${theme.smallForm}px)`]: {
    grid: {
      display: 'grid',
      gridTemplateColumns: 'auto 250px',
      gridTemplateRows: '30px auto',
      gap: theme.spacing * 2,
      margin: `0px ${theme.spacing}px`
    },
  }
}))

function App() {

  const classes = useStyles()

  const tweets: ITweet[] = useSelector((state: RootState) => state.searchTweets.tweets.filtered)
  const error: boolean = useSelector((state: RootState) => state.searchTweets.errorLoadingInitial || state.searchTweets.errorLoadingMore)
  const loaded: boolean = useSelector((state: RootState) => state.searchTweets.loadedInitial)
  const query: string = useSelector((state: RootState) => state.searchTweets.query)

  return (
    <div className={`App ${classes.app}`}>

      <h1 className={classes.heading}>Twitter Feed</h1>

      <div className={classes.grid}>
        <div><Search /></div>

        <div className={classes.filterGridItem}>
          <Card className={classes.filter}><Filters /></Card>
        </div>

        { query && !loaded && <div className={classes.loadingInfo}>Loading tweets...</div> }
        { query && loaded && <div>
            <Card><TweetsList tweets={tweets}/></Card>
          </div>}

        { error && <div className={classes.loadingInfo}>Ruh-roh. There was an error fetching data.</div>}
      </div>

    </div>
  );
}

export default App;

/*
query && tweets.length --> tweets
query && loaded && !tweets.length --> loading
query && 

*/