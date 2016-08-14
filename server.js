var express = require('express'),
  httpProxy = require('http-proxy'),
  url = require('url'),
  conf = require('./config');
var app = express();
var proxy = httpProxy.createProxyServer();


app.use(express.static('app'));

app.get('/api/realtimedepartures.json', function (req, res) {
  var target = `${conf.slApiUrl}/realtimedepartures.json?${url.parse(req.url).query}&key=${conf.apiKeys.sl_realtid}`;
  proxy.web(req, res, { target: target, ignorePath: true });
});

var server = app.listen(conf.web.port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Eredax app listening at http://%s:%s', host, port)

})