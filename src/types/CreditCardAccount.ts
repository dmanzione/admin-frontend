import Account from "./Account";
import { CreditCardType } from "./CreditCardType";

export default interface CreditCardAccount{
    
    pk:number|null;

    account:Account;

    
    paymentDate:Date|null;

   
    creditCardType:CreditCardType;

    

 }