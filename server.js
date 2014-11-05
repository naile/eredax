var express = require('express'),
  proxy = require('json-proxy');
var app = express()


app.use(express.static('app'));

app.use(proxy.initialize({
    proxy: {
      'forward': {
        '/api': 'http://api.sl.se'
      }
    }
  }));


var server = app.listen(8000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Eredax app listening at http://%s:%s', host, port)

})