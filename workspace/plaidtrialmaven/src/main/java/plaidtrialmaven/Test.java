package plaidtrialmaven;

import java.util.List;

import com.plaid.client.PlaidClients;
import com.plaid.client.PlaidPublicClient;
import com.plaid.client.PlaidUserClient;
import com.plaid.client.request.Credentials;
import com.plaid.client.response.CategoriesResponse;
import com.plaid.client.response.Category;
import com.plaid.client.response.Transaction;
import com.plaid.client.response.TransactionsResponse;

public class Test {

	public static void main(String[] args) {
		// Add Amex user, get 30 days of transactions

		PlaidUserClient plaidUserClient = PlaidClients.testUserClient("test_id", "test_secret");
		//PlaidUserClient plaidUserClient = PlaidClients.testUserClient("57cf266a7b33c07e7416dca1", "043cb06e75024444c66a8ac73e9f20");
		Credentials testCredentials = new Credentials("plaid_test", "plaid_good");
		TransactionsResponse response = plaidUserClient.addUser(testCredentials, "amex", "test@test.com", null);
		//TransactionsResponse response = plaidUserClient.addUser(testCredentials, "amex", "codercollective@gmail.com", null);

		List<Transaction> transactions = response.getTransactions();


		// Get all Categories

		PlaidPublicClient plaidPublicClient = PlaidClients.testPublicClient();
		CategoriesResponse categoriesResponse = plaidPublicClient.getAllCategories();

		List<Category> categories = categoriesResponse.getCategories();
	}
}
