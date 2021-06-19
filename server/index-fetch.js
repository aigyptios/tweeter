require('dotenv').config();

const fetch = require('node-fetch');
const http = require('http');
const { URL, URLSearchParams } = require('url');

const TWITTER_SEARCH_ENDPOINT = 'https://api.twitter.com/1.1/search/tweets.json';

http.createServer((function(clientRequest, clientResponse) {

  const params = new URLSearchParams((new URL(clientRequest.headers.host + clientRequest.url)).search);
  const url = TWITTER_SEARCH_ENDPOINT + '?' + params;

  console.log('GET', url);

  fetch(url, { 
    method: 'GET',
    headers: {'Authorization': `Bearer ${process.env.TOKEN}`}
  })
    .then(res => {
      clientResponse.statusCode = res.status;
      return res.json()
    })
    .then(json => {
      clientResponse.setHeader('content-type', 'application/json; charset=UTF-8');
      clientResponse.end(JSON.stringify(json));
    })
    .catch(error => {
      clientResponse.status = 500;
      clientResponse.end(JSON.stringify({
        errors: [{
          message: 'Encountered error in proxy request. ' + error
        }]
      }));
    })

})).listen(8080);
