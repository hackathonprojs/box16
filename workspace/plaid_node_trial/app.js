
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var plaid = require('plaid');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/plaidsimpleintegration', routes.index);

var client_id = "test_id";
var secret = "test_secret";

var plaidClient = new plaid.Client(client_id,
                                   secret,
                                   plaid.environments.tartan);

app.post('/authenticate', function(req, res) {
	  var public_token = req.body.public_token;

	  // Exchange a public_token for a Plaid access_token
	  plaidClient.exchangeToken(public_token, function(err, exchangeTokenRes) {
	    if (err != null) {
	      // Handle error!
	    } else {
	      // This is your Plaid access token - store somewhere persistent
	      // The access_token can be used to make Plaid API calls to
	      // retrieve accounts and transactions
	      var access_token = exchangeTokenRes.access_token;
	      console.log("access_token=");
	      console.log(access_token);

	      plaidClient.getAuthUser(access_token, function(err, authRes) {
	        if (err != null) {
	          // Handle error!
	        } else {
	          // An array of accounts for this user, containing account
	          // names, balances, and account and routing numbers.
	          var accounts = authRes.accounts;

	          // Return account data
	          res.json({accounts: accounts});
	        }
	      });
	    }
	  });
	});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
