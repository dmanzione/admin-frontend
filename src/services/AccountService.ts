import Account from "../types/Account";
import ApiService from "./ApiService";
import axios from "axios";
import { PipelineDestinationPromiseFunction } from "stream";
export default class AccountService  {
    static instance: AccountService;
    ACCOUNTS_BASE_URL: string;

    constructor() {
        this.ACCOUNTS_BASE_URL = "http://localhost:8080/accounts-api/accounts/";
    }

    static getInstance():AccountService {
        if (!this.instance) {
            this.instance = new AccountService();
        }
        return this.instance;
    }


    getAccounts(): Promise<Account[]> {
        return axios.get(this.ACCOUNTS_BASE_URL).then(response => {
            return response.data._embedded.accounts;
        }).then(response=>{
            return response.data._embedded.accounts;
        })
    }
    

   
    deleteAccount(pk: number): Promise<any> {
        return axios.delete(this.ACCOUNTS_BASE_URL + "/"+pk).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }
   

    getByPrimaryKey(pk: number): Promise<Account> {
        return axios.get(this.ACCOUNTS_BASE_URL + "/"+pk).then(response => {
            return response.data._embedded.account;
        }).catch(error => {
            return error;
        });
    }

    
    

}


