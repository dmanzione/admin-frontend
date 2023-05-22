

import axios from 'axios';
import Account from '../types/Account';


// Define the base URL for the API
const baseURL = 'http://localhost:8080/accounts-api/accounts';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL,
});

// Define the type for the HATEOAS response

class AccountService {
}

// Define the type for the Account


// Define the function to get all loans
export const getAllAccounts = async (): Promise<Account[]> => {
  try {
    // Make a GET request to /loans and get the data
    const { data } = await api.get('/');
    // Return the loans array from the _embedded property
    console.log(data._embedded.accounts);
    return data._embedded.accounts;
  } catch (error) {
    // Handle any errors and rethrow them
    console.error(error);
    throw error;
  }

};

// Define the function to get a loan by id
export const getAccountById = async (id: number): Promise<Account> => {
  try {
    // Make a GET request to /loans/{id} and get the data
    const { data } = await api.get<Account>(`/${id}`);
    // Return the loan object
    return data;
  } catch (error) {
    // Handle any errors and rethrow them
    console.error(error);
    throw error;
  }
};

// Define the function to create a new loan
export const createAccount = async (loan: Account): Promise<Account> => {
  try {
    // Make a POST request to /loans with the loan object as the body and get the data
    const { data } = await api.post<Account>('/', loan);
    // Return the created loan object
    return data;
  } catch (error) {
    // Handle any errors and rethrow them
    console.error(error);
    throw error;
  }
};

// Define the function to update an existing loan
export const updateAccount = async (id: number, loan: Account): Promise<Account> => {
  try {
    // Make a PUT request to /loans/{id} with the loan object as the body and get the data
    const { data } = await api.put<Account>(`/${id}`, loan);
    // Return the updated loan object
    return data;
  } catch (error) {
    // Handle any errors and rethrow them
    console.error(error);
    throw error;
  }
};

// Define the function to delete an existing loan
export const deleteAccount = async (id: number): Promise<void> => {
  try {
    // Make a DELETE request to /loans/{id}
    await api.delete(`/${id}`);
  } catch (error) {
    // Handle any errors and rethrow them
    console.error(error);
    throw error;
  }
};



