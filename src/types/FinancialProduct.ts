import Account from "./Account";

export default class FinancialProduct {
   
   
    public pk?:number;
    public id?:string;
    name?:string;
    description?:string;
    account?:Account;
    
    constructor(name:string){
        this.name = name;
    }
}