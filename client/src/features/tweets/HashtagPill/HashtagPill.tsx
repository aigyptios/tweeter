import { useDispatch, useSelector } from "react-redux";
import { createUseStyles } from 'react-jss'
import { RootState } from "../../../store";
import { toggleHashtagFilter } from "../tweetsSlice";
import { Theme } from "../../../theme";

const useStyles = createUseStyles((theme: Theme) => ({
  pill: {
    display: 'inline-block',
    padding: `10px 16px`,
    margin: '5px',
    color: theme.colors.action,
    backgroundColor: theme.colors.actionBackground,
    borderRadius: 20,
    cursor: 'pointer'
  },
  on: {
    color: theme.colors.actionBackground,
    backgroundColor: theme.colors.action
  }
}))

type HashtagPillProps = {
  hashtag: string;
};
export default function HashtagPill({ hashtag }: HashtagPillProps) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const on = useSelector((state: RootState) => state.searchTweets.hashtags[hashtag])

  return (
    <span 
      className={[classes.pill, on ? classes.on : null].join(' ') } 
      onClick={() => dispatch(toggleHashtagFilter(hashtag))}>
      #{hashtag}
    </span>
  );
}
