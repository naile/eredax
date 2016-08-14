var express = require('express'),
  httpProxy = require('http-proxy'),
  cache = require('memory-cache'),
  url = require('url'),
  conf = require('./config');
var app = express();
var proxy = httpProxy.createProxyServer();

app.use(express.static('app'));

app.get('/api/realtimedepartures.json', function (req, res) {
  var query = url.parse(req.url).query;
  var cached = cache.get(query)
  if (cached) {
    res.send(cached);
    return;
  }
  var target = `${conf.slApiUrl}/realtimedepartures.json?${query}&key=${conf.apiKeys.sl_realtid}`;
  proxy.web(req, res, { target: target, ignorePath: true });
});

proxy.on('proxyRes', function (proxyRes, req, res) {
  if (conf.enableCache && proxyRes.statusCode === 200)
    cacheResponse(proxyRes, url.parse(req.url).query, conf.cacheTtl);
});

function cacheResponse(res, cacheKey, ttl) {
  var body = [];
  res.on('data', function (chunk) {
    body.push(chunk)
  }).on('end', function () {
    cache.put(cacheKey, JSON.parse(Buffer.concat(body).toString()), ttl);
  })
}

var server = app.listen(conf.web.port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Eredax app listening at http://%s:%s', host, port)

})