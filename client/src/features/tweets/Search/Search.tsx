import { debounce } from 'debounce';
import { loadTweets, setSearch } from '../tweetsSlice';
import { useDispatch } from 'react-redux';
import { ChangeEvent, memo } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from '../../../theme';

const useStyles = createUseStyles((theme: Theme) => ({
  search: {
    padding:`${theme.spacing}px`,
    paddingLeft: 35,
    border: '1px solid #ccc',
    fontFamily: 'inherit',
    width: '100%',
    position: 'relative',
    borderRadius: theme.borderRadius,
  },
  searchWrapper: {
    position: 'relative',
    marginBottom: theme.spacing * 2,
    margin: `0px ${theme.spacing}px`,
    '&::before': {
      display: 'block',
      position: 'absolute',
      content: '""',
      zIndex: 10,
      width: 8,
      height: 8,
      borderRadius: '100%',
      border: '3px solid #ccc',
      top: 10,
      left: 10
    },
    '&::after': {
      display: 'block',
      position: 'absolute',
      content: '""',
      zIndex: 10,
      width: 3,
      height: 9,
      background: '#ccc',
      top: 18,
      left: 22,
      transform: 'rotate(-50deg)',
      borderRadius: 3,
    },
    [`@media(min-width: ${theme.smallForm}px)`]: {
      margin: `unset`
    }
  }
}))

// memoize to prevent needless re-rendering when parent component re-renders
export default memo(
  function Search() {

    const dispatch = useDispatch();
    const classes = useStyles();

    return (
      <div className={classes.searchWrapper}>
        <input
          placeholder={'Search by keyword'}
          className={classes.search}
          onInput={(e: any) => dispatch(setSearch(e.target.value))}
          onChange={
            debounce(
              (e: ChangeEvent<HTMLInputElement>) => {
                const q = e.target.value.trim();
                if (q.length) dispatch(loadTweets(q))
              }
            , 1000)
          } />
      </div>
    );
  }
)