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
