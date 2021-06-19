require('dotenv').config();

const http = require('http');
const httpProxy = require('http-proxy');
const { URL, URLSearchParams } = require('url');

/*
* For some reason, this implementation with http-proxy 
* overrides the content-disposition header to 'attachment', 
* so the browser downloads the json as a file when hitting the url.
* 
* It's fine for AJAX though.
* */

const TWITTER_SEARCH_ENDPOINT = 'https://api.twitter.com/1.1/search/tweets.json';

const proxy = httpProxy.createProxyServer({})

http.createServer((function(clientRequest, clientResponse) {

  const params = new URLSearchParams((new URL(clientRequest.headers.host + clientRequest.url)).search);
  const url = TWITTER_SEARCH_ENDPOINT + '?' + new URLSearchParams(params);
  console.log(clientRequest.method, url);
  clientRequest.method = 'GET';
  clientRequest.headers = {authorization: `Bearer ${process.env.TOKEN}`};
  clientRequest.rawHeaders = {};
  proxy.web(clientRequest, clientResponse, { target: url });

})).listen(8080);
