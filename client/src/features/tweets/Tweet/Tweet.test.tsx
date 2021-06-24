import { cleanup, render, screen } from '@testing-library/react';
import Tweet, { parseUrlFromText } from './Tweet';
import { ITweet } from '../../../types';

describe("The Tweet Component", () => {

  let mockTweet : ITweet = {
    id: 10000001,
    text: 'This is the tweet text and at the end of the tweet is sometimes a url like... https://t.co/ABCdeFG87J',
    entities: ({
      urls: [{ url: 'https://t.co/ABCdeFG87J' }],
      hashtags: [{text: 'HashtagLifeAmIRite' }]
    }),
    created_at: 'Sat Jun 19 04:34:01 +0000 2021',
    favorite_count: 12345,
    retweet_count: 54321,
    user: {
      screen_name: 'Chemistry73',
      profile_image_url_https: 'https://pbs.twimg.com/profile_images/1329647526807543809/2SGvnHYV_normal.jpg',
    }
  }

  beforeEach( () => {
    render(<Tweet tweet={mockTweet}/>)
  })

  afterEach(()=> {
    cleanup()
  })
  
  test('displays the tweet text', () => {
    const tweetText = screen.getByText(mockTweet.text);
    expect(tweetText).toBeInTheDocument();
  });

  test('renders Tweet link', () => {
    const tweetLink = screen.getByText('https://t.co/ABCdeFG87J');
    expect(tweetLink).toBeInTheDocument();
  });
  
  test('parses the url text correctly', () => {
    expect(parseUrlFromText(mockTweet.text)).toEqual('https://t.co/ABCdeFG87J');
  });

  test('displays the avatar', () => {
    const tweetAvatar = screen.getByAltText(`${mockTweet.user.screen_name}'s Twitter avatar`);
    expect(tweetAvatar).toBeInstanceOf(HTMLImageElement);
  });


})