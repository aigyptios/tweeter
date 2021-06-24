import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Theme } from '../../../theme';
import HashtagPill from "../HashtagPill/HashtagPill";


const useStyles = createUseStyles((theme: Theme) => ({
  heading: {
    fontSize: theme.headingSize,
    marginBottom: theme.headingMargins.bottom,
  }
}))

export default function Filters() {

  const classes = useStyles();
  const hashtags: string[] = useSelector((state: RootState) => Object.keys(state.searchTweets.hashtags));

  return <div>
    <h2 className={classes.heading}>Filter by hashtag</h2>
    {hashtags.length ? hashtags.map(ht => <HashtagPill hashtag={ht} />) : 'No hashtags available.'}
  </div>;

}
