import { UUID } from "crypto";
import Account from "./Account";
import { LoanType } from "./LoanType";
import User from "./User";

export default interface Loan {



    pk: number|null;
    account:Account;


   

}