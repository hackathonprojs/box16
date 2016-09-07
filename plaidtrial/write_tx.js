/*
get access_token and accounts info
*/

var plaid = require('plaid');
var request = require('request');
var async = require('async');

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


  // loop through the array
  // calling stamplay endpoint to save the data
  async.eachLimit(response.transactions, 10, function(item, callback) {
  	var url = "https://box-expense-tracker.stamplayapp.com/api/cobject/v1/expense";
  	var body = {
  		amount: item.amount,
  		category: item.category,
  		date: item.date,
  		name: item.name,
  		transaction_account: item._account,
  		transaction_id: item._id
  	}
  	request({"url": url, method: "POST", body: body, json: true}, callback);
  });



});