import { ITweet } from '../types/types';


export function parseUrlFromText(text: string): string | undefined {
  let regEx = /https:\/\/t.co\/.{10}/;
  if (regEx.test(text))
    return text.match(/https:\/\/t.co\/.*/)!![0]
}

type TweetProps = {
  tweet: ITweet;
};

export function Tweet(props: TweetProps) {

  const { tweet } = props;
  const { user } = tweet;
  const url = tweet.entities.urls?.[0]?.url || parseUrlFromText(tweet.text);

  return <li style={{ marginBottom: 100 }}>
    Faves: {tweet.favorite_count} | Retweets: {tweet.retweet_count}
    <br />
    {tweet.created_at}
    <br />
    {tweet.id}
    <br />
    <span>{tweet.text}</span>
    <br />
    {user.screen_name}
    <br />
    <img src={user.profile_image_url_https} alt={`${user.screen_name}'s Twitter avatar`} />
    <br />
    Hashtags: {JSON.stringify(tweet.entities.hashtags.map(ht => ht.text))}
    <br />
    {url && <a href={url}>{url}</a>}
  </li>;

}
