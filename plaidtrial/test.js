var plaid = require('plaid');

console.log(plaid.environments);

var client_id = "test_id";
var secret = "test_secret";
var plaid_env = plaid.environments.tartan;

// Initialize client
var plaidClient = new plaid.Client(client_id, secret, plaid_env);

var institution_type = "";
var credentials = "";

// addAuthUser(String, Object, Object?, Function)
//plaidClient.addAuthUser(institution_type, credentials, options, callback);

//plaidClient.getBalance(access_token, callback);