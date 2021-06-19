# Tweeter

Welcome to Tweeter! We're glad you're here.

## Quick Start

### Clone me

```bash
git clone [wherever you found this repository]
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
curl  -G -d 'q=Science' http://localhost:8080/
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
- [ ] Add redux
- [ ] Tests
- [ ] Tweet component and tests
- [ ] Search component, functionality, and tests
- [ ] Filter component, functionality, and tests
- [ ] Hashtag "pill" component, functionality, and tests
- [ ] Lazy loading
- [ ] CSS-in-JS or SCSS

### Nice to Have

- [ ] Build script to copy UI build into server
  - [ ] Modify server to differentiate API endpoints and serve static files
- [ ] Make avatars interactive (clickable, preview)
