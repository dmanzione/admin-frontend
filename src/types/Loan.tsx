import { UUID } from "crypto";
import Account from "./Account";
import { LoanType } from "./LoanType";
import User from "./User";

export default interface Loan {



    pk: number|null;
    loanId: string|null;
    principal: number;
    rate: number;
    initialAmount: number;
    loanTerm: number;
    dueDate: Date;
    startDate: Date;
    loanType: LoanType;
    account:Account;


   

}