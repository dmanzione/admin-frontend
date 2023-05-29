

import axios from 'axios';
import Loan from '../types/LoanAccount';


// Define the base URL for the API
const baseURL = 'http://localhost:8080/accounts-api/loan-accounts';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL,
});

// Define the type for the HATEOAS response

export default class LoanService {
    private constructor(){

    }
    public static getInstance(){
        return new LoanService();
    }
    getAll(): Promise<Loan[]> {
        return getAllLoans();
    }
}

// Define the type for the Loan




// Define the function to get all loans
export const getAllLoans = async (): Promise<Loan[]> => {
  try {
    // Make a GET request to /loans and get the data
    const { data } = await api.get('/');
    // Return the loans array from the _embedded property
    console.log(data._embedded.loanAccounts);
    return data._embedded.loanAccounts;
  } catch (error) {
    // Handle any errors and rethrow them
    console.error(error);
    throw error;
  }

};

// Define the function to get a loan by id
export const getLoanByPk = async (pk: number): Promise<Loan> => {
  try {
    // Make a GET request to /loans/{id} and get the data
    const { data } = await api.get<Loan>(`/${pk}`);
    // Return the loan object
    return data;
  } catch (error) {
    // Handle any errors and rethrow them
    console.error(error);
    throw error;
  }
};

// Define the function to create a new loan
export const createLoan = async (loan: Loan): Promise<Loan> => {
  try {
    // Make a POST request to /loans with the loan object as the body and get the data
    const { data } = await api.post<Loan>('/', loan);
    // Return the created loan object
    return data;
  } catch (error) {
    // Handle any errors and rethrow them
    console.error(error);
    throw error;
  }
};

// Define the function to update an existing loan
export const updateLoan = async (id: number, loan: Loan): Promise<Loan> => {
  try {
    // Make a PUT request to /loans/{id} with the loan object as the body and get the data
    const { data } = await api.put<Loan>(`/${id}`, loan);
    // Return the updated loan object
    return data;
  } catch (error) {
    // Handle any errors and rethrow them
    console.error(error);
    throw error;
  }
};

// Define the function to delete an existing loan
export const deleteLoan = async (id: number): Promise<void> => {
  try {
    // Make a DELETE request to /loans/{id}
    await api.delete(`/${id}`);
  } catch (error) {
    // Handle any errors and rethrow them
    console.error(error);
    throw error;
  }
};



