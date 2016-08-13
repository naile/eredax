var express = require('express'),
  proxy = require('json-proxy'),
  conf = require('./config');
var app = express()


app.use(express.static('app'));

app.use(proxy.initialize({
  proxy: {
    'forward': {
      '/api/(.*)': 'http://api.sl.se/api2/$1&key=' + conf.apiKeys.sl_realtid
    }
  }
}));

var server = app.listen(conf.web.port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Eredax app listening at http://%s:%s', host, port)

})