/*
get access_token and accounts info
*/

var plaid = require('plaid');

var client_id = "test_id";
var secret = "test_secret";

var plaidClient = new plaid.Client(client_id,
                                   secret,
                                   plaid.environments.tartan);

var public_token = "test,us,connected";
//var access_token = "test_us";
var access_token = "test_bofa";

plaidClient.getConnectUser(access_token, {
  gte: '900 days ago',
}, function(err, response) {
  console.log('You have ' + response.transactions.length +
              ' transactions from the last 900 days.');
  console.log(response.transactions);
});