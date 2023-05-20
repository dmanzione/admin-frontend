import axios from "axios";
import { AccountType } from "../types/AccountType";

export default class AccountService {
    accountTypesListUrl: string;
    static instance: any;

    constructor() {
        process.env.BASE_URL ='http://localhost:3000';
        this.accountTypesListUrl = process.env.BASE_URL + '/accounts/types';
    }

    public static getInstance(){
        if(!AccountService.instance){
            AccountService.instance = new AccountService();
            return AccountService.instance;
        }else {
            return AccountService.instance;
        }
    }
    getAccountTypesList() {
        return axios.get(this.accountTypesListUrl).then(res=>{
            return res.data._embedded.accountTypes;
        }).catch(err=>{
            console.log(err);
            return [];
        });
    }

    getAccountType(pk:number) {
        return axios.get(this.accountTypesListUrl + '/' + pk).then(res=>{   
            return  res.data._embedded.accountType;
        })     
        .catch(err=>{
                console.log(err);
                return [];
         });
    }

    
}