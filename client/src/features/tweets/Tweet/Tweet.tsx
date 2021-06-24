import { createUseStyles } from 'react-jss';
import { Theme } from '../../../theme';
import { ITweet } from '../../../types';
import HashtagPill from '../HashtagPill/HashtagPill';

const useStyles = createUseStyles((theme: Theme) => ({
  tweet: {
    display: 'flex',
  },
  avatar: {
    borderRadius: '100%', 
    width: 48, 
    height: 48,
  },
  tweetBody: {
    marginLeft: theme.spacing * 2
  },
  tweetText: {
    margin: `${theme.spacing}px 0px`,
  },
  usernameLink: {
    color: 'inherit', 
    fontWeight: 700, 
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  tweetLink: {
    color: theme.colors.action, 
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))

export function parseUrlFromText(text: string): string | undefined {
  let regEx = /https:\/\/t.co\/.{10}/;
  if (regEx.test(text))
    return text.match(/https:\/\/t.co\/.{10}/)!![0]
}

type TweetProps = {
  tweet: ITweet;
};

export default function Tweet(props: TweetProps) {

  const classes = useStyles();

  const { tweet } = props;
  const { user } = tweet;
  const url = tweet.entities.urls?.[0]?.url || parseUrlFromText(tweet.text);

  return <div className={classes.tweet}>
    <div>
      <img className={classes.avatar} src={user.profile_image_url_https} alt={`${user.screen_name}'s Twitter avatar`} />
    </div>
    <div className={classes.tweetBody}>
      <a className={classes.usernameLink} href={`https://www.twitter.com/${user.screen_name}`} target="_blank" rel="noreferrer">@{user.screen_name}</a>
      <p className={classes.tweetText}>{url ? tweet.text.replace(url, '') : tweet.text} {url && <a href={url} className={classes.tweetLink}>{url}</a>}</p>
      {tweet.entities.hashtags.map((ht, i) => <HashtagPill hashtag={ht.text} key={i}/>)}
    </div>
  </div>;

}
