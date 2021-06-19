require('dotenv').config();

const http = require('http');
const httpProxy = require('http-proxy');
const { URL, URLSearchParams } = require('url');

/*
* For some reason, this implementation with http-proxy 
* overrides the content-disposition header to 'attachment', 
* so the browser downloads the json as a file when hitting the url.
* */

const TWITTER_SEARCH_ENDPOINT = 'https://api.twitter.com/1.1/search/tweets.json';

const proxy = httpProxy.createProxyServer({})

http.createServer((function(clientRequest, clientResponse) {

  const params = new URLSearchParams((new URL(clientRequest.headers.host + clientRequest.url)).search);
  const url = TWITTER_SEARCH_ENDPOINT + '?' + new URLSearchParams(params);
  console.log('GET', url)
  clientRequest.headers = {}
  clientRequest.rawHeaders = {}
  clientRequest.headers.authorization = `Bearer ${process.env.TOKEN}`;
  proxy.web(clientRequest, clientResponse, { target: url })

})).listen(8080);
