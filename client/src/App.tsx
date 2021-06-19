import { useState, useEffect } from 'react'
import { isSuccessResponse, isErrorResponse, ITweet, IAPIResponse } from './types/types';


function App() {

  const [data, setData] = useState<IAPIResponse>();

  useEffect(() => {
    fetch('lol?q=the&result_type=popular&count=23')//&max_id=1405990040187113500')
      .then(data => data.json())
      .then(setData)
  }, [])

  return (
    <div className="App">
      Tweeter
      { data && isSuccessResponse(data) && 
        <ol>
          {
            data.statuses.map((s, i) => <Tweet tweet={s} key={i} />)
          }
        </ol>
      }
      { (!data || isErrorResponse(data)) && 
        <div>No data</div>
      }

    </div>
  );
}

function parseUrlFromText(text: string): string | undefined {
  let regEx = /https:\/\/t.co\/.*/;
  if (regEx.test(text))
    return text.match(/https:\/\/t.co\/.*/)!![0]
}


type TweetProps = {
  tweet: ITweet
}
function Tweet(props: TweetProps) {

  const { tweet } = props;
  const { user } = tweet;
  const url = tweet.entities.urls?.[0]?.url || parseUrlFromText(tweet.text)

  return <li style={{ marginBottom: 100 }}>
    Faves: {tweet.favorite_count} | Retweets: {tweet.retweet_count}
    <br />
    {tweet.created_at}
    <br />
    {tweet.id}
    <br />
    {tweet.text}
    <br />
    {user.screen_name}
    <br />
    <img src={user.profile_image_url_https} alt={`${user.screen_name}'s Twitter avatar`} />
    <br />
    Hashtags: {JSON.stringify(tweet.entities.hashtags.map(ht => ht.text))}
    <br />
    {url && <a href={url}>{url}</a>}
  </li>

}

export default App;
