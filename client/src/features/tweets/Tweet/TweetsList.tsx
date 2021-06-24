import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Theme } from '../../../theme';
import { ITweet } from '../../../types';
import { loadMoreTweets } from '../tweetsSlice';
import Tweet from './Tweet';

const useStyles = createUseStyles((theme: Theme) => ({
  list: {
    margin: `0px -${theme.spacing}px`,
    '& li': {
      padding: theme.spacing,
      '&:nth-child(2n)': {
        backgroundColor: theme.background
      }
    },
  },
  button: {
    display: 'block',
    background: 'transparent',
    border: 0,
    font: 'inherit',
    color: theme.colors.action,
    cursor: 'pointer',
    margin: `${theme.spacing * 2}px auto`,
    textAlign: 'center',
  }
}))

export default function TweetsList({ tweets }: TweetsProps) {

  const classes = useStyles();

  return tweets.length > 0 ? <>
    <ul className={classes.list}>{tweets.map((s, i) => <li key={i}><Tweet tweet={s} /></li>)}</ul>
    <LoadMoreButton />
  </> : <>No tweets to show.</>
}
type TweetsProps = {
  tweets: ITweet[];
};

const LoadMoreButton = () => {

  const dispatch = useDispatch();
  const nextQuery = useSelector((state: RootState) => state.searchTweets.nextQuery);
  const loadingMore = useSelector((state: RootState) => state.searchTweets.loadingMore);

  const classes = useStyles();

  return nextQuery ? 
    <button 
      className={classes.button}
      disabled={loadingMore} 
      onClick={() => dispatch(loadMoreTweets(nextQuery))}>
        Load more
    </button> 
    : null;
}