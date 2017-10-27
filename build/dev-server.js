require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn                  = require('opn')
var path                 = require('path')
var axios                = require('axios')
var express              = require('express')
var webpack              = require('webpack')
var proxyMiddleware      = require('http-proxy-middleware')
var webpackConfig        = require('./webpack.dev.conf')
var querystring          = require('querystring')
var app                  = express();
var bodyParser           = require('body-parser')
var GooglePlacesPromises = require('googleplaces-promises')
app.use( bodyParser.json() )

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/** YELP API CODE 
 ******************/
var yelp = require('yelp-fusion'); 
// Yelp Fusion API
const token  = 'zb1p8LlaSDttz_8TXaEenGYv5UEF8Z6VoenBSzT873EIdec7hvcqvemcwkrTqtvYAqUyodgrviFIDcu7nZ8h3XOJ7OeopEgkdM8Nb-lgtIOEglYVucHb1GTmZWceWXYx';
const client = yelp.client(token);

app.get('/cafes/:query', function(req, res) {
  client.search({
    term: 'cafe',
    location: querystring.stringify({ q: req.params.query })
  })
  .then(response => res.send(response))
  .catch(e => console.log(e));
});



/* Google Places API
**********************/
var placesPromises = new GooglePlacesPromises('AIzaSyAUsRiPmw2fmYzfaK6G7W0xxcTzVJxj-kw');
 
app.get('/places/:query', function(req, res) {

  var placeSearch = placesPromises.placeSearch({
    location: [req.params.query],
    types: "park"
  });
  
  placeSearch
    .then(function(response) {
      res.send(response)
    })
    .fail(function(error) {
      console.log(error)
    })
})

/* Google Maps Steps

1. get coords of items in array
2. Install Vue Maps
3. Create new markers Array with Objects of each items coords

*/

/* DarkSky Weather API */

app.get('/weather/:query', function(req, res) {
  const WEATHER_KEY = 'acda70057619e2cfc48928eef467d183'
  let coords = req.params.query
  axios
    .get( `https://api.darksky.net/forecast/${WEATHER_KEY}/${coords}` )
    .then(function(response) {
      res.send(response.data)
    }
  )
    
})



/* Node Server Settings
************************/
// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})


var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
