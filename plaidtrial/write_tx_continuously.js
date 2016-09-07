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

function loop() {

  plaidClient.getConnectUser(access_token, {
    gte: '900 days ago',
  }, function(err, response) {
    console.log('You have ' + response.transactions.length +
                ' transactions from the last 900 days.');
    console.log(response.transactions);


    


    // get the first transaction
    // write to data
    if (response.transactions.length > 0) {

      var item = response.transactions[0];
      var url = "https://box-expense-tracker.stamplayapp.com/api/cobject/v1/expense";
      var body = {
        amount: item.amount,
        category: item.category,
        date: item.date,
        name: item.name,
        transaction_account: item._account,
        transaction_id: item._id
      };
      //
      // write tx to stamplay endpoint
      //
      request({"url": url, method: "POST", body: body, json: true});
    }
  });
}

// run this every 30 seconds
setInterval(loop, 30000);

