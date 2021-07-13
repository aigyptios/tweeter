# Tweeter

Welcome to Tweeter! We're glad you're here.

## Quick Start

### Clone or download me

```bash
git clone https://github.com/aigyptios/tweeter.git
```

### Add environment variables

```bash
touch .env
cat TOKEN=[YOUR_TWITTER_OAUTH2_BEARER_TOKEN] > .env # without the brackets
```

### Run the proxy server

Open a shell and enter the following:

```bash
cd server
npm i
node run start
```

You can test the server response with the following command (in another terminal)

```bash
curl -G -d 'q=Science' http://localhost:8080/
```

### Run the client

Open another shell from the root directory and enter the following:

```bash
cd client
npm i
npm run start
```

### Load the app

Hit up <http://localhost:3000> in your favorite browser! <3

## To Do

### Required

- [x] Proxy server
- [x] Add TypeScript
- [x] Add redux
- [x] Some Tests
- [x] Tweet component and tests
- [x] Search component, functionality, and tests
- [x] Filter component, functionality, and tests
- [x] Hashtag "pill" component, functionality, and tests
- [x] Lazy loading
- [x] CSS-in-JS or SCSS

### Future Improvements

- [ ] More tests
- [ ] Build script to copy UI build into server
  - [ ] Modify server to differentiate API endpoints and serve static files (currently the rest "endpoint" doesn't require a resource name like "tweets", just a query)
- [ ] Pre-load the next five results so the user (1) doesn't have to wait, and (2) the "Load more" button disappears before the query returns empty
- [ ] Look into better way of loading the next query: it feels strange to have to pass it into the dispatched action (`TweetsList.tsx:23`) since it's already available in the state tree
- [ ] Refactor `tweetsSlice` to reuse functionality for extracting values (`tweets.all`, `hashtags`, `tweets.filtered`) from API responses
- [ ] Client-side caching
- [ ] Refactor CSS for consistency/modularity among components, possible extension/inheritance, and more centralized theming
  - [ ] Use REM units, align look and feel more with design
- [ ] Figure out why `http-proxy` doesn't pass query parameters after `?q=`

### Possible UX Enhancements

- [ ] Advanced search filters (especially by language)
- [ ] Polling on the server and websockets on client to notify user of new tweets available
- [ ] Make avatars interactive (clickable, preview)

## Questions for UX

- What happens when a user clicks "Load More" when filters are set? Currently they're reset so the user knows more tweets are loaded
